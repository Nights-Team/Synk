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
* `LINEAR_API_KEY` : Linear provides personal API keys trough they settings page, [Get yours](https://linear.app/settings/api)
* `BOT_KEY` : Your discord bot token, [follow these instructions to get it](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token)

### config.json

* `channel_name` : we usually use `synk`, but you can do whatever you feel like :100:

# Setup :runner:

```sh
cd SynK
npm i
npm start
```
