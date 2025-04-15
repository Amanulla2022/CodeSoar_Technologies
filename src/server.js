require("dotenv").config()
const express = require("express")
const cors = require('cors')
const { PrismaClient } = require('@prisma/client')
const studentRoutes = require("./routes/studentRoutes")

const prisma = new PrismaClient()
const app = express()

app.use(cors())
app.use(express.json())
const PORT = process.env.PORT || 5000

// Routes
app.use("/students", studentRoutes)

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({error: "Something went wrong!"})
})

// Database connection check
async function main() {
    try {
        await prisma.$connect()
        console.log('Connected to MongoDB!');   
    } catch (error) {
        console.error("Database connection error:", error)
        process.exit(1)
    }
}

main()

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
