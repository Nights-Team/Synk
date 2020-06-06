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
  console.log(userId);
  const body = JSON.stringify({ query });
  const response = await fetch(endPoint, {
    method: 'POST',
    headers: {
      Authorization: 'o3PWFIJtzdK4YH6NhXNLsPa5tg2wZ2OYQqU9Cypf',
      'Content-Type': 'application/json',
    },

    body,
  });
  const json = response.json();
  const data = json;
  return data;
};
