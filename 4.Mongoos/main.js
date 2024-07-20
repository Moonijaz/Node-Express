// import mongoose from "mongoose";
// import {express} from "express";
// import { Todo } from "../models/Todo.js";
// let conn = await mongoose.connect("mongodb://localhost:27017/")



// const app = express()
// const port = 3000

// app.get('/', (req, res) => {
//     const todo = new Todo({title:"my todo", desc:"my first todo", isDone: false })
//     todo.save()
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })



import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

async function startServer() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect('mongodb://localhost:27017/', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');

    const TodoPath = path.join(__dirname, '../models/Todo.js');
    const { Todo } = await import(TodoPath);
    console.log('Todo model imported:', Todo);

    app.get('/', async (req, res) => {
      const todo = new Todo({ title: 'my todo', desc: 'my first todo', isDone: false });
      await todo.save();
      res.send('Hello World!');
    });

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

startServer();
