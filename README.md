# Weather MCP Server

このプロジェクトは [OpenWeatherMap](https://openweathermap.org/) の天気情報APIを使用し、MCP (Model Context Protocol) に準拠した形式で天気データを提供する Node.js / TypeScript 製の MCPサーバーです。

## 📦 必要要件

* Node.js v18以降
* npm または yarn
* OpenWeatherMap APIキー（無料で取得可能）

## 📁 セットアップ手順

### 1. リポジトリのクローンまたはZIP展開

```bash
git clone https://example.com/weather-mcp-sandbox.git
cd weather-mcp-sandbox
```

あるいは ZIP を展開してそのディレクトリに移動してください。

---

### 2. 依存のインストール

```bash
npm install
```

---

### 3. `.env` ファイルの作成

プロジェクトルートに `.env` を作成し、以下を記述します：

```env
WEATHER_API_KEY=あなたのOpenWeatherMapのAPIキー
```

### OpenWeatherMap APIキーの取得手順

1. [OpenWeatherMap](https://openweathermap.org/api) にアクセス
2. 無料アカウントを作成（メール認証が必要）
3. ログイン後、[API Keys](https://home.openweathermap.org/api_keys) に移動
4. `Create key` ボタンを押してAPIキーを生成
5. 生成されたAPIキーをコピーして `.env` ファイルに設定

---

## 🚀 実行方法

### ▶️ 開発時：ts-nodeで直接実行

```bash
npx ts-node src/index.ts
```

---

### 📆 本番時：ビルドして実行

```bash
npx tsc
node dist/index.js
```

TypeScriptで `dist/index.js` を生成してから実行します。

---

## 🧪 Cline/Claude でのMCP連携

### 1. MCPツールとして起動

```bash
node dist/index.js
```

### 2. Clineからツールを呼び出す例

```bash
cline --tool ./tool.json --stdio ./dist/index.js
```

※ `tool.json` には `get_weather` ツールのスキーマ定義を記述してください。

---

## 🛠 利用可能なツール

このMCPサーバーでは以下のツールが利用できます：

### 1. `getTokyoWeather`
- **機能**: 東京の現在の天気情報を取得
- **パラメータ**: なし
- **出力**: 東京の天気データ（気温、天気、湿度、風速）

### 2. `getWeatherByCoordinates`
- **機能**: 指定した緯度・経度の天気情報を取得
- **パラメータ**: 
  - `lat` (number): 緯度
  - `lon` (number): 経度
- **出力**: 指定地点の天気データ（都市名、気温、天気、湿度、風速）

### 使用例
```bash
# 東京の天気を取得
getTokyoWeather

# 札幌の天気を取得（緯度: 43.06, 経度: 141.35）
getWeatherByCoordinates(lat: 43.06, lon: 141.35)
```

---

## 💠 使用技術

* [TypeScript](https://www.typescriptlang.org/)
* [OpenWeatherMap API](https://openweathermap.org/)
* [@modelcontextprotocol/sdk](https://www.npmjs.com/package/@modelcontextprotocol/sdk)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [axios](https://www.npmjs.com/package/axios)

---

## 📄 ライセンス

MIT License
