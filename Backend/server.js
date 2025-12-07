require("dotenv").config();
let express = require("express");
const connectDB = require("./configs/db");
let cors = require("cors");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const router = require("./routes/resources");
let app = express();
let PORT = process.env.PORT;

app.use(express.json());
app.use(cors())
connectDB();

app.use("/auth", authRouter)
app.use("/user", userRouter)
app.use("/resource", router)

app.get("/", (req, res)=> res.json({msg:"Error from client Side"}))
app.listen(PORT, () => console.log(`Server running on port ${PORT} `));
