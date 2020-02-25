# console-stylizer
[![Build Status](https://travis-ci.org/gr8name/console-stylizer.svg?branch=master)](https://travis-ci.org/gr8name/console-stylizer)
[![Coverage Status](https://coveralls.io/repos/github/gr8name/console-stylizer/badge.svg?branch=master)](https://coveralls.io/github/gr8name/console-stylizer?branch=master)

Library for console messages stylization.

## Setup

1. Install npm package in your project with:

```
npm install console-stylizer
```

2. Import styliser function and enums with available console types and colors 
```
import {stylize, ConsoleType, ColorsPalette} from 'console-stylizer';
``` 

3. Run initializer with console type you want to stylise
```
// Set yellow font color and magenta bacroundg color to console.warn 
stylize(ConsoleType.Log, {fontColor: ColorsPalette.yellow, bgColor: ColorsPalette.magenta});

// Set green font color to console.warn 
stylize(ConsoleType.Error, {fontColor: ColorsPalette.green});

```

4. Check that styles applied
```
console.log('test string');

console.warn({test: 'object'});
```
