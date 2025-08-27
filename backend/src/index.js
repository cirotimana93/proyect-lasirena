require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
const path = require("path");
const config = require("../config.json");
const { connect } = require("./config/db");
const routes = require("./routes");;


// Swagger
const { swaggerUi, swaggerSpec } = require('./config/swagger');


const app = express();
const server = http.createServer(app);
const port = process.env.PORT || config.APP_PORT || 3000;

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

console.log(process.env.CORS_ORIGIN || config.CORS_ORIGIN);

// CORS Configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || config.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

// Static File Serving
const staticPaths = [
  { url: "/attachments", path: "../src/assets/attachments" },
  { url: "/uploads", path: "../src/assets/uploads" },
  { url: "/images", path: "../src/assets/images" },
  { url: "/public", path: "../public" },
];

staticPaths.forEach(({ url, path: staticPath }) => {
  app.use(url, express.static(path.join(__dirname, staticPath)));
});


// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas API
app.use("/api", routes);

// Server Start
server.listen(port, async () => {
  await connect();
  console.log(`Server listening on port ${port}!`);
});
