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
    duration: 8000,
    zIndex: 99999,
    dismissible: true
}

const ToastTypes = {
    default: _default,
    _types: new Map<string, object>([
        ['default', {bgColor: '#ddd'}],
        ['info', {bgColor: 'teal'}],
        ['warning', {bgColor: '#fd7e14'}],
        ['error', {bgColor: '#dc3545'}],
        ['success', {bgColor: '#198754'}]
    ]),

    getType(name: string): ToastOptions {
        return {...ToastTypes.default, ...(this._types.get(name) || {})}
    },

    setType(name: string, type: object): void {
        this._types.set(name, {...(this._types.get(name) || {}), ...type})
    }
}

const getContainer = (options: ToastOptions): Element => {
    const id = `toast-container-${options.position}-${options.justify}`
    const container = <HTMLDivElement>(document.querySelector(`#${id}`) || document.createElement('div'))
    container.id = id
    container.style.fontFamily = 'sans-serif';
    container.style.fontSize = '1rem';
    container.style.position = 'fixed';
    container.style[options.position] = '0';
    container.style['left'] = '0';
    container.style.width = '100%';
    container.style.margin = '1rem 0';
    container.style.padding = '0';
    container.style.display = 'grid';
    container.style.justifyItems = options.justify;
    container.style.gap = '0.5rem';
    container.style.pointerEvents = 'none'

    document.body?.appendChild(container)

    return container
}

const create = (message: string, options: ToastOptions | object = {}) => {
    const _optionsOfType: ToastOptions = ToastTypes.getType('type' in options ? options['type'] : 'default')
    const _options: ToastOptions = {..._optionsOfType, ...options}
    const toast = document.createElement('div')
    toast.style.padding = '0.5rem';
    toast.style.margin = '0 1rem';
    toast.style.borderRadius = '3px';
    toast.style.backgroundColor = _options.bgColor;
    toast.style.color = _options.color;
    toast.style.pointerEvents = 'auto'

    const msg = document.createElement('div')
    msg.innerHTML = message

    if (_options.dismissible) {
        msg.addEventListener('click', () => msg?.parentElement?.remove())
    }

    if (_options.closeBtn) {
        const btn = createCloseButton()
        toast.appendChild(btn)
        btn.addEventListener('click', () => btn?.parentElement?.remove())
    }

    toast.appendChild(msg)
    const container = getContainer(_options)
    if (container instanceof HTMLDivElement) {
        container.appendChild(toast)
        container.style.zIndex = _options.zIndex.toString()
    }

    if (_options.duration) {
        setTimeout(() => toast.remove(), _options.duration)
    }

    return toast
}

const createCloseButton = (): HTMLDivElement => {
    const btn = document.createElement('div')
    btn.style.cursor = 'pointer'
    btn.style.background = 'rgba(0,0,0,0.1)'
    btn.style.borderRadius = '3px'
    btn.style.padding = '2px 5px'
    btn.style.marginLeft = '0.5rem'
    btn.style.display = 'flex'
    btn.style.float = 'right';
    btn.style.alignItems = 'center'
    btn.innerHTML = '&#x2715'

    return btn
}

const info = (message: string, options: ToastOptions | object = {type: 'info'}) => create(message, options)
const warning = (message: string, options: ToastOptions | object = {type: 'warning'}) => create(message, options)
const error = (message: string, options: ToastOptions | object = {type: 'error'}) => create(message, options)
const success = (message: string, options: ToastOptions | object = {type: 'success'}) => create(message, options)

export {
    ToastOptions,
    ToastTypes,
    create,
    info,
    warning,
    error,
    success
}
