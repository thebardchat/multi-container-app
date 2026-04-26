const axios = require('axios');

const OLLAMA_URL = process.env.OLLAMA_URL || 'http://host.docker.internal:11434';
const MODEL = process.env.OLLAMA_MODEL || 'llama3.2:1b';
const EMBED_MODEL = process.env.EMBED_MODEL || 'nomic-embed-text';

async function suggestFirstStep(task) {
    try {
        const { data } = await axios.post(`${OLLAMA_URL}/api/generate`, {
            model: MODEL,
            prompt: `Task: "${task}"\nWhat is the single most important first step? Reply in one sentence, max 12 words, no filler, no quotes.`,
            stream: false
        }, { timeout: 8000 });
        return data.response?.trim() || null;
    } catch {
        return null;
    }
}

async function embed(text) {
    try {
        const { data } = await axios.post(`${OLLAMA_URL}/api/embed`, {
            model: EMBED_MODEL,
            input: text
        }, { timeout: 5000 });
        return data.embeddings?.[0] || null;
    } catch {
        return null;
    }
}

module.exports = { suggestFirstStep, embed };
