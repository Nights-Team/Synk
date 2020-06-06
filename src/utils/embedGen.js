const Discord = require('discord.js');
const getIssueById = require('./getIssueById');
const { getUser } = require('.');

// eslint-disable-next-line consistent-return
module.exports = async (data) => {
  if (data.data.type === 'Comment' && data.data.action === 'create') {
    const issue = await getIssueById(data.data.data.issueId);
    const user = await getUser(data.data.data.userId);
    // handeling comment here
    const embed = new Discord.MessageEmbed();
    embed.setAuthor(user.data.user.name, user.data.user.avatarUrl);
    embed.setTitle(`New Comment on \`${issue[0].node.title}\``).setURL(data.data.url);
    embed.addField('\u200B', data.data.data.body);
    if (issue[0].node.project) {
      embed.setColor(issue[0].node.project.color);
      embed.setFooter(`${issue[0].node.project.name}/${issue[0].node.team.name}`);
    }

    return { embed };
  }
  if (data.data.type === 'Issue' && data.data.action === 'create') {
    const embed = new Discord.MessageEmbed();
    const user = await getUser(data.data.data.creatorId);
    const assignedTo = data.data.data.assigneeId ? await getUser(data.data.data.creatorId) : null;
    embed.setAuthor(user.data.user.name, user.data.user.avatarUrl);
    embed.setTitle(` New issue: \`${data.data.data.title} \``);
    embed.addField('Issue Description', data.data.data.description ? data.data.data.description : 'No description');
    embed.addField('Assigned', assignedTo ? assignedTo.data.user.name : 'Unassigned');

    return { embed };
  }
  return false;
};