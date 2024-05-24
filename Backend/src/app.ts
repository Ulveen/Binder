import express from 'express'
import cors from 'cors';
import AuthRouter from './routes/auth';
import UserRouter from './routes/user';
import MessageRouter from './routes/message';

const app = express();
const port = 4001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
  console.log('Request:', req.method, req.url);
  next();
});

app.use(cors())

app.use('/auth', AuthRouter)
app.use('/user', UserRouter)
app.use('/message', MessageRouter)

app.get('/', (req, res) => {
  console.log('Hello from the server');
  res.send('Hello from the server')
})

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`)
})
