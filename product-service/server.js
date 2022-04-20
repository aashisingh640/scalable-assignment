const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const Book = require('./bookModel');

const app = express();
app.use(express.json());

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true}).then(con => {
    console.log('connected to database for product-service...');
}).catch(err => console.log('error in connecting database for product-service...', err))

app.use('/book/:id', async (req, res, next) => {
    try {
        const id = req.params.id;

        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({ 
                success: false,
                message: `book not found with the given id : ${req.params.id}`
            })
        }
    
        return res.json({ 
            success: true,
            data: {
                book
            }
        })

    } catch (err) {

        console.log(err);

        return res.status(404).json({ 
            success: false,
            message: `book not found with the given id : ${req.params.id}`,
            err: err
        })
    
    }
});

app.get('/', (req, res, next) => {
    res.send('Welcome to product service');
});

app.all('*', (req, res, next) => {
    return res.status(404).json({ 
        success: false,
        message: `Can't find ${req.originalUrl}`
    })
})

app.listen(process.env.PORT || 3000, () => {
    console.log('product-service listening on ' + process.env.PORT || 3000);
})