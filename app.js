// app.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import tasksRouter from './routes/tasks.mjs'; // Обновите путь

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.json()); // Для парсинга JSON
app.use(express.static(path.join(__dirname, 'public'))); // Для раздачи статических файлов
app.use('/tasks', tasksRouter); // Подключение маршрутов

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
