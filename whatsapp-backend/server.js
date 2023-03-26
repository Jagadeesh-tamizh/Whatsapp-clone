// importing
import express from "express";
import mongoose from "mongoose";
import Message from "./dbmessages.js";
import Pusher from "pusher";

// app config
const app = express();
const port = process.env.PORT || 9000;

// middleware

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

// Db config

const connection_url =
  "mongodb+srv://admin:y4ArmOzZvyKbq1tP@cluster0.qfsmnho.mongodb.net/?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(connection_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("mongodb:connect");
  } catch (e) {
    console.log(e);
  }
};

connectDB();

const pusher = new Pusher({
  appId: "1571203",
  key: "84cdbd8f35f190cc57f0",
  secret: "6e8a340a723b9e7a3050",
  cluster: "ap2",
  useTLS: true,
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("DB Connected");

  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    console.log(change);

    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        received: messageDetails.received,
      });
    } else {
      console.log("Error triggering Pusher");
    }
  });
});

// api routes
app.get("/message", async (req, res) => {
  const messages = await Message.find({});
  res.status(200).json(messages);
});

app.post("/message/new", async (req, res) => {
  const message = req.body.message;
  const received = req.body.received;
  const newMessage = new Message({
    "message": message,
    "received": received,
  });
  newMessage.save();
  res.status(200).json(newMessage);
});

app.delete("/message/delete/:id", async (req, res) => {
  const message = await Message.findByIdAndDelete(req.params.id);
  res.status(200).json(message);
});

// listen
app.listen(port, () => {
  console.log(`Listening on LocalHost: ${port}`);
});

// import express from "express";
// import mongoose from "mongoose";
// import Message from "./dbMessages.js";

// //y4ArmOzZvyKbq1tP

// const app = express();
// const port = process.env.PORT || 9000;

// const connection_url =
//   "mongodb+srv://admin:y4ArmOzZvyKbq1tP@cluster0.qfsmnho.mongodb.net/?retryWrites=true&w=majority";

// mongoose.connect(connection_url, {
//   useUnifiedTopology: true,
// });

// app.get("/", (req, res) => res.status(200).send("hello world"));

// app.post("/message/new", (req, res) => {
//   const message = req.body.message;
//   console.log(message);
//   //   const newMessage = new Message({
//   //     "message": message,
//   //   });
//   //   newMessage.save();
//   //   res.status(200).json(newMessage);
//   res.send(message);
// });

// app.listen(port, () => console.log(`listening on localhost: ${port}`));
