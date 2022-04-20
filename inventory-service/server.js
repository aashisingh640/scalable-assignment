const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const Inventory = require('./inventoryModel');

const app = express();
app.use(express.json());

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true}).then(con => {
    console.log('connected to database for inventory-service...');
}).catch(err => console.log('error in connecting database for inventory-service...', err))

app.use('/inventory', async (req, res, next) => {
    try {

        const books = await Inventory.find();
    
        return res.json({
            success: true,
            result: books.length,
            data: {
                books
            }
        })

    } catch (err) {

        console.log(err);

        return res.status(404).json({ 
            success: false,
            message: `no books found`,
            err: err
        })
    
    }
});

app.get('/', (req, res, next) => {
    res.send('Welcome to inventory service');
});

app.all('*', (req, res, next) => {
    return res.status(404).json({ 
        success: false,
        message: `Can't find ${req.originalUrl}`
    })
})

app.listen(process.env.PORT || 5000, () => {
    console.log('inventory-service listening on ' + process.env.PORT || 5000);
})