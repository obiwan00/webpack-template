# Webpack Template

Webpack is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging just about any resource or asset.

## Build Setup:

``` bash
# Download repository:
git clone https://github.com/obiwan00/webpack-template.git webpack-template

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
* `src/fonts` - put your fonts here. Don't forget to plugin them in `srs/style/_fonts.scss`
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
Add files with fonts in `./src/fonts/`
```
.
└── CustomFont
    └── CustomFont.woff2
```
Add `@font-face` in `./src/styles/_fonts.scss`:

``` scss
// Example with CustomFont
@font-face {
    font-family: 'CustomFont';
    font-weight: 700;
    src: url('../fonts/CustomFont/CustomFont.woff2');
}
```

Add vars for font in `./src/styles/_variables.scss`:

``` scss
$myFont : 'CustomFont', Arial, sans-serif;
```
### @import:

Add `@import` before import of `_typography.scss` file.
``` scss
// ./srs/styles/style.scss
...
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,900;1,300;1,400;1,900&display=swap");
@import '_fonts';
@import '_typography';
...
```
## License `null`

Copyright (c) 2020-present, [Ivan Maidaniuk](https://github.com/obiwan00) - [Contact](https://t.me/ivan_maidaniuk)
