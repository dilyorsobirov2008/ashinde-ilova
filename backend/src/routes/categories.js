const router = require('express').Router();
const pool = require('../config/db');
const { adminAuth } = require('../middleware/auth');

// GET /api/categories
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM categories ORDER BY sort_order ASC');
    res.json({ categories: rows });
  } catch (err) {
    res.status(500).json({ error: 'Server xatosi' });
  }
});

// POST /api/categories (admin)
router.post('/', adminAuth, async (req, res) => {
  try {
    const { name, slug, emoji, icon_url, sort_order } = req.body;
    if (!name || !slug) return res.status(400).json({ error: 'Nomi va slug kerak' });
    const { rows } = await pool.query(
      'INSERT INTO categories (name, slug, emoji, icon_url, sort_order) VALUES ($1,$2,$3,$4,$5) RETURNING *',
      [name, slug, emoji || null, icon_url || null, sort_order || 0]
    );
    res.status(201).json({ category: rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/categories/:id (admin)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const { name, slug, emoji, icon_url, sort_order } = req.body;
    const { rows } = await pool.query(
      'UPDATE categories SET name=$1,slug=$2,emoji=$3,icon_url=$4,sort_order=$5 WHERE id=$6 RETURNING *',
      [name, slug, emoji, icon_url, sort_order, req.params.id]
    );
    res.json({ category: rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/categories/:id (admin)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    await pool.query('DELETE FROM categories WHERE id=$1', [req.params.id]);
    res.json({ message: 'O\'chirildi' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
