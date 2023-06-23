const axios = require('axios');

async function getQuota(apiKey) {
  const options = {
    headers: {
      'Authorization': `Bearer ${apiKey}`
    }
  };
  return axios.get('https://api.openai.com/v1/usage', options)
    .then(response => response.data.data.monthly_billed_tokens);
}

module.exports = {
  getQuota
};
