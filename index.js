#!/usr/bin/env node
require('dotenv').config();

const main = async (token) => {
  if (!token) {
    throw new Error("Telegram bot token is required");
  }

  const TelegramBot = require('node-telegram-bot-api');
  const options = {
    polling: true
  };
  const bot = new TelegramBot(token, options);
  console.log("Bot started! Waiting for messages...");

  bot.onText(/.*/, (message) => {
    console.log('Received', message);
  })

  bot.onText(/.*тусовки (.+)\?$/, (message, match) => {
    const resp = `Тусовки ${match[1]} хороши, но лучшие тусовки — у нас в клубе!`;
    bot.sendMessage(message.chat.id, resp);
  });
}

main(
  process.env.TOKEN,
).catch((error) => {
  console.error(error.message);
  process.exit(1);
});
