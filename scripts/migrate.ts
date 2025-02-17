import client from "../config/db";

async function createTables() {
  try {
    await client.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                password TEXT NOT NULL,
                name VARCHAR(255),
                role VARCHAR(50) DEFAULT 'user'
            );

            CREATE TABLE IF NOT EXISTS messages (
                id SERIAL PRIMARY KEY,
                user_id INT REFERENCES users(id) ON DELETE CASCADE,
                text TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT NOW()
            );

            CREATE TABLE IF NOT EXISTS surveys (
                id SERIAL PRIMARY KEY,
                question TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS survey_responses (
                id SERIAL PRIMARY KEY,
                user_id INT REFERENCES users(id) ON DELETE CASCADE,
                survey_id INT REFERENCES surveys(id) ON DELETE CASCADE,
                response TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT NOW()
            );

            CREATE TABLE IF NOT EXISTS therapists (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                expertise TEXT NOT NULL,
                location TEXT
                number TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS moods (
                id SERIAL PRIMARY KEY,
                user_id INT REFERENCES users(id) ON DELETE CASCADE,
                mood TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT NOW()
            );
        `);

    console.log("✅ Database tables created successfully!");
    client.end();
  } catch (err) {
    console.error("❌ Error creating tables:", err);
    client.end();
  }
}

createTables();
