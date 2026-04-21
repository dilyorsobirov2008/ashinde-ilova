const router = require('express').Router();
const pool = require('../config/db');
const { auth, adminAuth } = require('../middleware/auth');

// GET /api/products
router.get('/', async (req, res) => {
  try {
    const { category, search, min_price, max_price, sort, featured, limit = 20, offset = 0 } = req.query;
    let conditions = ['p.is_active = true'];
    let params = [];
    let i = 1;

    if (category) { conditions.push(`c.slug = $${i++}`); params.push(category); }
    if (search)   { conditions.push(`p.name ILIKE $${i++}`); params.push(`%${search}%`); }
    if (min_price){ conditions.push(`p.price >= $${i++}`); params.push(min_price); }
    if (max_price){ conditions.push(`p.price <= $${i++}`); params.push(max_price); }
    if (featured === 'true') { conditions.push(`p.is_featured = true`); }

    const where = conditions.length ? 'WHERE ' + conditions.join(' AND ') : '';
    const orderMap = { price_asc: 'p.price ASC', price_desc: 'p.price DESC', newest: 'p.created_at DESC', rating: 'p.rating DESC' };
    const orderBy = orderMap[sort] || 'p.created_at DESC';

    const query = `
      SELECT p.*, c.name as category_name, c.slug as category_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      ${where}
      ORDER BY ${orderBy}
      LIMIT $${i++} OFFSET $${i++}
    `;
    params.push(parseInt(limit), parseInt(offset));

    const countQuery = `SELECT COUNT(*) FROM products p LEFT JOIN categories c ON p.category_id = c.id ${where}`;
    const [{ rows }, { rows: countRows }] = await Promise.all([
      pool.query(query, params),
      pool.query(countQuery, params.slice(0, -2)),
    ]);

    res.json({ products: rows, total: parseInt(countRows[0].count), limit: parseInt(limit), offset: parseInt(offset) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server xatosi' });
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT p.*, c.name as category_name, c.slug as category_slug
       FROM products p LEFT JOIN categories c ON p.category_id = c.id
       WHERE p.id=$1 AND p.is_active=true`,
      [req.params.id]
    );
    if (!rows.length) return res.status(404).json({ error: 'Mahsulot topilmadi' });
    res.json({ product: rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Server xatosi' });
  }
});

// POST /api/products  (admin)
router.post('/', adminAuth, async (req, res) => {
  try {
    const { name, description, price, discount_price, category_id, images, stock, brand, is_featured } = req.body;
    if (!name || !price) return res.status(400).json({ error: 'Nomi va narxi kerak' });
    const { rows } = await pool.query(
      `INSERT INTO products (name, description, price, discount_price, category_id, images, stock, brand, is_featured)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
      [name, description, price, discount_price || null, category_id || null, images || [], stock || 0, brand || null, is_featured || false]
    );
    res.status(201).json({ product: rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Server xatosi' });
  }
});

// PUT /api/products/:id (admin)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const { name, description, price, discount_price, category_id, images, stock, brand, is_featured, is_active } = req.body;
    const { rows } = await pool.query(
      `UPDATE products SET name=$1, description=$2, price=$3, discount_price=$4,
       category_id=$5, images=$6, stock=$7, brand=$8, is_featured=$9, is_active=$10
       WHERE id=$11 RETURNING *`,
      [name, description, price, discount_price || null, category_id || null, images || [], stock || 0, brand || null, is_featured || false, is_active !== false, req.params.id]
    );
    if (!rows.length) return res.status(404).json({ error: 'Topilmadi' });
    res.json({ product: rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Server xatosi' });
  }
});

// DELETE /api/products/:id (admin)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    await pool.query('UPDATE products SET is_active=false WHERE id=$1', [req.params.id]);
    res.json({ message: 'O\'chirildi' });
  } catch (err) {
    res.status(500).json({ error: 'Server xatosi' });
  }
});

module.exports = router;
