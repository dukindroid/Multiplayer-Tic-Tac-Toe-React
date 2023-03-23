import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  qty: Number
})

export default mongoose.model("User", userSchema )