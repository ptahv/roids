# Striimi

Striimi is a simple value streaming library.

## Basics 

| Parameter | Type | Description |
|:-|:-|:-|
| striimi | Function | Used to create a stream. Takes init values as parameters. `const stream = striimi(initValues);` |

### Stream methods

subscribe | Function | Used to subscribe a function to the stream. Takes a function as a parameter. This function is called when stream values change. Subscribe -method instantly calls the function parameter with current stream values. Returns a function, which clears the subscription when invoked.

| Parameter | Type | Description |
|:-|:-|:-|
| listen | Function | Same as subscribe, but doesn't instantly call the function parameter. |
| emit | Function | Takes new values as a parameter and emits them to the stream. Every stream listener function gets called with the new values. |
| refresh | Function | Calls every stream listener function with current value. |
| reset | Function | Resets the streams init value. Calls listener functions with init value. |
| getValue&#160;/&#160;getValues | Function | Returns current stream values. |
| setValue&#160;/&#160;setValues | Function | Use not adviced, added for some special case. Sets stream values without emitting them to the stream. |

## Examples

### One value

Basic usage example.

```javascript

import striimi from 'striimi';

const stream = striimi({
    valueOne: 'ExampleValue',
    valueTwo: 1234
});

const subOne = stream.subscribe((val) => { console.log(val.valueOne) });

// Console.log: ExampleValue    --subOne

const subTwo = stream.subscribe(({valTwo}) => { console.log(valTwo) });

stream.emit({valueOne: 'ChangedValue', valueTwo: 4321});

// Console.log: ChangedValue    --subOne
// Console.log: 4321            --subTwo

subOne();

stream.reset();

// Console.log: 1234            --subTwo

```

### Multiple values 

Can also be used for multiple values.

```javascript

import striimi from 'striimi';

export default striimi('ExampleValue', 1234);

```
