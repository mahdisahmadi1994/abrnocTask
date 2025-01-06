import express from "express"
import weather_Controller from "../controller/weather_controller.js";

import jwtMiddleware from "../middleware/authentication.js";

const router = express.Router();



/**
 * @swagger
 * /api/weather:
 *   get:
 *     summary: Get all weather records
 *     description: Retrieve a list of all weather records stored in the database
 *     responses:
 *       200:
 *         description: A list of weather records
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       city_name:
 *                         type: string
 *                       temperature:
 *                         type: number
 *                         format: float
 *                       description:
 *                         type: string
 *                       humidity:
 *                         type: number
 *                         format: float
 *                       wind_speed:
 *                         type: number
 *                         format: float
 *       404:
 *         description: No weather records found
 *       500:
 *         description: Internal server error
 */
router.get("/", weather_Controller.getAllWeather);

/**
 * @swagger
 * /api/weather/{id}:
 *   get:
 *     summary: Get a specific weather record by ID
 *     description: Retrieve a specific weather record using its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The weather record's ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A specific weather record
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     city_name:
 *                       type: string
 *                     temperature:
 *                       type: number
 *                       format: float
 *                     description:
 *                       type: string
 *                     humidity:
 *                       type: number
 *                       format: float
 *                     wind_speed:
 *                       type: number
 *                       format: float
 *       404:
 *         description: Weather record not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", weather_Controller.getWeatherById);

/**
 * @swagger
 * /api/weather:
 *   post:
 *     summary: Create a new weather record
 *     description: Fetch and store weather data for a given city
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cityName:
 *                 type: string
 *               fetchForecast:
 *                 type: boolean
 *                 default: false
 *     responses:
 *       200:
 *         description: Weather record created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     weather:
 *                       type: object
 *                       properties:
 *                         city_name:
 *                           type: string
 *                         temperature:
 *                           type: number
 *                         description:
 *                           type: string
 *                         humidity:
 *                           type: number
 *                         wind_speed:
 *                           type: number
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Internal server error
 */
router.post("/",jwtMiddleware ,weather_Controller.createWeather);



/**
 * @swagger
 * /api/weather/{id}:
 *   put:
 *     summary: Update an existing weather record
 *     description: Update the temperature and description for a specific weather record
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The weather record's ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               temperature:
 *                 type: number
 *                 format: float
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Weather record updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     weather:
 *                       type: object
 *                       properties:
 *                         city_name:
 *                           type: string
 *                         temperature:
 *                           type: number
 *                         description:
 *                           type: string
 *                         humidity:
 *                           type: number
 *                         wind_speed:
 *                           type: number
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Weather record not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", jwtMiddleware,weather_Controller.updateWeather);

/**
 * @swagger
 * /api/weather/{id}:
 *   delete:
 *     summary: Delete a weather record
 *     description: Remove a specific weather record from the database
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The weather record's ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Weather record deleted successfully
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Weather record not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", jwtMiddleware,weather_Controller.deleteWeather);

/**
 * @swagger
 * /api/weather/latest/{cityName}:
 *   get:
 *     summary: Get the latest weather for a city
 *     description: Retrieve the most recent weather data for a specific city
 *     parameters:
 *       - in: path
 *         name: cityName
 *         required: true
 *         description: The name of the city to fetch the latest weather for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The latest weather data for the city
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 city_name:
 *                   type: string
 *                 temperature:
 *                   type: number
 *                   format: float
 *                 description:
 *                   type: string
 *                 humidity:
 *                   type: number
 *                   format: float
 *                 wind_speed:
 *                   type: number
 *                   format: float
 *       404:
 *         description: City not found
 *       500:
 *         description: Internal server error
 */
router.get("/latest/:cityName", weather_Controller.getLatestWeather);

export default router;