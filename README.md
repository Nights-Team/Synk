# Synk 
Discord bot to sync Linear updates with a Discord channel.

# Screenshots :muscle:
![Create Issue](https://i.postimg.cc/yxwqQzts/Screenshot-from-2020-06-09-22-22-52.png)

![Comment](https://i.postimg.cc/brLDk3Bx/Screenshot-from-2020-06-09-20-00-15.png)

![Move between stages](https://i.postimg.cc/HWSk0cL9/Screenshot-from-2020-06-09-20-00-24.png)

# Getting started :books:
First things first! you need to edit two files 

### .env
Duplicate `env.template` and fill the values with the following : 
* `LINEAR_API_KEY` : Linear provide you with a personal API key trough their settings page, [Get it now](https://linear.app/settings/api)
* `BOT_KEY` : Your discord bot token, [follow these instructions to get it](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token)
* `DATABASE_URL` : Your database connection string (postgres://YourUserName:YourPassword@YourHost:5432/YourDatabase)
* `PORT` : The port that you want express server to use 
### config.json
``prefix``: edit this one to change bot prefix 
### Database setup
Synk is using postgresql as a database to save the channel id of each server
* #### Create database
```
CREATE DATABASE {name here}
```
* #### Create servers table
``` 
CREATE TABLE severs(serverId TEXT NOT NULL, channelId TEXT NOT NULL);
```
### Commands
* ``~/~ install`` : You can run this command to install synk on some specefic channel, and in order to reinstall synk, you have to run the same command again on any other channel.
# Setup :runner:

```sh
cd SynK
npm i
npm start
```
