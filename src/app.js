/* eslint-disable no-unused-vars */
const express = require('express');
const discord = require('discord.js');
const bodyParser = require('body-parser');
const { channel_name: channelName } = require('../config.json')[0];
const { getUser } = require('./utils');

const client = new discord.Client({ disableEveryone: true });

const app = express();
const PORT = 3000;

// Tell express to use body-parser's JSON parsing
app.use(bodyParser.json());
// linear hook
app.post('/hooks/linear', async (req, res) => {
  // get linear data
  const { body: data } = req;
  const {
    action, data: content, type, url, createdAt,
  } = data;
  console.log(content.userId);
  const user = await getUser(content.userId);
  console.log(user);
  // get channel
  const channel = client.channels.cache.find((c) => c.name === channelName);
  channel.send('new comment has been added');
});
// firing the server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
client.on('ready', () => {
  console.log('The bot is up and running!');
});
// run discord bot
client.login('NzE4MjE4MTE3NTk5MTk5MzMy.Xtlq7g.iC0C42QNyrO7_Hd9N4CIN4pRNTI');
