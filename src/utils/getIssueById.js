const fetch = require('node-fetch');
const { hooks } = require('../../config.json')[0];

module.exports = async (issueId) => {
  const endPoint = hooks.linear.end_point;
  const query = /* GraphQL Query */ ` 
        query{
            issues {
                edges {
                node {
                    id
                    title
                    project{
                        name
                        color
                    }
                    team{
                        name
                    }
                }
                }
            
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
  const data = json;
  const issue = data.data.issues.edges.filter((x) => x.node.id === issueId);
  return issue;
};
