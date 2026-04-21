require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const pool = require('./db');

async function migrate() {
  const client = await pool.connect();
  try {
    console.log('🔄 Migration boshlanmoqda...');

    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name  VARCHAR(100) NOT NULL,
        phone      VARCHAR(20)  UNIQUE,
        email      VARCHAR(200) UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        role       VARCHAR(20) DEFAULT 'user',
        avatar_url TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS categories (
        id       SERIAL PRIMARY KEY,
        name     VARCHAR(100) NOT NULL,
        slug     VARCHAR(100) UNIQUE NOT NULL,
        icon_url TEXT,
        emoji    VARCHAR(10),
        sort_order INT DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS products (
        id             SERIAL PRIMARY KEY,
        name           VARCHAR(255) NOT NULL,
        description    TEXT,
        price          NUMERIC(15,2) NOT NULL,
        discount_price NUMERIC(15,2),
        category_id    INT REFERENCES categories(id) ON DELETE SET NULL,
        images         TEXT[] DEFAULT '{}',
        rating         NUMERIC(3,2) DEFAULT 0,
        review_count   INT DEFAULT 0,
        stock          INT DEFAULT 0,
        brand          VARCHAR(100),
        is_featured    BOOLEAN DEFAULT FALSE,
        is_active      BOOLEAN DEFAULT TRUE,
        created_at     TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS banners (
        id         SERIAL PRIMARY KEY,
        title      VARCHAR(200),
        image_url  TEXT NOT NULL,
        link_type  VARCHAR(50),
        link_value VARCHAR(255),
        is_active  BOOLEAN DEFAULT TRUE,
        sort_order INT DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS cart_items (
        id         SERIAL PRIMARY KEY,
        user_id    INT REFERENCES users(id) ON DELETE CASCADE,
        product_id INT REFERENCES products(id) ON DELETE CASCADE,
        quantity   INT NOT NULL DEFAULT 1,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(user_id, product_id)
      );

      CREATE TABLE IF NOT EXISTS wishlists (
        id         SERIAL PRIMARY KEY,
        user_id    INT REFERENCES users(id) ON DELETE CASCADE,
        product_id INT REFERENCES products(id) ON DELETE CASCADE,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(user_id, product_id)
      );

      CREATE TABLE IF NOT EXISTS orders (
        id             SERIAL PRIMARY KEY,
        user_id        INT REFERENCES users(id) ON DELETE SET NULL,
        address        TEXT NOT NULL,
        payment_method VARCHAR(50) NOT NULL DEFAULT 'cash',
        status         VARCHAR(50) DEFAULT 'pending',
        total_price    NUMERIC(15,2) NOT NULL,
        note           TEXT,
        created_at     TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS order_items (
        id         SERIAL PRIMARY KEY,
        order_id   INT REFERENCES orders(id) ON DELETE CASCADE,
        product_id INT REFERENCES products(id) ON DELETE SET NULL,
        quantity   INT NOT NULL,
        price      NUMERIC(15,2) NOT NULL
      );
    `);

    // Seed default categories
    await client.query(`
      INSERT INTO categories (name, slug, emoji, sort_order) VALUES
        ('Elektronika',      'elektronika',      '🔌', 1),
        ('Telefonlar',       'telefonlar',       '📱', 2),
        ('Noutbuklar',       'noutbuklar',       '💻', 3),
        ('Maishiy texnika',  'maishiy-texnika',  '🏠', 4),
        ('Kiyimlar',         'kiyimlar',         '👕', 5),
        ('Uy-ro''zg''or',   'uy-rozgor',        '🛋️', 6),
        ('Sport',            'sport',            '⚽', 7),
        ('Go''zallik',       'gozallik',         '💄', 8)
      ON CONFLICT (slug) DO NOTHING;
    `);

    // Seed admin user
    const bcrypt = require('bcryptjs');
    const hash = await bcrypt.hash('dilyor1234', 10);
    await client.query(`
      INSERT INTO users (first_name, last_name, email, password_hash, role)
      VALUES ('Dilyor', 'Admin', 'dilyor@gmail.com', $1, 'admin')
      ON CONFLICT (email) DO NOTHING;
    `, [hash]);

    console.log('✅ Migration muvaffaqiyatli yakunlandi!');
    console.log('👤 Admin: dilyor@gmail.com | Parol: dilyor1234');
  } catch (err) {
    console.error('❌ Migration xatosi:', err.message);
  } finally {
    client.release();
    pool.end();
  }
}

migrate();
