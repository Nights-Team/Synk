const Discord = require('discord.js');
const getIssueById = require('./getIssueById');
const { getUser, getStateById } = require('.');

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
      embed.setFooter(`${issue[0].node.project.name}/${issue[0].node.team.name}`);
      embed.setColor(issue[0].node.project.color);
    }

    return { embed };
  }
  if (data.data.type === 'Issue' && data.data.action === 'create') {
    const embed = new Discord.MessageEmbed();
    const user = await getUser(data.data.data.creatorId);
    const assignedTo = data.data.data.assigneeId ? await getUser(data.data.data.creatorId) : null;
    const advencedIssueData = await getIssueById(data.data.data.id);
    if (advencedIssueData[0].node.project) {
      embed.setFooter(`${advencedIssueData[0].node.project.name}/${advencedIssueData[0].node.team.name}`);
      embed.setColor(advencedIssueData[0].node.project.color);
    }
    embed.setAuthor(user.data.user.name, user.data.user.avatarUrl);
    embed.setTitle(` New issue: \`${data.data.data.title} \``).setURL(data.data.url);
    embed.addField('Issue Description', data.data.data.description ? data.data.data.description : 'No description');
    embed.addField('Assigned', assignedTo ? assignedTo.data.user.name : 'Unassigned');

    return { embed };
  }
  if (data.data.type === 'Issue' && data.data.action === 'update') {
    let oldState = data.data.updatedFrom.stateId;
    let newState = data.data.data.stateId;
    // If state didn't change
    if (oldState === newState) return false;
    // Else, send an update
    oldState = await getStateById(oldState);
    newState = await getStateById(newState);
    if (!newState || !oldState) return false;
    const user = await getUser(data.data.data.creatorId);
    const embed = new Discord.MessageEmbed();
    embed.setColor(newState.color);
    embed.setAuthor(user.data.user.name, user.data.user.avatarUrl);
    embed.setTitle(data.data.data.title).setURL(data.data.url);
    embed.addField('\u200B', `changed status to **${newState.name}**`);
    return { embed };
  }
  return false;
};
