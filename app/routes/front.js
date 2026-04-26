const express = require('express');
const Todo = require('./../models/Todo');

const router = express.Router();

router.get('/', async (req, res) => {
    const todos = await Todo.find().sort({ created_at: -1 });
    res.render("todos", { tasks: todos });
});

router.post('/', async (req, res) => {
    const task = req.body.task && req.body.task.trim();
    if (!task) return res.redirect('/');
    await new Todo({ task }).save().catch(err => console.log(err));
    res.redirect('/');
});

router.post('/todo/toggle', async (req, res) => {
    const todo = await Todo.findById(req.body._key);
    if (todo) {
        todo.completed = !todo.completed;
        await todo.save();
    }
    res.redirect('/');
});

router.post('/todo/destroy', async (req, res) => {
    await Todo.findByIdAndDelete(req.body._key).catch(err => console.log(err));
    res.redirect('/');
});

module.exports = router;
