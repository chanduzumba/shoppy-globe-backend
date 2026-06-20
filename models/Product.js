import mongoose from "mongoose"; //importing mongoose to connect with db instance

//Product Schema creation
const productSchema = new mongoose.Schema({
    id: Number,
    title: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    rating: Number,
    stock: Number,
    brand: String,
    category: String,
    thumbnail: String,
    images: [String],
  },
  { timestamps: true }
)

//create products collection/model in shoppyGlobe db using mongoose.model
const Product = mongoose.model("Product", productSchema);

export default Product;