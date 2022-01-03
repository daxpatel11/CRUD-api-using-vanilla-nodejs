let products = require('../data/products.json');
const fs = require('fs');
function findAll(){
    return new Promise((resolve,reject) => {
        resolve(products);
    })
}

function findByID(id){
    return new Promise((resolve,reject) => {
        // console.log(id);
        const product = products.find((p) => p.id === id)
            // p.id == id
         
        // console.log(product);
        // console.log(product);
        resolve(product);
    })
}

function create(product){
    return new Promise((resolve,reject) => {
        const newProduct = {...product};
        products.push(newProduct);
        // console.log(__dirname);
        fs.writeFileSync(__dirname+'/../data/products.json',JSON.stringify(products),'utf-8',(err) => {
            if(err)
            console.log(err);
        })
        resolve(newProduct);
    })
}

function update(id, product){
    return new Promise((resolve,reject) => {

        let index = products.findIndex((p) => p.id === id);
        products[index] = {id , ...product};
        // console.log(__dirname);
        fs.writeFileSync(__dirname+'/../data/products.json',JSON.stringify(products),'utf-8',(err) => {
            if(err)
            console.log(err);
        })
        resolve(products[index]);
    })
}

async function remove(id)
{
    return new Promise((resolve,reject) => {
        products = products.filter((p) => p.id !== id);
        fs.writeFileSync(__dirname+'/../data/products.json',JSON.stringify(products),'utf-8',(err) => {
            if(err)
            console.log(err);
        })
        resolve();
    })
}



module.exports = {
    findAll,
    findByID,
    create,
    update,
    remove
}