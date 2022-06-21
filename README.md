# Toast-js

## Installation
```bash
npm i @brenoroosevelt/toast
```

## Usage
```js
import toast from '@brenoroosevelt/toast'

const options = {
    //position: 'top' | 'bottom',
    //align: 'start' | 'center' | 'end',
    //bgColor: string,
    //color: string,
    //duration: number,
    //closeBtn: boolean,
    //zIndex: number,
    //dismissible: boolean,
    //shadow: boolean,
    //animateIn: number,
    //animateOut: number,
    //append: boolean,
    //maxWidth: number
}

// `options` is not required
toast.notify("Hi, i`am a notification", options) 
toast.info("Hi, i`am an toast", options)
toast.waring("Hi, i`am a toast", options)
toast.error("Hi, i`am a toast", options)
toast.success("Hi, i`am a toast", options)
```

## Default Options
| Attribute   | Type    | Default | Values                                 |
|-------------|---------|---------|----------------------------------------|
| type        | string  | default | default, error, info, warning, success |
| position    | string  | top     | top, bottom                            |
| align       | string  | end     | start, center, end                     |
| bgColor     | string  | #333    | css background-color                   |
| color       | string  | #fff    | css color                              |
| duration    | number  | 10000   | time in ms, 0 to disable               |
| closeBtn    | boolean | true    | show close button                      |
| zIndex      | number  | 99999   | css z-index                            |
| dismissible | boolean | true    | dismiss on click                       |
| shadow      | boolean | true    | display shadow                         |
| animateIn   | number  | 200     | animation time in ms; 0 to disable     |
| animateOut  | number  | 150     | animation time in ms; 0 to disable     |
| append      | boolean | true    | true = end, false = begin              |
| maxWidth    | number  | 0       | max width in px                        |

```js
import toast from '@brenoroosevelt/toast'

toast.types.default.dismissible = false
toast.types.default.maxWidth = 300
```

## Custom Types
```js
import toast from '@brenoroosevelt/toast'

// define new custom type
toast.types.setType('myType', {bgColor: "blue", position: "bottom", duration: 3000})

// override a built-in type configurantion
toast.types.setType('error', {position: "top", align: "center"})

toast.notify("Hello notification")
toast.error("Hello error")
```
## License
This project is licensed under the terms of the MIT license.

