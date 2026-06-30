const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 5000; // Internet server ke liye port system

app.use(cors());
app.use(express.json());

const FILE_PATH = './database.json';

const readDataFromFile = () => {
    if (!fs.existsSync(FILE_PATH)) {
        const defaultData = [
            { id: 1, name: 'Rahul' },
            { id: 2, name: 'Amit' },
            { id: 3, name: 'Priya' }
        ];
        fs.writeFileSync(FILE_PATH, JSON.stringify(defaultData, null, 2));
        return defaultData;
    }
    const fileData = fs.readFileSync(FILE_PATH, 'utf-8');
    return JSON.parse(fileData);
};

// ⭐ NAYI LINE: Isse main link kholne par 'Cannot GET /' ka error nahi aayega
app.get('/', (req, res) => {
    res.send('Welcome! Aapka live backend server safely chal raha hai. Data dekhne ke liye URL ke aage /users lagayein.');
});

// GET Route
app.get('/users', (req, res) => {
    const usersList = readDataFromFile();
    res.json(usersList);
});

// POST Route
app.post('/users', (req, res) => {
    const newUserName = req.body.name;
    if (newUserName) {
        const usersList = readDataFromFile();
        const newUser = {
            id: usersList.length + 1,
            name: newUserName
        };
        usersList.push(newUser);
        fs.writeFileSync(FILE_PATH, JSON.stringify(usersList, null, 2));
        res.json({ message: 'User permanent jud gaya!', currentList: usersList });
    } else {
        res.status(400).json({ error: 'Naam likhna zaroori hai!' });
    }
});

app.listen(PORT, () => {
    console.log(`Server Port ${PORT} par chal raha hai`);
});
