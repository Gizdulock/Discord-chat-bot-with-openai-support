const { SlashCommandBuilder } = require('@discordjs/builders');
const { execute } = require('../commandHandler.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('translate')
        .setDescription('Translate a text')
        .addStringOption(option =>
            option.setName('source_lang')
                .setDescription('Source language')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('target_lang')
                .setDescription('Target language')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('text')
                .setDescription('Text to translate')
                .setRequired(true)),
    async execute(interaction, client) {
        const sourceLang = interaction.options.getString('source_lang');
        const targetLang = interaction.options.getString('target_lang');
        const text = interaction.options.getString('text');

        if (!text) {
            await interaction.reply('Please provide a text to translate.');
            return;
        }

        const prompt = `Translate the following ${sourceLang} text to ${targetLang}: ${text}`;
        const response = await client.openai.complete({
            engine: 'text-davinci-003',
            prompt: prompt,
            maxTokens: 100
        });
        await interaction.reply(response.choices[0].text);
    },
};
