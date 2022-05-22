import { config } from 'dotenv';
import express from 'express';

config();

const port = process.env.SERVER_PORT;

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World !');
});

app.listen(port, () => console.log(`app listening at port: ${port}`));
