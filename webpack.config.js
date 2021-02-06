const path = require("path");
const webpack = require("webpack");
const banner = require("./banner.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const apiMocker = require("connect-api-mocker")
const mode = process.env.NODE_ENV || "development"
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")

module.exports = {
  mode,
  entry: {
    main: "./src/app.js",
    controller: "./src/controller.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve("./dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/, // .css 확장자로 끝나는 모든 파일
        use: [
          process.env.NODE_ENV === "production"
            ? MiniCssExtractPlugin.loader // 프로덕션 환경
            : "style-loader", // 개발 환경
          "css-loader",
        ],
      },
      {
        test: /\.jpeg$/, // .png 확장자로 마치는 모든 파일
        loader: "file-loader", // 파일 로더를 적용한다
        options: {
          publicPath: "./", // prefix를 아웃풋 경로로 지정
          name: "[name].[ext]?[hash]", // 파일명 형식
          // limit: 5000, // 5kb 미만 파일만 data url로 처리
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader", // 바벨 로더를 추가한다
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin(banner),
    new webpack.DefinePlugin({
      TWO: "1+1",
      VERSION: JSON.stringify("v.1.2.3"),
      PRODUCTION: JSON.stringify(false),
      MAX_COUNT: JSON.stringify(999),
      "api.domain": JSON.stringify("http://dev.api.domain.com"),
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html", // 템플릿 경로를 지정
      templateParameters: {
        // 템플릿에 주입할 파라매터 변수 지정
        env: process.env.NODE_ENV === "development" ? "(개발용)" : "",
      },
      minify:
        process.env.NODE_ENV === "production"
          ? {
              collapseWhitespace: true, // 빈칸 제거
              removeComments: true, // 주석 제거
            }
          : false,
      hash: true,
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin([
      {
        from: "./node_modules/axios/dist/axios.min.js",
        to: "./axios.min.js", // 목적지 파일에 들어간다
      },
    ]),
    ...(process.env.NODE_ENV === "production"
      ? [new MiniCssExtractPlugin({ filename: `[name].css` })]
      : []),
      
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    publicPath: "/",
    host: "127.0.0.1",
    overlay: true,
    port: 8080,
    stats: "errors-only",
    before: (app, server, compiler) => {
      app.use(apiMocker("/api", "mocks/api"))
    },
    // proxy: {
    //   "/api": "http://localhost:8081", // 프록시
    // },
    hot: true,
    // before: (app, server, compiler) => {
    //   app.get("/api/keywords", (req, res) => {
    //     res.json([
    //       { keyword: "이탈리아" },
    //       { keyword: "세프의요리" },
    //       { keyword: "제철" },
    //       { keyword: "홈파티" },
    //     ])
    //   })
    // },
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    minimizer: mode === "production" ? [new OptimizeCSSAssetsPlugin(),  new TerserPlugin({
      terserOptions: {
        compress: {
          drop_console: true, // 콘솔 로그를 제거한다
        },
      },
    }),] : [],
  },
  externals: {
    axios: "axios",
  },
};
