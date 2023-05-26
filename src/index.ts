import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import { catRouter } from './catRouter';

const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(catRouter.routes());

mongoose.connect('mongodb://localhost/myapp', { useNewUrlParser: true, useUnifiedTopology: true });

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});