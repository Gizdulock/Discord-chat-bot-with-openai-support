const fs = require('fs');

function loadConfig() {
  const rawConfig = fs.readFileSync('./config.json');
  const config = JSON.parse(rawConfig);
  return config;
}

module.exports = {
  loadConfig
};
