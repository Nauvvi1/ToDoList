// routes/tasks.mjs
import express from 'express';
import { getTasks, addTask, updateTask, deleteTask } from '../controllers/tasksController.mjs';

const router = express.Router();

// Получение всех задач
router.get('/', getTasks);

// Добавление новой задачи
router.post('/', addTask);

// Обновление задачи
router.put('/:id', updateTask);

// Удаление задачи
router.delete('/:id', deleteTask);

export default router;
