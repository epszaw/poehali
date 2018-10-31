<p align="center">
  <a href="https://github.com/kirpichikjs/kirpichik" target="_blank">
    <img width="350"src="https://github.com/lamartire/poehali/blob/master/logo.png?raw=true" />
  </a>
</p>

# Poehali! [![Build Status](https://travis-ci.org/lamartire/poehali.svg?branch=master)](https://travis-ci.org/lamartire/poehali) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) [![Greenkeeper badge](https://badges.greenkeeper.io/lamartire/poehali.svg)](https://greenkeeper.io/)

> Just another boilerplate for static web-sites

## Under the hood

- `pug`
- `postcss`
- `webpack`
- `prettier`

## Creating new blocks

A little earlier I used js-script in this project and [generator-bem-blocks][1], but now we have
awesome tool called [hygen][2]. Just use it for more productivity during work :heart:

## Using classnames into pug mixins

You can use global pug local `cn`, it works like popular solutions for easy creating class names
for components. See more details [here][3]. Solution in this repository are little bit different
than other solutions.

Example:

```jade
mixin foo(bar, baz)
  p(class=cn({bar, baz}))

+foo(true)
+foo(false, true)
+foo(true, 'hello')
```

Will be compiled to:

```html
<p class="bar"></p>
<p class="baz"></p>
<p class="bar hello"></p>
```

[1]: https://github.com/lamartire/generator-bem-blocks
[2]: https://www.hygen.io/
[3]: https://gist.github.com/lamartire/5028dab810d514b8c951f9d9528361a4
