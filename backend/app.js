import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import router from "./routes/authRoutes.js";
// import dotenv from "dotenv";
// import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app = express();

// app.use(express.urlencoded({ extended: true }));
//  app.use(cors());

app.use(cors({
  origin: 'http://localhost:5173', // Must be the exact origin of your frontend
  credentials: true, // Required for requests with credentials
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
}));

app.use(express.json());
app.use(cookieParser());

// dotenv.config();

// app.use(
//   cors({
//     origin: process.env.CLIENT_URL || "http://localhost:5173",
//     credentials: true,
//   })
// );


app.use("/api", router);

// const PORT = process.env.PORT || 5000;


app.listen(3000, () => {
  console.log(`Server is running on port ${3000}`);
});
