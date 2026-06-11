import Borrow from '../models/Borrow.js';
import Book from '../models/Book.js';

export const borrowBook=async(req,res)=>{
    try {
        const {bookId, days}=req.body;
        const studentId=req.studentId;
        if(!days || days<1){
            return res.status(400).json({success:false,message:'Borrow days must be greater than 0!!!!'});
        }
        if(days>30){
            return res.status(400).json({success:false,message:'Maximum borrowing period is 30 days!!!!'});
        }

        const book=await Book.findById(bookId);

        if(!book){
            return res.status (404).json({message:'Book Not Found!!!!!'});
        }

        if(book.availableCopies<=0){
            return res.status(400).json({message:'No copies of the book are available!!!!!'});
        }

        const borrowedCount= await Borrow.countDocuments({studentId, returned:false});
        if(borrowedCount>=3){
            return res.status(400).json({message:'Maximum borrow limit reached!!!!... Return a book to borrow a new one!!!!!'});
        }

        const borrowDate=new Date();
        const dueDate=new Date();

        dueDate.setDate(dueDate.getDate()+ Number(days));
        const borrow=await Borrow.create({
            studentId, bookId, borrowDate, dueDate
        })
        book.availableCopies-=1;
        await book.save();
        res.status(201).json({success:true, message:'Book Borrowed Successfully!!!!!', borrow});

    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Server Error!!!!!'});
    }
}



export const getMyBooks= async(req,res)=>{
    try {
        const borrows=await Borrow.find({studentId:req.studentId, returned:false}).populate('bookId')
        .sort({dueDate: 1});
        res.status(200).json({success:true, borrows});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Server Error!!!!!'});
    }
}



export const returnBook= async(req,res)=>{
    try {
        const borrow=await Borrow.findById(req.params.id);

        if(!borrow){
            return res.status(404).json({message:'Borrow Record not Found!!!!'});
        }

        if(borrow.returned){
            return res.status(400).json({message:'Book Already returned!!!!'});
        }
        borrow.returned=true;
        await borrow.save();

        const book= await Book.findById(borrow.bookId);
        book.availableCopies+=1;
        await book.save();
        res.status(200).json({success:true, message:'Book Returned Successfully!!!!!'});

    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Server Error!!!!!'}); 
    }
}



export const getReminder= async(req,res)=>{
    try {
        const books= await Borrow.find({studentId: req.studentId,returned:false}).populate('bookId');
        const today=new Date();
        const reminderData=books.map(item=>({
            ...item.toObject(), overdue: item.dueDate<today
        }));
        res.status(200).json({success:true, reminderCount:books.length,books: reminderData});

    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Server Error!!!!!'});
    }
}