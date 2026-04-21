const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const { auth } = require('../middleware/auth');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { first_name, last_name, phone, email, password } = req.body;
    if (!first_name || !last_name || !password || (!phone && !email)) {
      return res.status(400).json({ error: 'Barcha maydonlarni to\'ldiring' });
    }
    // Check existing
    const exists = await pool.query(
      'SELECT id FROM users WHERE email=$1 OR phone=$2',
      [email || null, phone || null]
    );
    if (exists.rows.length) {
      return res.status(409).json({ error: 'Bu email yoki telefon allaqachon ro\'yxatdan o\'tgan' });
    }
    const hash = await bcrypt.hash(password, 12);
    const { rows } = await pool.query(
      `INSERT INTO users (first_name, last_name, phone, email, password_hash)
       VALUES ($1,$2,$3,$4,$5) RETURNING id, first_name, last_name, email, phone, role`,
      [first_name, last_name, phone || null, email || null, hash]
    );
    const user = rows[0];
    res.status(201).json({ token: signToken(user.id), user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server xatosi' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, phone, password } = req.body;
    if (!password || (!email && !phone)) {
      return res.status(400).json({ error: 'Email/telefon va parol kiriting' });
    }
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE email=$1 OR phone=$2',
      [email || null, phone || null]
    );
    if (!rows.length) return res.status(401).json({ error: 'Foydalanuvchi topilmadi' });
    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ error: 'Parol noto\'g\'ri' });
    const { password_hash, ...safeUser } = user;
    res.json({ token: signToken(user.id), user: safeUser });
  } catch (err) {
    res.status(500).json({ error: 'Server xatosi' });
  }
});

// GET /api/auth/me
router.get('/me', auth, (req, res) => {
  res.json({ user: req.user });
});

// PUT /api/auth/profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { first_name, last_name, phone, avatar_url } = req.body;
    const { rows } = await pool.query(
      `UPDATE users SET first_name=$1, last_name=$2, phone=$3, avatar_url=$4
       WHERE id=$5 RETURNING id, first_name, last_name, email, phone, role, avatar_url`,
      [first_name, last_name, phone, avatar_url, req.user.id]
    );
    res.json({ user: rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Server xatosi' });
  }
});

module.exports = router;
