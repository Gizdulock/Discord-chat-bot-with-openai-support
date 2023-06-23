const openai = require('openai');

openai.apiKey = process.env.OPENAI_API_KEY;

openai.Completion.create({
  engine: "text-davinci-003",
  prompt: "Translate the following Hungarian text to English: '{szia. Teszteljük le az api kulcsot}'",
  maxTokens: 60
})
.then(response => {
  console.log(response);
})
.catch(err => {
  console.error(err);
});
