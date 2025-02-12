const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config(); // Load environment variables

// Create the client with required intents
const client = new Client({ 
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] 
});

// Runs whenever a message is sent
client.on("messageCreate", message => {
    if (message.content === 'hello') {
        message.channel.send("Hello! This is going to be an LLM-generated response.");
    }
});

// Login the bot
client.login(process.env.BOT_TOKEN);
