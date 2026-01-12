import express from "express";
import userRoute from "./routes/user.route.js"
import postRoute from "./routes/post.route.js"


const app = express();

app.use(express.json());

app.use("/api/users",userRoute);
app.use("/api/posts",postRoute);
export default app;

// http://localhost:8000/api/users/register