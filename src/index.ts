import "reflect-metadata";
import 'express-async-errors'
import { createConnection } from 'typeorm';

import * as express from "express";
import * as bodyParser from "body-parser";
import * as path from 'path';

createConnection()

import routes from "./routes";
import errorHandler from './errors/handler';

declare global {
  namespace Express {
    interface Request {
      usuario: {
        id: string;
        tipo: number;
      }
    }
  }
}

const app = express()

app.use(bodyParser.json())
app.use(routes)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log('Servidor rodando sobre a porte 3333');
})
