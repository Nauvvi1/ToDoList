import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { nanoid } from 'nanoid';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.resolve(__dirname, '../data/db.json');

function readDB() {
    const data = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(data);
}

function writeDB(data) {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

async function loadDB() {
    const data = readDB();
    return data || { tasks: [] };
}

// Получение всех задач
export const getTasks = async (req, res) => {
    const db = await loadDB();
    res.json(db.tasks);
};

// Добавление новой задачи
export const addTask = async (req, res) => {
    const db = await loadDB();
    const task = {
        id: nanoid(),
        title: req.body.title,
        completed: false
    };
    db.tasks.push(task);
    writeDB(db);
    res.json(task);
};

// Обновление задачи
export const updateTask = async (req, res) => {
    const db = await loadDB();
    const { id } = req.params;
    const task = db.tasks.find(t => t.id === id);
    if (task) {
        Object.assign(task, req.body);
        writeDB(db);
        res.json(task);
    } else {
        res.status(404).json({ error: 'Task not found' });
    }
};

// Удаление задачи
export const deleteTask = async (req, res) => {
    const db = await loadDB();
    const { id } = req.params;
    db.tasks = db.tasks.filter(t => t.id !== id);
    writeDB(db);
    res.status(204).send();
};
