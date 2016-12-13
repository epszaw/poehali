# Catstruct

## Commands

Start with watching:
```
npm start
```
Build:
```
npm build
```
Create block/blocks (create dir with pug/styl):
```
npm run block blockname1 blockname2 blockname3
```

## Folder structure

```
├──app/
| ├──assets/
| |   ├──fonts/
| |   ├──images/
| |   ├──styles/ - compiled styles and helpers
| |   |   ├──fonts.styl
| |   |   ├──main.styl - "bundle"
| |   |   ├──mixins.styl
| |   |   ├──rupture-settings.styl
| |   |   ├──variables.styl
| |   |   └──sprite.styl - spritesmith file
| |   └──sprites/ - sprites dir
| |
| ├──layouts/
| ├──blocks/
| |
| ├──data/ - json-data files
| |
| ├──helpers/
| |   └──pug/
| |       └──bemto/ - БЭМ для pug
| |
| ├──app.js - main script
| |
| └──pages/
|
├──core/
|   └─tasks/
|
├──catstruct.json - settings
├──.autoprefixer
└──.browsers
```

## Old browsers support

If you create `blockname@ie9.styl`, you'll get `main@ie9.css`.

You can define target browser in `.browsers`.

Include `@id9` bundle in your project.

## Blocks inheritance

For multiple blocks creation: `npm run block blockname1 blockname2 blockname3`.

Some arguments:

|**Argument**|**Value**|
|------------|-------------|
|EXTB=blockname|Extendable block|
|EXTL=layoutname|Extendable layout|
|EXTP=pagename|Extendable page|

For correctly extending, you must create following section in `pug` files:

```
//- include start

//- include end
```

**If you create blocks with `block` script, it already has this section**.