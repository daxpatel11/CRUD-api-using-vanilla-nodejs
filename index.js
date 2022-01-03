const http  = require('http');
const {getProducts,getProductsID , createProduct,UpdateProductsID ,DeleteProductID} = require('./controllers/ProductController');
const server = http.createServer((req,res)=>{
   
    if(req.url === '/api/products' && req.method == 'GET')
    {
       getProducts(req,res);
    }
   else if(req.url.match(/\/api\/products\/([0-9]+)/) && req.method ==='GET')
    {
        const id = req.url.split('/')[3];
        // console.log(id);
        getProductsID(req,res,id);
    }
    else if(req.url === '/api/products' && req.method ==='POST')
    {
        createProduct(req,res);
    }
    else if(req.url.match(/\/api\/products\/([0-9]+)/) && req.method ==='PUT')
    {
        const id = req.url.split('/')[3];
        // console.log(id);
        UpdateProductsID(req,res,id);
    }
    else if(req.url.match(/\/api\/products\/([0-9]+)/) && req.method ==='DELETE')
    {
        const id = req.url.split('/')[3];
        // console.log(id);
        DeleteProductID(req,res,id);
    }
    else{
        res.writeHead(400,{'Content-Type' : 'application/json'});
        res.end(JSON.stringify( {message : 'Route not found'}));
    }
})

const PORT =5000;
server.listen(PORT,() => {
    console.log('Server is running');
})

module.exports = server;