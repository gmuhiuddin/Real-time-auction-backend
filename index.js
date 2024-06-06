import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import routes from './routes/index.js';

const app = express();

const port = process.env.PORT || 3001;

dotenv.config();
app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log(`Server was running at ${port}`)
});

app.use("/", routes);