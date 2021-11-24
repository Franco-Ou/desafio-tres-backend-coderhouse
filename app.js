const Contenedor = require('./contenedor.js');
const express = require('express');
const app = express();

app.listen(process.env.PORT || 8080);

const getAllItems = async() => {
    const contenedorDeProductos = new Contenedor("productos.txt");
    await contenedorDeProductos.initializer();
    const productsArray = contenedorDeProductos.getAll();
    return productsArray;
}

const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

const getRandomProduct = async() => {
    const contenedorDeProductos = new Contenedor("productos.txt")
    await contenedorDeProductos.initializer();
    const productsArray = contenedorDeProductos.getAll();
    const randomProduct = productsArray[getRandomNumber(0, productsArray.length)];

    return randomProduct;
}

app.get('/', (req, res) => {
    res.send("<h1>Página principal</h1>");
})

app.get('/productos', async(req, res) => {
    try {
        const allItems = await getAllItems();
        res.send(`<p>${JSON.stringify(allItems)}</p>`);
    } catch (error) {
        console.log(error);
    }
})

app.get('/productoRandom', async(req, res) => {
    try {
        const randomProduct = await getRandomProduct();
        res.send(`<p>${JSON.stringify(randomProduct)}</p>`);
    } catch (error) {
        console.log(error);
    }
})