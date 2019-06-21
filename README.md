# console-stylizer
Library for console messages stylization

## Setup

1. Install npm package in your project with:

```
npm install console-stylizer
```

2. Import styliser and enum with available console types 
```
import {Console, init} from '../src';
``` 

3. Run initializer with console type you want to stylise
```
// Inityalises console.warn without notifications
init(Console.Warn);

// Inityalises console.log with notifications 
init(Console.Log, true);
```

4. Config console stylization
```
// Set font color for console.warn to yellow
setFontColor(Console.Warn, fontColors.yellow);

// Set background color for console.log to cyan
setBgColor(Console.Log, backgroundColors.cyan);
```

5. Check that everything works
```
console.log('test string');

console.warn({test: 'object'});
```

## Compiling
To compile Typescript code to JavaScript:
 ```
 npm run build:prod
 ```
 
### Code analysis
To analyse code for readability, maintainability, and functionality errors:
 ```
 npm run lint
 ```
 
## Test checking
To run tests: 
 ```
 npm run test
 ```
 
### Continuous test running
To run test in watch mode:
 ```
 npm run test:tdd
 ```

## Documentation generation
To generate documentation you need:

1. To install jsdoc globally:
```
npm install -g jsdoc
```
2. Run:
```
npm run docs
```

### Generate documentation in single md file
Run:
```
npm run build:doc
```
