import app from "./src/app.js";
import config from "./src/configs/config.js";
import connectDB from "./src/db/db.js";
import { connectMQ } from "./src/broker/rabbit.js";

const port = config.PORT;

connectDB();
connectMQ();

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
