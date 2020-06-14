const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString,
});
module.exports = async (serverId) => {
  const rows = await new Promise((resolve, reject) => {
    pool.query(`SELECT channelId FROM servers WHERE serverid='${serverId}'`, (err, res) => {
      resolve(res.rows);
      if (err) reject(err);
    });
  });
  return rows;
};
