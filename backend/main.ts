import { connectDB } from "./src/config/db.js";
import "./src/config/websocket.js";
import { server } from "./src/config/server.js";

await connectDB();
server.listen(5000, () => console.log("Server running on http://localhost:5000"));
