import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import routes from './routes/index.js';

const app = express();

const port = process.env.PORT || 3001;

dotenv.config();
app.use(cors({ origin: ['http://localhost:5173', "https://real-time-auction.vercel.app"] }));
app.use(express.json());

app.listen(port, () => {
    console.log(`Server was running at ${port}`)
});

app.use("/", routes);