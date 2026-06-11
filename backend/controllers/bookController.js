import Book from '../models/Book.js';

export const addBook= async (req,res)=>{
    try {
        const{ title, author, category, availableCopies}=req.body;

        if(!title?.trim() || !author?.trim() || !category?.trim()){
            return res.status(400).json({message:'All the fields are required!!!!'});
        }
        if(availableCopies===undefined || availableCopies < 1){
            return res.status(400).json({message:'Available Copies must be at least 1!!!!'});
        }

        const book= await Book.create({title, author, category, availableCopies});

        res.status(201).json({success:true,message:'Book Added Successfully!!!!',data: book});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Server Error!!!!!'});
    }
}



export const getAllBooks= async(req,res)=>{
    try {
        const {search, category}=req.query;
        let query={};

        if(search){
            query.title={$regex:search, $options:'i'};
        }
        if(category){
            query.category=category;
        }
        const books=await Book.find(query)
        .sort({createdAt: -1});
        res.status(200).json({success:true, count:books.length,books});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Server Error!!!!!'});
    }
}



export const getBookById= async(req,res)=>{
    try {

        const book=await Book.findById(req.params.id);

        if(!book){
            return res.status(404).json({message:'Book Not Found!!!!'});
        }
        res.status(200).json(book);

    } catch (error) {
        console.log(error);

        res.status(500).json({message:'Server Error!!!!!'});
    }
}



export const updateBook=async(req,res)=>{
    try {
        const book=await Book.findByIdAndUpdate(req.params.id, req.body,{new:true});

        if(!book){
            return res.status(404).json({message:'Book Not Found!!!!'});
        }

        res.status(200).json({success:true, message:'Book Updated Successfully!!!!', book});

    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Server Error!!!!!'});
    }
}



export const deleteBook= async(req,res)=>{
    try {
        const book=await Book.findById(req.params.id);

        if(!book){
            return res.status(404).json({message:'Book Not Found!!!!'});
        }
        await book.deleteOne();
        res.status(200).json({success:true, message:'Book Deleted Successfully!!!!'});

    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Server Error!!!!!'});
    }
}