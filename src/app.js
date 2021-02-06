import * as math from "./math.js";
import controller from "./controller.js";

import "./style.css";

console.log(math.sum(1, 2)); // 3
console.log(process.env.NODE_ENV); // development
console.log(TWO); // 2
console.log(VERSION); // 'v.1.2.3'
console.log(PRODUCTION); // false
console.log(MAX_COUNT); // 999
console.log(api.domain); // 'http://dev.api.domain.com'

const div = document.querySelector('div')
controller.init(div)