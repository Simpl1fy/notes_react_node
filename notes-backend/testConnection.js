const conn = require('./connection'); // Adjust the path as necessary

(async () => {
    try {
      const [rows] = await conn.query('SELECT 1 + 1 AS solution');
      console.log('Database connection test successful. The solution is:', rows[0].solution);
    } catch (error) {
      console.error('Database connection error:', error);
    }
  })();