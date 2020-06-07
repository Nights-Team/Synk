const fetch = require('node-fetch');
const { hooks } = require('../../config.json')[0];

module.exports = async (stateId) => {
  try {
    const endPoint = hooks.linear.end_point;
    const query = /* GraphQL Query */ ` 
          query{
            workflowState(id: "${stateId}") {
                color
                name
              }
          }
      `;
    const body = JSON.stringify({ query });
    const response = await fetch(endPoint, {
      method: 'POST',
      headers: {
        Authorization: process.env.LINEAR_API_KEY,
        'Content-Type': 'application/json',
      },
      body,
    });
    const json = await response.json();
    return json.data.workflowState;
  } catch (e) {
    console.log(e);
    return false;
  }
};
