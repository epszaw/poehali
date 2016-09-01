Stickers = require 'blocks/sticker/sticker.coffee'
stickers = Stickers.stickers

document.addEventListener 'DOMContentLoaded', ->
  stickers.logStickers(stickers.getStickers())
