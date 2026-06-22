import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "./models/Product.models.js";
import dns from "dns";

//setting dns servers to avoid dns resolution issues in some environments
//allow srv records to be resolved properly, especially in environments with custom dns configurations
//only use this if you are facing dns resolution issues, otherwise it can be omitted
dns.setServers(["8.8.8.8", "8.8.4.4"]);

//configure env variables earlier
dotenv.config();

//import products from dummy json api
const importProducts = async () => {
  try {
    //connect to mongoDB
    await mongoose.connect(process.env.MONGO_URI);

    //call to dummyjson products api
    const response = await fetch(
      "https://dummyjson.com/products?limit=0"
    );

    //convert response to json
    const data = await response.json();

    // Remove old products
    await Product.deleteMany();

    // Insert new products
    await Product.insertMany(data.products);

    console.log(`${data.products.length} products imported`);

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importProducts(); //run node seed.js before running the application so that data is available for testing