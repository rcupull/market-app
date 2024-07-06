import { connectDB } from './db';
import { logger } from './features/logger';
import { notificationsServicesInit } from './features/notifications/services';
import { app } from './server';
import fs from 'fs';
import https from 'https';
import http from 'http';
import { telegramServices } from './features/telegram/services';
import { nlpServicesInit } from './features/nlp/services';

connectDB();

telegramServices.init();
notificationsServicesInit();
nlpServicesInit();

if (process.env.NODE_ENV === 'production') {
  const privateKey = fs.readFileSync('/etc/letsencrypt/live/aseremarket.net/privkey.pem', 'utf8');
  const certificate = fs.readFileSync('/etc/letsencrypt/live/aseremarket.net/cert.pem', 'utf8');
  const ca = fs.readFileSync('/etc/letsencrypt/live/aseremarket.net/chain.pem', 'utf8');

  const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca,
  };

  const httpsServer = https.createServer(credentials, app);

  httpsServer.listen(443, () => {
    logger.info('HTTPS Server running on port 443');
  });
}

const httpServer = http.createServer(app);
httpServer.listen(80, () => {
  logger.info('HTTP Server running on port 80');
});
