const router = require('express').Router();
const pool = require('../config/db');
const { adminAuth } = require('../middleware/auth');

// GET /api/banners
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM banners WHERE is_active=true ORDER BY sort_order ASC'
    );
    res.json({ banners: rows });
  } catch (err) {
    res.status(500).json({ error: 'Server xatosi' });
  }
});

// POST /api/banners (admin)
router.post('/', adminAuth, async (req, res) => {
  try {
    const { title, image_url, link_type, link_value, sort_order } = req.body;
    const { rows } = await pool.query(
      'INSERT INTO banners (title, image_url, link_type, link_value, sort_order) VALUES ($1,$2,$3,$4,$5) RETURNING *',
      [title, image_url, link_type, link_value, sort_order || 0]
    );
    res.status(201).json({ banner: rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/banners/:id (admin)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    await pool.query('DELETE FROM banners WHERE id=$1', [req.params.id]);
    res.json({ message: 'O\'chirildi' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
