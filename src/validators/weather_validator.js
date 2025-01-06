import { IsNotEmpty, IsString, IsBoolean, IsOptional, validate } from "class-validator";

class CreateWeatherDTO {
    constructor(cityName, fetchForecast){
        this.cityName = cityName;
        this.fetchForecast = fetchForecast;
    }


    async validate(){
        const validationErrors = await validate(this);
        if (validationErrors.length > 0){
            return validationErrors.map(error => Object.values(error.constraints)).flat();
        }
        return null;
    }
    
}
export default CreateWeatherDTO;
