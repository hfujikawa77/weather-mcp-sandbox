# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

### Development and Build
- `npx ts-node src/index.ts` - Run the MCP server directly with TypeScript
- `npm run build` or `npx tsc` - Compile TypeScript to JavaScript in `dist/` directory  
- `npm start` or `node dist/index.js` - Run the compiled MCP server
- `node dist/index.js` - Start the MCP server for use with MCP hosts

### Environment Setup
- Create `.env` file with `WEATHER_API_KEY=your_openweathermap_api_key`
- Get API key from https://home.openweathermap.org/api_keys (free tier available)

## Architecture Overview

This is a **Model Context Protocol (MCP) server** that provides weather information tools to MCP hosts like Cline or Claude Desktop.

### Core Components

**MCP Server (`src/index.ts`)**:
- Uses `@modelcontextprotocol/sdk` to implement MCP protocol
- Exposes two tools: `getTokyoWeather` and `getWeatherByCoordinates`
- Communicates via standard input/output using `StdioServerTransport`
- Uses zod for parameter validation on coordinate-based queries

**Weather Tools**:
- `getTokyoWeather`: No parameters, returns Tokyo weather data
- `getWeatherByCoordinates`: Takes `lat` and `lon` parameters, returns weather for any location
- Both tools fetch from OpenWeatherMap API with Japanese language support (`lang: "ja"`)

**API Integration**:
- OpenWeatherMap Current Weather API endpoint
- Requires `WEATHER_API_KEY` environment variable
- Returns formatted JSON with Japanese field names (都市, 気温, 天気, etc.)

### MCP Host Configuration

The server must be registered with MCP hosts via configuration files:

**Cline**: `~/.config/cline/mcp_servers.json` (Linux/macOS) or `%AppData%\Roaming\cline\mcp_servers.json` (Windows)
**Claude Desktop**: Different configuration format but same principle

Example configuration:
```json
{
  "weather-bot": {
    "command": "node",
    "args": ["/absolute/path/to/dist/index.js"],
    "env": {
      "WEATHER_API_KEY": "your_api_key"
    }
  }
}
```

### Data Flow
1. MCP host receives natural language request from user
2. MCP host determines appropriate tool and parameters
3. MCP host calls weather server via MCP protocol
4. Weather server makes HTTP request to OpenWeatherMap
5. Weather server returns formatted JSON response
6. MCP host presents results to user