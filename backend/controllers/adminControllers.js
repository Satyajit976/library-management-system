import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Student from "../models/Student.js";
import Book from "../models/Book.js";
import Borrow from "../models/Borrow.js";

export const adminLogin= async(req,res)=>{
    try {
        const {email,password}=req.body;
        const admin=await Admin.findOne({email});

        if(!admin){
            return res.status(400).json({message:'Invalid Admin Credentisls!!!!!'});
        }

        const isMatch=await bcrypt.compare(password,admin.password);

        if(!isMatch){
            return res.status(400).json({message:'Invalid Admin Credentisls!!!!!'});
        }

        const token=jwt.sign(
            {
            adminId: admin._id
            },
            process.env.JWT_SECRET,
            {
            expiresIn:'7d'
            }
        );

        res.status(200).json({
            success:true, token, admin:{
                id: admin._id,
                email: admin.email
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Server Error!!!!!'});
    }
}



export const getAllStudents=async(req,res)=>{
    try {
        const students= await Student.find().select('-password');
        res.status(200).json({success:true, count:students.length, students});

    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Server Error!!!!!'});
    }
}

export const getBorrowRecords= async(req,res)=>{
    try {
        const records= await Borrow.find()
        .populate('studentId','name email')
        .populate('bookId','title author category')
        .sort({createdAt: -1});
        res.status(200).json({success:true,count: records.length,records});

    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Server Error!!!!!'});
    }
}



export const getDashboardStats=async(req,res)=>{
    try{
        const totalStudents=await Student.countDocuments();
        const totalBooks=await Book.countDocuments();
        const totalBorrowedBooks=await Borrow.countDocuments({returned:false});
        const totalReturnedBooks=await Borrow.countDocuments({returned:true});

        res.status(200).json({success:true, totalStudents, totalBooks, totalBorrowedBooks, totalReturnedBooks});
        
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:'Server Error!!!!!'});
    }
}

export const getPublicStats = async (req, res) => {
  try {

    const totalStudents =
      await Student.countDocuments();

    const totalBooks =
      await Book.countDocuments();

    const totalBorrowedBooks =
      await Borrow.countDocuments({
        returned: false
      });

    const totalReturnedBooks =
      await Borrow.countDocuments({
        returned: true
      });

    res.status(200).json({
      success: true,
      totalStudents,
      totalBooks,
      totalBorrowedBooks,
      totalReturnedBooks
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }
};