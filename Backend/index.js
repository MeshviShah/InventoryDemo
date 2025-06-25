import express, { json as _json } from 'express';
import 'dotenv/config.js';

//import 'express-async-errors';
import cors from 'cors';
import { connection } from './Config/index.js';
import { error } from './Interceptor/index.js';
import { routes } from './Route/route.js';

// import { routes } from './src/Route/route.js';

const app = express();
app.use(express.json({ limit: '5mb' }))

app.use(
  cors({
    origin: '*',
   
  })
);
// connection()

routes(app);
app.use(error);

app.listen(process.env.PORT, () => {
  console.log(`Application is listening at port ${process.env.PORT}`);
});