import Student from '../models/Student.js'; 
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerStudent = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All the fields are required!!!!!' });
        }

        const existStudent = await Student.findOne({ email });
        if (existStudent) {
            return res.status(400).json({ message: 'Student already exists with this email!!!!!' }); 
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const student = new Student({
            name, email, password: hashedPassword
        });
        await student.save();

        res.status(201).json({ message: 'Student registered successfully!!!!!' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error!!!!!' });
    }
};


export const loginStudent= async(req,res)=>{
    try {
      const {email,password} =req.body;
      const student= await Student.findOne({email});
      if(!student){
        return res.status(400).json({message:'Invaild EmailId or Password!!!!!'});
      }

      const isMatch=await bcrypt.compare(password,student.password);
      if(!isMatch){
        return res.status(400).json({message:'Invaild EmailId or Password!!!!!'});
      }

      const token= jwt.sign({
        id:student._id
      }, process.env.JWT_SECRET,{
        expiresIn:'7d'
      });

      res.status(200).json({
        success:true,token,student:{
            id:student._id,
            name:student.name,
            email:student.email
        }
      })
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Server Error!!!!!'});
    }
}