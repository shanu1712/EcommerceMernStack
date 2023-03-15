import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import cors from 'cors'
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';


dotenv.config();

const app = express();
app.use(cors())
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });

  app.get('/api/keys/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
  });
app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
  });
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
// import express from 'express';
// import data from './data.js';
// import cors from 'cors'
// import mongoose from 'mongoose';
// import dotenv from 'dotenv'
// import seedRouter from './routes/seedRoutes.js';
// import productRouter from './routes/productRoutes.js';

// const app = express();
// dotenv.config()
// app.use(cors())
// // test
// app.get('/api/products', (req, res) => {
//   res.send(data.products);
// });

// ////mongodb//
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log('connected to db');
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });


// app.get('/api/products/slug/:slug', (req, res) => {
//   const product = data.products.find((x) => x.slug === req.params.slug);
//   if (product) {
//     res.send(product);
//   } else {
//     res.status(404).send({ message: 'Product Not Found' });
//   }
// });

// app.get('/api/products/:id', (req, res) => {
//     const product = data.products.find((x) => x._id === req.params.id);
//     if (product) {
//       res.send(product);
//     } else {
//       res.status(404).send({ message: 'Product Not Found' });
//     }
//   });
// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log(`serve at http://localhost:${port}`);
// });