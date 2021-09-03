// require the express module
import express from "express";
import Item from "../models/Item";

// create a new Router object
const cartRoutes = express.Router();

const cart: Item[] = [
  {
    id: 1,
    product: "apple",
    price: 2,
    quantity: 4,
  },
  {
    id: 2,
    product: "banana",
    price: 0.5,
    quantity: 6,
  },
  {
    id: 3,
    product: "cereal",
    price: 4,
    quantity: 2,
  },
  {
    id: 4,
    product: "fancy bread",
    price: 5,
    quantity: 1,
  },
];
let nextId: number = 5;

//GET  / cart-cart
cartRoutes.get("/cart", (req, res) => {
  const maxPrice: number = parseInt(String(req.query.maxPrice));
  const prefix: string = req.query.prefix as string;
  if (maxPrice) {
    const filteredcart = cart.filter((thisItem) => thisItem.price <= maxPrice);
    res.status(200);
    res.json(filteredcart);
  } else if (prefix) {
    const filteredcart = cart.filter((thisItem) =>
      thisItem.product.includes(prefix)
    );
    res.status(200);
    res.json(filteredcart);
  } else {
    res.status(200);
    res.json(cart);
  }
});

// GET / cart / :id
cartRoutes.get("/cart/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = cart.find((thisItem) => thisItem.id === id);
  if (item) {
    res.status(200);
    res.json(item);
  } else {
    res.status(404);
    res.send(`No cart item found with id ${id}.`);
  }
});

// POST / cart
cartRoutes.post("/cart", (req, res) => {
  const item = req.body;
  item.id = nextId++;
  cart.push(item);
  res.status(201);
  res.json(item);
});

// PUT / cart-items / :id
cartRoutes.put("/cart/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = req.body;
  const itemIndex = cart.findIndex((thisItem) => thisItem.id === id);
  if (itemIndex !== -1) {
    cart[itemIndex] = item;
    res.status(200);
    res.json(item);
  } else {
    res.status(404);
    res.send(`No cart item with id ${id}.`);
  }
});

// DELETE / cart-items / :id
cartRoutes.delete("/cart/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = cart.findIndex((thisItem) => thisItem.id === id);
  if (item !== -1) {
    cart.splice(item, 1);
    res.status(204);
    res.send();
  } else {
    res.status(404);
    res.send(`No cart item with id ${id} was found.`);
  }
});

export default cartRoutes;
