import dotenv from "dotenv"
dotenv.config();
// db config
export const mongoURI = process.env.MONGO_URL

// riot API config
export const riotApiKey = process.env.RIOT_API;