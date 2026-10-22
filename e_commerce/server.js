require("dotenv").config({ quiet: true });

const express = require("express");
const path = require("path");

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");

const { readData } = require("./utils/fileDB");

const app = express();

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.get('/products-page', async (req, res, next) => {
    try {
        const products = await readData('products.json');
        res.render("products", { products });
    } catch (error) {

        next(error);

    }
});

app.get('/orders-page', async (req, res, next) => {
    try{
        const orders = await readData('orders.json');
        res.render('orders', { orders });
    } catch (error) {

        next(error);

    }
});

app.use((err, req, res, next) => {
    console.log(err.message);
    
    res.status(500).json({
        error: 'Internal Server Error'
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})