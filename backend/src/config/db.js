const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

pool.on('connect', () => {
  console.log('✅ PostgreSQL (Neon.tech) ga ulandi');
});

pool.on('error', (err) => {
  console.error('❌ PostgreSQL xatosi:', err.message);
});

module.exports = pool;
