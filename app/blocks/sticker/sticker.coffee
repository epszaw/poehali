exports.stickers =
  getStickers : ->
    return document.querySelectorAll '.sticker__item'

  logStickers : (items) ->
    for item in items
      console.log item
