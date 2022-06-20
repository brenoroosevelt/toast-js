type ToastPosition = 'top' | 'bottom'

type ToastJustify = 'start' | 'center' | 'end'

type ToastOptions = {
    position: ToastPosition,
    justify: ToastJustify,
    bgColor: string,
    color: string,
    duration: number,
    closeBtn: boolean,
    zIndex: number,
    dismissible: boolean
}

const _default: ToastOptions = {
    position: 'top',
    justify: 'end',
    bgColor: '#333',
    color: '#fff',
    closeBtn: true,
    duration: 10000,
    zIndex: 99999,
    dismissible: false
}

const ToastTypes = {
    default: _default,
    _types: new Map<string, object>([
        ['default', {bgColor: '#333'}],
        ['info', {bgColor: '#2f96b4'}],
        ['warning', {bgColor: '#f89406'}],
        ['error', {bgColor: '#ee6363'}],
        ['success', {bgColor: '#51a351'}]
    ]),

    getType(name: string): ToastOptions {
        return {...ToastTypes.default, ...(this._types.get(name) || {})}
    },

    setType(name: string, type: object): void {
        this._types.set(name, {...(this._types.get(name) || {}), ...type})
    }
}

const el = (e = 'div') => document.createElement(e)
const ev = (el: Element, ev: string, f: any) => el.addEventListener(ev, f)

let initialized: boolean | null = false

const initialize = () => {
    if (initialized) return
    const style = el('style')
    style.innerText = [
        '@keyframes toast-animate{from{transform:scaleY(0);opacity:0;}to{transform:scaleY(1);opacity:1;}}',
        '.toast-container{font-family:sans-serif;font-size:1rem;position:fixed;left:0;width:100%;margin:1rem 0;padding:0;display:grid;gap:0.5rem;pointer-events:none}',
        '.toast-element{padding:0.5rem;margin:0 1rem;border-radius:3px;pointer-events:auto}',
        '.toast-animation{transform-origin:50% 0;animation: toast-animate .2s linear}',
        '.toast-btn{display:flex;float:right;align-items:center;cursor:pointer;background:rgba(0,0,0,0.1);padding:2px 5px;margin-left:0.5rem;border-radius:3px}',
    ].join('')
    initialized = <boolean|null>document.body?.insertAdjacentElement('beforebegin', style);
}

const getContainer = (options: ToastOptions): HTMLDivElement => {
    initialize();
    const id = `toast-container-${options.position}-${options.justify}`;
    const container = <HTMLDivElement>(document.querySelector(`#${id}`) || el())
    container.id = id
    container.classList.add('toast-container')
    container.style[options.position] = String(0);
    container.style.justifyItems = options.justify;
    document.body?.appendChild(container)
    return container
}

const notify = (message: string, options: ToastOptions | object = {}): HTMLDivElement => {
    const _optionsOfType: ToastOptions = ToastTypes.getType('type' in options ? options['type'] : 'default')
    const _options: ToastOptions = {..._optionsOfType, ...options}
    const container = getContainer(_options), toast = el(), msg = el(), rm = () => toast.remove()

    toast.classList.add('toast-element')
    toast.style.backgroundColor = _options.bgColor;
    toast.style.color = _options.color;
    container.style.zIndex = _options.zIndex.toString()

    msg.style.display = 'flex'
    msg.innerHTML = message

    if (_options.dismissible) ev(toast, 'click', rm)
    if (_options.duration) setTimeout(rm, _options.duration)
    if (_options.closeBtn) {
        const btn = el()
        btn.classList.add('toast-btn')
        btn.innerHTML = '&#x2715'
        toast.appendChild(btn)
        ev(btn, 'click', rm)
    }

    ev(toast, 'click', () => toast.classList.remove('toast-animation'))
    toast.classList.add('toast-animation');
    toast.appendChild(msg)
    container.prepend(toast)

    return <HTMLDivElement>toast
}

const info = (message: string, options: ToastOptions | object = {}) => notify(message, {...options, ...{type: 'info'}})
const warning = (message: string, options: ToastOptions | object = {}) => notify(message, {...options, ...{type: 'warning'}})
const error = (message: string, options: ToastOptions | object = {}) => notify(message, {...options, ...{type: 'error'}})
const success = (message: string, options: ToastOptions | object = {}) => notify(message, {...options, ...{type: 'success'}})

export {
    ToastOptions,
    ToastTypes,
    notify,
    info,
    warning,
    error,
    success
}
