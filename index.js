const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Bina file wala direct data array (RAM me save hoga)
let usersList = [
    { id: 1, name: 'Rahul' },
    { id: 2, name: 'Amit' },
    { id: 3, name: 'Priya' },
    { id: 4, name: 'PR4THVI' },
    { id: 5, name: 'ARYAN' }
];

// Main page par Welcome Message (Taaki Cannot GET / na aaye)
app.get('/', (req, res) => {
    res.send('Welcome! Aapka live backend server 100% active chal raha hai.');
});

// GET Route: Users ki list dena
app.get('/users', (req, res) => {
    res.json(usersList);
});

// POST Route: Naya naam jodna
app.post('/users', (req, res) => {
    const newUserName = req.body.name;
    if (newUserName) {
        const newUser = {
            id: usersList.length + 1,
            name: newUserName
        };
        usersList.push(newUser);
        res.json({ message: 'User permanent jud gaya!', currentList: usersList });
    } else {
        res.status(400).json({ error: 'Naam likhna zaroori hai!' });
    }
});

app.listen(PORT, () => {
    console.log(`Server Port ${PORT} par chal raha hai`);
});
