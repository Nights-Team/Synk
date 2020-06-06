const fetch = require('node-fetch');
const { hooks } = require('../../config.json')[0];

module.exports = async (userId) => {
  const endPoint = hooks.linear.end_point;
  const query = /* GraphQL */ `
     query {
        user(id: "${userId}") {
            id
            name
            avatarUrl
          }
      }`;
  const body = JSON.stringify({ query });
  const response = await fetch(endPoint, {
    method: 'POST',
    headers: {
      Authorization: process.env.LINEAR_API_KEY,
      'Content-Type': 'application/json',
    },

    body,
  });
  const json = response.json();
  const data = json;
  return data;
};
