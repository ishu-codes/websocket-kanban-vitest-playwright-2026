import server from "./app";

const PORT = Number(process.env.PORT) ?? 5000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Listening on: http://localhost:${PORT}`);
});
