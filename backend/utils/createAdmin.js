import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";

const createAdmin= async()=>{
    try {
       const adminExist= await Admin.findOne({email:'admin@gmail.com'});

       if(adminExist){
        console.log('Admin already exists!!!!!');
        return;
       }
       
         const hashedPassword= await bcrypt.hash('admin@123',10);

         await Admin.create({
            email:'admin@gmail.com',
            password:hashedPassword
         })

         console.log('Admin Created Successfully!!!!');

    } catch (error) {
        console.log(error);
    }
}

export default createAdmin;