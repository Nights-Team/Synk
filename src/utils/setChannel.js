const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString,
});
module.exports = async (serverId, channelId) => {
  const rows = await new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO servers (serverId , channelId) VALUES('${serverId}' , '${channelId}')`,
      (err, res) => {
        if (!err && serverId !== undefined && channelId !== undefined) {
          resolve(res.rows);
        }
        if (err) {
          reject(err);
        }
      },
    );
  });
  return rows;
};
