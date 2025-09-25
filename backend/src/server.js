console.log('Starting Fortune Farm server...');
console.log('Node version:', process.version);
console.log('Environment:', process.env.NODE_ENV);
console.log('Port:', process.env.PORT);

const app = require('./app');
const PORT = process.env.PORT || 10000;

console.log('App loaded, starting server on port:', PORT);

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Fortune Farm server running on port ${PORT}`);
  console.log(`Server URL: http://0.0.0.0:${PORT}`);
});

server.on('error', (error) => {
  console.error('❌ Server error:', error);
});

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    process.exit(0);
  });
});// CORS fix v2
