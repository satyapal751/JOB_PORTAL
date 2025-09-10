//const express=require('express');
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "swagger-jsdoc";
import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import connectDB from "./config/db.js";
import testRoutes from './routes/testRouter.js'
import authRoute from './routes/authRoute.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import jobsRoutes from "./routes/jobsRoute.js";
import userRoutes from "./routes/userRoute.js";


dotenv.config();
connectDB();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Job Portal Application",
      description: "Node Expressjs Job Portal Application",
    },
    servers: [
      {
        url: "http://localhost:4080"
      },
    ],
  },
  apis: ["./routes/*.js"],
};
const spec = swaggerDoc(options);

const app=express();
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(spec));


app.use("/api/v1",testRoutes);
app.use("/api/v1",authRoute);
app.use("/api/v1",userRoutes);
app.use("/api/v1",jobsRoutes);

app.use(errorMiddleware);

const PORT=process.env.PORT || 4080;

app.listen(PORT,()=>{
    console.log(`Node server Running in ${process.env.DEV_MODE} running on port no ${PORT}`.bgCyan.white
    );
});