#!/usr/bin/env node
import { Message } from 'node-telegram-bot-api';

require('dotenv').config();

const main = async (token: string | undefined) => {
  if (!token) {
    throw new Error('Telegram bot token is required');
  }

  const TelegramBot = require('node-telegram-bot-api');
  const options = {
    polling: true
  };
  const bot = new TelegramBot(token, options);
  console.log('Bot started! Waiting for messages...');

  bot.onText(/.*/, (message: Message) => {
    console.log('Received', message);
  });

  bot.onText(/.*тусовки (.+)\?$/, (message: Message, match: RegExpExecArray | null) => {
    const resp = `Тусовки ${match ? match[1] : ''} хороши, но лучшие тусовки — у нас в клубе!`;
    bot.sendMessage(message.chat.id, resp);
  });
};

main(
  process.env.TOKEN
).catch((error) => {
  console.error(error.message);
  process.exit(1);
});
