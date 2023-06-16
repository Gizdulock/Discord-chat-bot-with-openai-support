const openaiHandler = require('./openaiHandler');

async function handleMessage(msg, apiKey) {
  const gptResponse = await openaiHandler.generateResponse(apiKey, msg.content);
  msg.reply(gptResponse);
}

module.exports = {
  handleMessage
};
