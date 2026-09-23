import express from 'express'
import cors from 'cors'
import customerRoutes from './routes/customerRoutes.js'
import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cookieParser from "cookie-parser"
import orderRoutes from './routes/orderRoutes.js'



const app = express()

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json())
app.use(cookieParser())



app.use('/api/auth', authRoutes)

app.use('/api/customers', customerRoutes)

app.use('/api/products', productRoutes)

app.use('/api/orders', orderRoutes)


export default app