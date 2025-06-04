import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import axios from "axios";
import { z } from "zod";

const server = new McpServer({
  name: "TokyoWeather",
  version: "1.0.0"
});

const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = process.env.WEATHER_API_KEY;

server.tool("getTokyoWeather", 
  {}, 
  async () => {
    try {
      const response = await axios.get(WEATHER_API_URL, {
        params: {
          q: "Tokyo",
          appid: API_KEY,
          units: "metric",
          lang: "ja"
        }
      });
      
      return {
        content: [{
          type: "text",
          text: JSON.stringify({
            都市: response.data.name,
            気温: `${response.data.main.temp}°C`,
            天気: response.data.weather[0].description,
            湿度: `${response.data.main.humidity}%`,
            風速: `${response.data.wind.speed}m/s`
          })
        }]
      };
    } catch (error) {
      return {
        content: [{
          type: "text",
          text: "東京の天気情報の取得に失敗しました"
        }]
      };
    }
  }
);

server.tool("getWeatherByCoordinates", 
  { lat: z.number(), lon: z.number() }, 
  async ({ lat, lon }) => {
    try {
      const response = await axios.get(WEATHER_API_URL, {
        params: {
          lat: lat,
          lon: lon,
          appid: API_KEY,
          units: "metric",
          lang: "ja"
        }
      });
      
      return {
        content: [{
          type: "text",
          text: JSON.stringify({
            緯度: lat,
            経度: lon,
            都市: response.data.name,
            気温: `${response.data.main.temp}°C`,
            天気: response.data.weather[0].description,
            湿度: `${response.data.main.humidity}%`,
            風速: `${response.data.wind.speed} m/s`
          })
        }]
      };
    } catch (error) {
      return {
        content: [{
          type: "text",
          text: "指定された座標の天気情報の取得に失敗しました"
        }]
      };
    }
  }
);

const transport = new StdioServerTransport();
server.connect(transport).then(() => {
  // console.log("東京天気サーバーが起動しました");
});
