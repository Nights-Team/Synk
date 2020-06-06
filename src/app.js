/* eslint-disable no-unused-vars */
const express = require('express');
const discord = require('discord.js');
const bodyParser = require('body-parser');
require('dotenv').config();
const { channel_name: channelName } = require('../config.json')[0];
const embedGen = require('./utils/embedGen');

const client = new discord.Client({ disableEveryone: true });

const app = express();
const PORT = process.env.PORT || 3000;

// Tell express to use body-parser's JSON parsing
app.use(bodyParser.json());
// linear hook
app.post('/hooks/linear', async (req, res) => {
  // get linear data
  const { body: data } = req;
  // get user data from api
  const { embed } = await embedGen({ data });
  // get channel

  if (embed) {
    const channel = client.channels.cache.find((c) => c.name === channelName);
    channel.send(embed);
  }
});
// firing the server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
client.on('ready', () => {
  console.log('The bot is up and running!');
});
// run discord bot
client.login(process.env.BOT_KEY);
