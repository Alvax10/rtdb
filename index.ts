import { rtdb } from "./db";
import { json } from "body-parser";
import * as express from "express";
import { v4 as uuidv4 } from "uuid";
import * as cors from "cors";

const app = express();

app.use(json());
app.use(cors());

const port = 1234;

app.post('/messages', (req, res) => {
  const newId = uuidv4();
  const chatRoomRef = rtdb.ref("/chatrooms/general/messages");

  chatRoomRef.push(req.body, function() {
    res.json("todo ok");
  });
});

app.listen(port, () => {
   console.log(`Example app listening at http://localhost:${port}`);
});