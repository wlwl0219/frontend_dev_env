// babel-loader가 어떻게 동작할지 설정

module.exports = {
    presets: ["@babel/preset-react"],
    // 리액트js를 ECMAScript2015+로 변환
    plugins: [
        "react-hot-loader/babel"
        // 컴포넌트만 갱신하기 위한 플러그인
      ]
  }