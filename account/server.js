import app from "./src/app.js";
import config from "./src/configs/config.js";
import connectDB from "./src/db/db.js";

const port = config.PORT;

connectDB();

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
