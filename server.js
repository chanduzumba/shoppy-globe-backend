import express from 'express' //import express for creating a server
import dotenv from 'dotenv'
import morgan from 'morgan' //import morgan for logging HTTP requests
import connectDB  from './config/db.js'
import productRoutes from './routes/products.routes.js'
import cartRoutes from './routes/cart.routes.js'
import authRoutes from './routes/auth.routes.js'
//configure dot env for reading env variables
dotenv.config()
// create and listen at port 5000 from env file
const app = new express()

//listen at port 5000
app.listen(process.env.PORT, () => {
    console.log(`Server is running at port: ${process.env.PORT}`)
})

//middleware to parse incoming request bodies in JSON format
app.use(express.json());
app.use(morgan('dev')); //use morgan for logging HTTP requests

//root route to check if server is running
app.get('/' , (req,res)=>{
    res.send("HELLO FROM ROOT ROUTE")
})

//route to products
productRoutes(app)
//route to cart
cartRoutes(app)
//auth routes to register and login
authRoutes(app)

//DB connection
connectDB()