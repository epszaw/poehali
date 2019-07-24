import { polyfillSvg } from './blocks/icon'
import { sayHello } from './blocks/hello'

window.onload = () => {
  // IE 10-11 svg sprites fallback
  polyfillSvg()
  sayHello('from poehali')
}
