const express = require('express');
const Todo = require('./../models/Todo');
const { suggestFirstStep } = require('../services/ai');
const { indexTodo, deleteTodo, searchSimilar } = require('../services/memory');

const router = express.Router();

router.get('/', async (req, res) => {
    const q = req.query.q?.trim();
    let tasks;

    if (q) {
        const results = await searchSimilar(q);
        const ids = results.map(r => r.mongoId);
        const found = await Todo.find({ _id: { $in: ids } });
        const order = Object.fromEntries(ids.map((id, i) => [id, i]));
        tasks = found.sort((a, b) => (order[a._id.toString()] ?? 99) - (order[b._id.toString()] ?? 99));
    } else {
        tasks = await Todo.find().sort({ created_at: -1 });
    }

    res.render('todos', { tasks, q: q || '' });
});

router.post('/', async (req, res) => {
    const task = req.body.task?.trim();
    if (!task) return res.redirect('/');

    const hint = await suggestFirstStep(task);
    const todo = await new Todo({ task, hint }).save().catch(err => { console.log(err); return null; });

    if (todo) indexTodo(todo._id, task);

    res.redirect('/');
});

router.post('/todo/toggle', async (req, res) => {
    const todo = await Todo.findById(req.body._key);
    if (todo) {
        todo.completed = !todo.completed;
        await todo.save();
    }
    res.redirect(req.headers.referer || '/');
});

router.post('/todo/destroy', async (req, res) => {
    const { _key } = req.body;
    await Promise.all([
        Todo.findByIdAndDelete(_key).catch(err => console.log(err)),
        deleteTodo(_key)
    ]);
    res.redirect(req.headers.referer || '/');
});

module.exports = router;
