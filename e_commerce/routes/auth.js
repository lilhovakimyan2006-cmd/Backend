const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { readData, writeData } = require('../utils/fileDB');

const router = express.Router();

const SECRET = process.env.SECRET;

if (!SECRET) {
    throw new Error('SECRET is Not Defined');
}

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res, next) => {
    try {
        const { username, password } = req.body;
    
        if (typeof username !== 'string' ||
            typeof password !== 'string' ||
            !username.trim() ||
            !password
        ) {
            return res.status(400).json({
                error: 'Username and Password are Required'
            });
        }
    
        const users = await readData('users.json');

        const userName = username.trim();
    
        if (users.find((u) => u.username === userName)) {
            return res.status(409).json({
                error: 'Username already Exists'
            })
        }
    
        const newUser = {
            id: users.length 
                ? Math.max(...users.map((u) => u.id)) + 1
                : 1,
            username: userName,
            passwordHash: await bcrypt.hash(password, 10),
            role: 'customer'
        }
    
        users.push(newUser);
        await writeData('users.json', users);
    
        res.status(201).json({
            id: newUser.id,
            username: newUser.username,
            role: newUser.role
        });

    } catch(error) {

        next(error);

    }
});

router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (typeof username !== 'string' ||
            typeof password !== 'string' ||
            !username.trim() ||
            !password
        ) {
            return res.status(400).json({
                error: 'Username and Password are Required'
            });
        }
    
        const users = await readData('users.json');

        const userName = username.trim();
    
        const user = users.find((u) => u.username === userName);
    
        if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
            return res.status(401).json({
                error: 'Invalid Credentials'
            });
        }
    
        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                role: user.role,
            },
            SECRET,
            { expiresIn: '2h'}
        );
    
        res.json({ token });

    } catch(error) {

        next(error);
    }
});

module.exports = router;