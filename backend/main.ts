import { connectDB } from "./src/config/db.js";
import "./src/config/websocket.js";
import { server } from "./src/config/server.js";

await connectDB();
const PORT = 5000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
