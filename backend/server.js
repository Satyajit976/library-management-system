import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js"; 
import studentRoutes from "./routes/studentRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";
import adminRoutes from "./routes/adminRoutes.js";
import createAdmin from "./utils/createAdmin.js";
import bookRoutes from "./routes/bookRoutes.js";
import borrowRoutes from "./routes/borrowRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();
createAdmin();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Library System API Running");
});

app.use('/api/students', studentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/borrow', borrowRoutes);

app.get('/api/test',authMiddleware, (req,res)=>{
  res.json({message:'This is a protected route!!!!!', studentId:req.studentId});
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(errorMiddleware);