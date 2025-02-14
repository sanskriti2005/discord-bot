import express from 'express';
import readline from 'readline';
import ollama from 'ollama';

const app = express();
const PORT = 3000;

// Create terminal input interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to chat with Ollama
async function chatWithOllama(message) {
  try {
    const response = await ollama.chat({
      model: 'deepseek-r1', // Change model if needed
      messages: [{ role: 'user', content: message }],
    });

    const cleanMessage = response.message.content.replace(/<think>.*?<\/think>/gs, '').trim();

    console.log(`🤖 Ollama: ${cleanMessage}\n`);
    askQuestion(); // Continue conversation
  } catch (error) {
    console.error("Error:", error);
  }
}

// Ask user for input
function askQuestion() {
  rl.question("📝 You: ", (input) => {
    if (input.toLowerCase() === 'exit') {
      console.log("👋 Chatbot exiting...");
      rl.close();
      process.exit(0);
    }
    chatWithOllama(input);
  });
}

// Start chatbot
console.log("💬 Terminal Chatbot with Ollama (Type 'exit' to quit)\n");
askQuestion();


