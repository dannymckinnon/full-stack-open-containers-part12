const express = require('express');
const { Todo } = require('../mongo');
const router = express.Router();
const { getAsync, setAsync } = require('../redis');

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });

  const currentCount = await getAsync('added_todos');
  await setAsync('added_todos', Number(currentCount || 0) + 1);

  res.send(todo);
});

router.get('/statistics', async (req, res) => {
  const currentCount = await getAsync('added_todos');
  const data = {
    added_todos: currentCount,
  };

  res.send(data);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  const todo = req.todo;
  res.send(todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const { text, done } = req.body;
  const todo = req.todo;

  todo.text = text || todo.text;
  todo.done = done !== undefined ? done : todo.done;

  await todo.save();
  res.send(todo);
});

router.use('/:id', findByIdMiddleware, singleRouter);

module.exports = router;
