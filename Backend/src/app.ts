import express from 'express'
import cors from 'cors';
import authRouter from './routes/auth';

const app = express();
const port = 4001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(cors())

app.use('/auth', authRouter)

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`)
})
