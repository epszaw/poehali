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
Create block/blocks (create dir with pug/css):
```
npm run block blockname1 blockname2 blockname3
```

## Folder structure

```
├──app/
|   ├──assets/
|   |   ├──fonts/
|   |   ├──images/
|   |   └──sprites/ - sprites dir
|   ├──css/
|   |   ├──root.css
|   |   └──main.css
|   ├──layouts/
|   ├──blocks/
|   ├──data/ - json-data files
|   ├──helpers/
|   |   └──pug/
|   |       └──bemto/ - BEM for pug
|   ├──app.js - main script
|   └──pages/
└──core/
    └─tasks/
```
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