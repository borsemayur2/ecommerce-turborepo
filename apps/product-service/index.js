const express = require("express");
const app = express();
const PORT = process.env.PORT_PRODUCT || 8002;
const mongoose = require("mongoose");
const Product = require("./Product");
const amqp = require("amqplib");
const isAuthenticated = require("api-utils/isAuthenticated");
const cors = require("cors");

let order;

let channel, connection;

app.use(cors());
app.use(express.json());
mongoose.connect(
  `${process.env.MONGODB_URL}/productDB?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

async function connect() {
  const amqpServer = process.env.CLOUDAMQP_URL;
  connection = await amqp.connect(amqpServer);
  channel = await connection.createChannel();
  await channel.assertQueue("PRODUCT");
}
connect();

app.get("/product/list", async (req, res) => {
  const products = await Product.find({});
  return res.json(products);
});

app.post("/product/buy", isAuthenticated, async (req, res) => {
  const { ids } = req.body;
  const products = await Product.find({ _id: { $in: ids } });
  console.log("products", products);
  channel.sendToQueue(
    "ORDER",
    Buffer.from(
      JSON.stringify({
        products,
        userEmail: req.user.email,
      })
    )
  );
  channel.consume("PRODUCT", (data) => {
    order = JSON.parse(data.content);
  });
  return res.json(order);
});

app.post("/product/create", isAuthenticated, async (req, res) => {
  const { name, description, price } = req.body;
  const newProduct = new Product({
    name,
    description,
    price,
  });
  newProduct.save();
  return res.json(newProduct);
});

app.listen(PORT, () => {
  console.log(`Product-Service at ${PORT}`);
});
