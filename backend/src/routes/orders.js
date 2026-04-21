const router = require('express').Router();
const pool = require('../config/db');
const { auth, adminAuth } = require('../middleware/auth');

// POST /api/orders  (buyurtma yaratish)
router.post('/', auth, async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const { address, payment_method = 'cash', note } = req.body;
    if (!address) return res.status(400).json({ error: 'Manzil kerak' });

    // Cart items
    const { rows: cartItems } = await client.query(
      `SELECT ci.quantity, p.id as product_id, p.price, p.discount_price, p.stock, p.name
       FROM cart_items ci JOIN products p ON ci.product_id = p.id
       WHERE ci.user_id = $1`,
      [req.user.id]
    );
    if (!cartItems.length) return res.status(400).json({ error: 'Savat bo\'sh' });

    // Check stock
    for (const item of cartItems) {
      if (item.stock < item.quantity) {
        await client.query('ROLLBACK');
        return res.status(400).json({ error: `${item.name} omborda yetarli emas` });
      }
    }

    const total = cartItems.reduce((sum, item) => {
      return sum + (item.discount_price || item.price) * item.quantity;
    }, 0);

    const { rows: [order] } = await client.query(
      'INSERT INTO orders (user_id, address, payment_method, note, total_price) VALUES ($1,$2,$3,$4,$5) RETURNING *',
      [req.user.id, address, payment_method, note || null, total]
    );

    for (const item of cartItems) {
      await client.query(
        'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1,$2,$3,$4)',
        [order.id, item.product_id, item.quantity, item.discount_price || item.price]
      );
      await client.query(
        'UPDATE products SET stock = stock - $1 WHERE id = $2',
        [item.quantity, item.product_id]
      );
    }

    await client.query('DELETE FROM cart_items WHERE user_id=$1', [req.user.id]);
    await client.query('COMMIT');
    res.status(201).json({ order, message: 'Buyurtma muvaffaqiyatli berildi!' });
  } catch (err) {
    await client.query('ROLLBACK');
    res.status(500).json({ error: 'Server xatosi' });
  } finally {
    client.release();
  }
});

// GET /api/orders  (user o'z buyurtmalari)
router.get('/', auth, async (req, res) => {
  try {
    const { rows: orders } = await pool.query(
      'SELECT * FROM orders WHERE user_id=$1 ORDER BY created_at DESC',
      [req.user.id]
    );
    for (const order of orders) {
      const { rows: items } = await pool.query(
        `SELECT oi.*, p.name, p.images FROM order_items oi
         LEFT JOIN products p ON oi.product_id = p.id
         WHERE oi.order_id = $1`,
        [order.id]
      );
      order.items = items;
    }
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ error: 'Server xatosi' });
  }
});

// GET /api/orders/all  (admin)
router.get('/all', adminAuth, async (req, res) => {
  try {
    const { rows: orders } = await pool.query(
      `SELECT o.*, u.first_name, u.last_name, u.phone, u.email
       FROM orders o LEFT JOIN users u ON o.user_id = u.id
       ORDER BY o.created_at DESC`
    );
    for (const order of orders) {
      const { rows: items } = await pool.query(
        `SELECT oi.*, p.name, p.images FROM order_items oi
         LEFT JOIN products p ON oi.product_id = p.id WHERE oi.order_id=$1`,
        [order.id]
      );
      order.items = items;
    }
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ error: 'Server xatosi' });
  }
});

// PUT /api/orders/:id/status  (admin)
router.put('/:id/status', adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'confirmed', 'delivering', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) return res.status(400).json({ error: 'Noto\'g\'ri status' });
    const { rows } = await pool.query(
      'UPDATE orders SET status=$1 WHERE id=$2 RETURNING *',
      [status, req.params.id]
    );
    res.json({ order: rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Server xatosi' });
  }
});

module.exports = router;
