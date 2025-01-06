import { connection } from "./config/db.js";
import express from "express";
import weather_routes from "./routes/weather_routes.js"
import user_routes from "./routes/user_routes.js"
import { swaggerSpec, swaggerUi } from './config/swagger.js';
import client from "./config/redis.js";


const app = express();

//console.log(swaggerSpec);
// Use the Swagger UI middleware to serve API docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use(express.json());

app.use("/api/weather", weather_routes);
app.use("/api/user", user_routes)

//Error Handler for Invalid Routes
app.use((req, res) => {
  res.status(404).send({ error: "Route not found" });
});


const start = async () => {
    try {
      await connectRedis();
      await connection();
      const port = process.env.PORT
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
        console.log('Swagger UI is available at http://localhost:3333/api-docs');
      });
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  };

  async function connectRedis() {
    try {
      await client.connect();  // Ensure Redis is connected
      console.log('Connected to Redis');
    } catch (err) {
      console.error('Error connecting to Redis:', err);
      process.exit(1);  // Stop the app if Redis connection fails
    }
  }

  
  start();


export default app;