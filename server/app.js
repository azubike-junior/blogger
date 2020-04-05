import express from 'express';
import dotevn from 'dotenv';
dotevn.config();
import routes from './routes/index'

const app = express();

app.use(express.json());
app.use('/api/v1', routes)

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})