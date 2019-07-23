import { polyfillSvg } from './blocks/icon'
import { sayHello } from './blocks/hello'

window.onload = () => {
  polyfillSvg()
  sayHello('from console')
}
