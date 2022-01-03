const Product = require('../models/ProductModel');

async function getProducts(req,res) {
    try{

        const products = await Product.findAll();
        res.writeHead(200,{'Content-Type' : 'application/json'});
        res.end(JSON.stringify(products));
    }
    catch(error){
        console.log(error);
    }
}

async function getProductsID(req,res,id){
    try{
        const product = await Product.findByID(id);
       
        if(product)
        {   
            // console.log(product);
            res.writeHead(200,{'Content-Type' : 'application/json'});
            res.end(JSON.stringify(product));
        }
        else{
            res.writeHead(404,{'Content-Type' : 'application/json'});
            res.end(JSON.stringify({ message : 'Product doesnot exist'}));
        }
    }
    catch(error){
        console.log(error);
    }
}

async function createProduct(req,res) {
    try{
        let body='';
        req.on('data',(chunk) => {
            body+= chunk.toString();
        })
        req.on('end', async () => {
            const newproduct = await Product.create(JSON.parse(body));
            res.writeHead(201,{'Content-Type' : 'application/json'});
            res.end(JSON.stringify(newproduct));
        })
       
       
    }
    catch(error){
        console.log(error);
    }
}

async function UpdateProductsID(req,res,id){
    try{
      
        const product = await Product.findByID(id);
       
        if(product)
        {   
            let body='';
            req.on('data',(chunk) => {
                body+= chunk.toString();
                // console.log(body);
            })

            req.on('end', async () =>{
            const { description , title , price}= JSON.parse(body);
            
            let UpdData = {
                id : id,
                title : title || product.title,
                description : description || product.description,
                price : price || product.price
            }
            let  updProduct = await Product.update(id,UpdData);
            res.writeHead(200,{'Content-Type' : 'application/json'});
            res.end(JSON.stringify(updProduct));
            })
          
            // console.log(body);
            
           
        }
        else{
            res.writeHead(404,{'Content-Type' : 'application/json'});
            res.end(JSON.stringify({ message : 'Product doesnot exist'}));
        }
    }
    catch(error){
        console.log(error);
    }
}

async function DeleteProductID(req,res,id){
    try{
        let product = await Product.findByID(id);
       
        if(product)
        {   
            // console.log(product);
            await Product.remove(id);
            res.writeHead(200,{'Content-Type' : 'application/json'});
            res.end(JSON.stringify({ message : `Product ${id} removed`}));
        }
        else{
            res.writeHead(404,{'Content-Type' : 'application/json'});
            res.end(JSON.stringify({ message : 'Product doesnot exist'}));
        }
    }
    catch(error){
        console.log(error);
    }
}


module.exports = {
   getProductsID,
   getProducts,
   createProduct,
   UpdateProductsID,
   DeleteProductID

}
