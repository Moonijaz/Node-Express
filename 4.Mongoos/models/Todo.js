// import mongoose from "mongoose";

// const TodoSchema = new mongoose.Schema({
//     title: String,
//     desc: String,
//     isDone: Boolean
//   });

// export const Todo = mongoose.model('Todo', TodoSchema);


import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  isDone: {
    type: Boolean,
    default: false
  }
});

const Todo = mongoose.model('Todo', todoSchema);

export { Todo };
