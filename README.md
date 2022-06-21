# Toast-js

## Installation
```bash
npm install @brenoroosevelt/toast --save
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

toast.notify("Hi, i`am a notification", options)
toast.info("Hi, i`am an toast", options)
toast.waring("Hi, i`am a toast", options)
toast.error("Hi, i`am a toast", options)
toast.success("Hi, i`am a toast", options)
```

## Default Options
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
This project is licensed under the terms of the MIT license. See the [LICENSE](LICENSE.md) file for license rights and limitations.

