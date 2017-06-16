# Markup without headache

[![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## Commands

Start with watching:
```
npm start
```
Build:
```
npm build
```

## Folder structure

```
├──src/
|   ├──assets/
|   |   ├──fonts/
|   |   └──images/
|   ├──css/
|   |   ├──root.css
|   |   └──main.css
|   ├──layouts/
|   ├──blocks/
|   ├──data/ - json-data files
|   ├──app.js - main script
|   └──pages/
└──tasks/
```

## Linting

I usually use eslint with standard and stylelint with my custom config.

Also, there is pre-commit linting.

## Creating BEM blocks

A little earlier I used js-script in this project, but it was not flexable and
I created [generator-bem-blocks][1]. It's simple and helpful.

[1]: https://github.com/lamartire/generator-bem-blocks
