const express = require('express');
const cors = require('cors');
const fs = require('fs'); // Files padhne aur likhne ke liye inbuilt tool
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const FILE_PATH = './database.json';

// Helper function: File se data padhne ke liye
const readDataFromFile = () => {
    if (!fs.existsSync(FILE_PATH)) {
        // Agar file nahi hai toh shuruat me ye default data daal do
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

// GET Route: File se permanent data nikal kar dena
app.get('/users', (req, res) => {
    const usersList = readDataFromFile();
    res.json(usersList);
});

// POST Route: Naya naam lekar file me permanent save karna
app.post('/users', (req, res) => {
    const newUserName = req.body.name;
    
    if (newUserName) {
        const usersList = readDataFromFile();
        const newUser = {
            id: usersList.length + 1,
            name: newUserName
        };
        usersList.push(newUser);
        
        // Data ko hamesha ke liye database.json file me save kar diya
        fs.writeFileSync(FILE_PATH, JSON.stringify(usersList, null, 2));
        
        res.json({ message: 'User permanent jud gaya!', currentList: usersList });
    } else {
        res.status(400).json({ error: 'Naam likhna zaroori hai!' });
    }
});

app.listen(PORT, () => {
    console.log(`Server http://localhost:${PORT} par chal raha hai`);
    console.log(`Local File Database [database.json] active ho gaya hai!`);
});
