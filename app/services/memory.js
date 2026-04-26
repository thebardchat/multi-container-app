const axios = require('axios');
const { embed } = require('./ai');

const WEAVIATE_URL = process.env.WEAVIATE_URL || 'http://host.docker.internal:8080';
const CLASS = 'ShaneTodo';

async function ensureSchema() {
    try {
        await axios.get(`${WEAVIATE_URL}/v1/schema/${CLASS}`, { timeout: 3000 });
    } catch (e) {
        if (e.response?.status === 404) {
            try {
                await axios.post(`${WEAVIATE_URL}/v1/schema`, {
                    class: CLASS,
                    vectorizer: 'none',
                    properties: [
                        { name: 'task', dataType: ['text'] },
                        { name: 'mongoId', dataType: ['text'] }
                    ]
                }, { timeout: 3000 });
                console.log(`Weaviate: created class ${CLASS}`);
            } catch (err) {
                console.warn('Weaviate schema init failed:', err.message);
            }
        } else {
            console.warn('Weaviate unavailable:', e.message);
        }
    }
}

async function indexTodo(id, task) {
    const vector = await embed(task);
    if (!vector) return;
    try {
        await axios.post(`${WEAVIATE_URL}/v1/objects`, {
            class: CLASS,
            properties: { task, mongoId: id.toString() },
            vector
        }, { timeout: 5000 });
    } catch (e) {
        console.warn('Weaviate index failed:', e.message);
    }
}

async function deleteTodo(mongoId) {
    try {
        const { data } = await axios.post(`${WEAVIATE_URL}/v1/graphql`, {
            query: `{ Get { ${CLASS}(where: { path: ["mongoId"], operator: Equal, valueText: "${mongoId}" }) { _additional { id } } } }`
        }, { timeout: 3000 });
        const objs = data?.data?.Get?.[CLASS] || [];
        await Promise.all(
            objs.map(o => axios.delete(`${WEAVIATE_URL}/v1/objects/${o._additional.id}`, { timeout: 3000 }))
        );
    } catch (e) {
        console.warn('Weaviate delete failed:', e.message);
    }
}

async function searchSimilar(query) {
    const vector = await embed(query);
    if (!vector) return [];
    try {
        const { data } = await axios.post(`${WEAVIATE_URL}/v1/graphql`, {
            query: `{ Get { ${CLASS}(nearVector: { vector: ${JSON.stringify(vector)} }, limit: 8) { task mongoId } } }`
        }, { timeout: 5000 });
        return data?.data?.Get?.[CLASS] || [];
    } catch {
        return [];
    }
}

module.exports = { ensureSchema, indexTodo, deleteTodo, searchSimilar };
