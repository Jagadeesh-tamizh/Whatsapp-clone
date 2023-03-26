import mongoose from "mongoose";
import { Schema } from "mongoose";

const messageSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    default: "admin",
  },
  timestamp: {
    type: String,
    default: Date.now,
  },
  received: {
    type: Boolean,
    default: false,
  },
});

// setting up a collection inside the database

export default mongoose.model("messagecontents", messageSchema);

// import mongoose from 'mongoose';
// import { Schema } from 'mongoose';
// const whatsappSchema = new Schema({
//   message: String,
//   name: String,
//   timestamp: String,
//   received: Boolean,
// });

// export default mongoose.model('messageContent', whatsappSchema);
