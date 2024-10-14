const pool = require('./db');

(async () => {
    try {
        const client = await pool.connect();
        console.log('Database connected successfully!');
        client.release();
    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
})();
