import svg4everybody from 'svg4everybody'

export const polyfillSvg = () => {
  if (document.querySelectorAll('svg').length > 0) {
    svg4everybody()
  }
}
