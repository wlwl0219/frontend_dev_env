const path = require("path");
// output 설정을 위해 노드 코어 모듈 중 하나인 path로 경로를 처리
const HtmlWebpackPlugin = require("html-webpack-plugin");
// html을 압축하고 웹팩으로 빌드한 결과물을 자동으로 로딩
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// 이전 빌드 결과물을 삭제 

module.exports = {
  mode: "development",
  entry: {
    main: "./src/app.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve("./dist"),
  },
  // entry 및 output 설정
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader","css-loader"],
        // CSS 파일을 자바스크립트에서 불러와 사용하고
        // 변경된 스타일을 동적으로 돔에 추가
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader", 
      },
      // 리액트를 자바스크립트 코드로 변경 
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    })
    // 빌드할 html파일의 경로 지정
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    publicPath: "/",
    host: "127.0.0.1",
    overlay: true,
    port: 8081,
    stats: "errors-only",
    hot: true,
    // 바뀐 컴포넌트만 리프레쉬
  },
  // 프론트엔드 개발용 서버 
};