import { sayHello } from './blocks/hello'

sayHello('from console')

if (module.hot) {
  module.hot.accept()
}
