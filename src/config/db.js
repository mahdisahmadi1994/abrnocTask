import { createConnection } from "typeorm";

import { WeatherEntity } from "../model/weather_model.js"
import { UserEntity} from "../model/user_model.js"

export const connection = async () => {
    return await createConnection({
    type: "postgres", 
    host: "localhost",
    port: 5432, 
    username: "mahdis",
    password: " ",
    database: "abrnocdb",
    entities: [UserEntity, WeatherEntity],
});
};
