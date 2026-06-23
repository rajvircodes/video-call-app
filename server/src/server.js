const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const connectDB = require('./config/db.js')
const cors = require('cors')
require('dotenv').config()
const authRoutes = require('./routes/auth.routes.js')
const socketHandler = require('./socket/socketHandler.js')

connectDB()

const app = express()
const httpServer = http.createServer(app)

const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
})

socketHandler(io)

// built in middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
  })
)
app.use(express.json())

// health checker routes
app.get('/', (req, res) => {
  res.json({
    status: 'Server is running',
    connectedClients: io.engine.clientsCount,
  })
})

app.use('/api/auth', authRoutes)

// database connection
const PORT = process.env.PORT || 5000

httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`))
