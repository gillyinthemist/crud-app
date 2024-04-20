import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';
import { router } from './router';

const app = express();

// Middleware set-up:
// app.use(cors({
//   origin: "https://symphonious-starlight-f902b2.netlify.app",
//   optionsSuccessStatus: 200
// }));
app.use(express.json());
app.use('/', router);

// Server listening:
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
