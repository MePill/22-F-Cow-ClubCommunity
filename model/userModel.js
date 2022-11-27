import mongoose from "mongoose";

const url = "mongodb://127.0.0.1:27017/user_db_name";

const db = mongoose.connect(url, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Succesfully Connected!");
  }
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Title is required!"],
  },
  id: {
    type: String,
    required: [true, "Title is required!"],
  },
  password: {
    type: String,
    required: [true, "Title is required!"],
  },
});

const Users = mongoose.model('Users', userSchema);
export default Users;
