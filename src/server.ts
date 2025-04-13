import express from 'express';
import userRoutes from './routes/userRoutes';
import adminRoutes from "./routes/adminRoutes"
import dotenv from 'dotenv'
import path from 'node:path';
import cors from "cors";
// import clerkMiddleware from './middleware/clerkMIddleware'
path.dirname("src/assests/")
dotenv .config()
const app = express();
app.use(express.json());
// app.use(express.static("uploads/"))
app.use('/uploads', express.static('uploads'));
app.use(cors());
// app.use(clerkMiddleware())
const port = 8000;
app.use("/api",userRoutes);
app.use("/api/admin",adminRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});