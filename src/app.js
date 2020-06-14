/* eslint-disable no-unused-vars */
const express = require('express');
const discord = require('discord.js');
const bodyParser = require('body-parser');
require('dotenv').config();
const { channel_name: channelName, prefix } = require('../config.json')[0];
const embedGen = require('./utils/embedGen');

const { getChannel, setChannel, updateChannel } = require('./utils');

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
    client.guilds.cache.forEach(async (g) => {
      const server = await getChannel(g.id);
      if (server.length > 0) {
        const channel = client.channels.cache.find((c) => c.id === server[0].channelid);
        channel.send(embed);
      }
    });
  }
  res.send();
});
// firing the server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT} \n🌖 Initializing Bot`));
client.on('message', async (msg) => {
  if (msg.content.startsWith(prefix)) {
    const param = msg.content.split(prefix)[1];
    if (!param) {
      msg.channel.send('please enter a command');
    } else if (param && param.trim() === 'install') {
      const channel = await getChannel(msg.channel.guild.id);
      const registered = channel.length > 0;
      if (!registered) {
        try {
          const response = await setChannel(msg.guild.id, msg.channel.id);
          msg.channel.send('the bot has been installed :tada:');
        } catch (err) {
          msg.channel.send('an error occurred while installing the bot');
        }
      } else {
        msg.channel.send('the bot is already installed');
        const filter = (m) => m.author.id === msg.author.id;
        await msg.channel.send('do you want to reinstall on this channel (yes,no)?');
        const collected = await msg.channel.awaitMessages(filter, { max: 1, time: 300000 });
        if (collected.first().content === 'yes') {
          try {
            const update = await updateChannel(msg.guild.id, msg.channel.id);
            msg.channel.send('the bot has been reinstalled :rose:');
          } catch (err) {
            msg.channel.send('an error occurred while reinstalling the bot');
          }
        } else if (collected.first().content === 'no') {
          msg.channel.send('the operation has been cancelled ');
        }
      }
    } else {
      msg.channel.send(`invalid command \`${param}\``);
    }
  }
});
client.on('ready', async () => {
  console.log('✔️  Bot is ready');
});
// run discord bot
client.login(process.env.BOT_KEY);
