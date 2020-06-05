const Discord = require('discord.js');
const getIssueById = require('./getIssueById');

// eslint-disable-next-line consistent-return
module.exports = async (data) => {
  const issue = await getIssueById(data.data.data.issueId);
  if (data.data.type === 'Comment' && data.data.action === 'create') {
    // handeling comment here
    const embed = new Discord.MessageEmbed();
    embed.setAuthor(data.user.data.user.name, data.user.data.user.avatarUrl);
    embed.setTitle(`New Comment on \`${issue[0].node.title}\``).setURL(data.data.url);
    embed.addField('\u200B', data.data.data.body);
    return embed;
  }
};
