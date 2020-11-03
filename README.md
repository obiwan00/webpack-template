# Webpack Template

Webpack is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging just about any resource or asset.

## Build Setup:

``` bash
# Download repository:
git clone https://obiwwan@bitbucket.org/obiwwan/webpacktemplate.git webpack-template

# Go to the app:
cd webpack-template

# Install dependencies:
npm install

# Server with hot reload at http://localhost:4000/
npm run start

# Output will be at dist/ folder
npm run build
```

## Project Structure:

* `src/index.html` - main app HTML
* `src/styles` - put custom app SCSS styles here. Don't forget to import them in `index.js`
* `src/styles/components` - folder with custom `.scss` components
* `src/img` - put images here.
* `src/js` - put custom app scripts here
* `src/js/index.js` - main app file where you include/import all required libs and init app

# ⚙️ Settings ⚙️

## Import Another libs:
1. Install libs
2. Import libs in `./index.js`
``` js
// React example
import React from 'react'
// Bootstrap example
import Bootstrap from 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
```

## Import js files:
1. Create another js module in `./js/` folder
2. Import modules in `./js/index.js` file
``` js
// another js file for example
import './common.js'
```

## HTML Directory: `./src`
 **Usage:**
All files must be created in the `./src` folder.
Example:
``` bash
./src/index.html
./src/about.html
```

## Create Another HTML Files:
Automatic creation any html pages:
1. Create another html file in `./src` (main folder)
2. Open new page `http://localhost:4000/newPageName.html`


## Add Fonts:

Сhoose one of the ways:
1. Handle menthod,
2. Use @import;

### Handle:
Add file with fonts in `./src/styles/fonts/`
```
.
├── AileronTTF
│   ├── Aileron-Bold.ttf
│   └── Aileron-Regular.ttf
└── fonts.scss
```
Add `@font-face` in `./src/styles/fonts/fonts.scss`:

``` scss
// Example with Aileron
@font-face {
    font-family: 'Aileron';
    font-weight: 400;
    src: url('./AileronTTF/Aileron.ttf');
}
@font-face {
    font-family: 'Aileron';
    font-weight: 700;
    src: url('./AileronTTF/Aileron-Bold.ttf');
}
...
```

Add vars for font in `./src/styles/_typography.scss`:

``` scss
$myFont : 'Aileron', Arial, sans-serif;
```
### @import:

Add `@import` of font to the begining of `./src/styles/_typography.scss` file.

Exemple: `@import url('https://fonts.googleapis.com/css2?family=Roboto:ital@1&display=swap');`

## License `null`

Copyright (c) 2020-present, [Ivan Maidaniuk](https://github.com/obiwan00) - [Contact](https://t.me/ivan_maidaniuk)
