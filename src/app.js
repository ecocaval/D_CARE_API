import 'dotenv/config';
import 'express-async-errors';

import express from 'express';
import cors from 'cors';

import routes from './routes/index.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.listen(process.env.PORT || 5000, () => {
    console.log('listening to port ' + (process.env.PORT || 5000));
});