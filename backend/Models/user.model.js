import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique:true,
    trim:true,
    minLength:1,
    maxLength:30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minLength:6,
    maxLength:50    
  }
});
{
    timestamps:true
}
userSchema.pre("save",async function (next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash (this.password,10);
    next();
    
});
//compare passwords
userSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password,this.password)
}

const User = mongoose.model("User", userSchema);
export default User;