import model from "./model"
import view from "./view"

const controller = {
  async init(el) {
    this.el = el
    view.render(await model.get(), this.el)
  },
}
export default controller

// if (module.hot) {
//   console.log("핫모듈 켜짐") // 웹팩 개발 서버를 재 시작

//   module.hot.accept("./view", () => {
//     console.log("view 모듈 변경됨") // view.js 파일을 수정
//   })
// }

if (module.hot) {
    module.hot.accept("./view", async () => {
      view.render(await model.get(), controller.el) // 변경된 모듈로 교체
    })
  }