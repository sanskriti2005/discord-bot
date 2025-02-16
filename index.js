import express from "express";
import ollama from "ollama";
import { Client, GatewayIntentBits } from "discord.js";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3000;

// Discord client setup
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Function to interact with Ollama
async function chatWithOllama(message) {
  try {
    const response = await ollama.chat({
      model: "deepseek-r1",
      messages: [{ role: "user", content: message }],
    });

    const cleanMessage = response.message.content
      .replace(/<think>.*?<\/think>/gs, "")
      .trim();
    return cleanMessage;
  } catch (error) {
    console.error("Error:", error);
    return "An error occurred while processing your request.";
  }
}

// Handle Discord messages
client.on("messageCreate", async (message) => {
  if (message.content.startsWith("!")) {
    await message.channel.sendTyping();
    const reply = await chatWithOllama(message.content);
    message.channel.send(reply || "Sorry, I couldn't process that.");
  }
});

// Express route for health check
app.get("/", (req, res) => {
  res.send("Discord Bot with Ollama is running!");
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  client.login(process.env.BOT_TOKEN);
});
