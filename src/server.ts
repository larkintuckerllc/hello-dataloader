import express from 'express';
import 'reflect-metadata';
import { createConnection } from 'typeorm';

createConnection().then(async () => {
  const app = express();
  app.get('/', (req, res) => res.send('Hello World!'));
  app.listen(3000, () => console.log('Example app listening on port 3000!'));
}).catch((error) => console.log(error));
