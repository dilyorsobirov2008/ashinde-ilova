const router = require('express').Router();
const pool = require('../config/db');
const { auth } = require('../middleware/auth');

// GET /api/wishlist
router.get('/', auth, async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT w.id, p.* FROM wishlists w JOIN products p ON w.product_id = p.id
       WHERE w.user_id = $1 ORDER BY w.created_at DESC`,
      [req.user.id]
    );
    res.json({ wishlist: rows });
  } catch (err) {
    res.status(500).json({ error: 'Server xatosi' });
  }
});

// POST /api/wishlist
router.post('/', auth, async (req, res) => {
  try {
    const { product_id } = req.body;
    await pool.query(
      'INSERT INTO wishlists (user_id, product_id) VALUES ($1,$2) ON CONFLICT DO NOTHING',
      [req.user.id, product_id]
    );
    res.json({ message: 'Sevimlilarga qo\'shildi' });
  } catch (err) {
    res.status(500).json({ error: 'Server xatosi' });
  }
});

// DELETE /api/wishlist/:product_id
router.delete('/:product_id', auth, async (req, res) => {
  try {
    await pool.query(
      'DELETE FROM wishlists WHERE user_id=$1 AND product_id=$2',
      [req.user.id, req.params.product_id]
    );
    res.json({ message: 'O\'chirildi' });
  } catch (err) {
    res.status(500).json({ error: 'Server xatosi' });
  }
});

module.exports = router;
