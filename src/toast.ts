type ToastOptions = {
    type: string,
    position: 'top' | 'bottom',
    justify: 'start' | 'center' | 'end',
    bgColor: string,
    color: string,
    duration: number,
    closeBtn: boolean,
    zIndex: number,
    dismissible: boolean,
    shadow: boolean,
    animateIn: number,
    animateOut: number,
    append: boolean,
    maxWidth: 0
}

const _default: ToastOptions = {
    type: 'default',
    position: 'top',
    justify: 'end',
    bgColor: '#333',
    color: '#fff',
    closeBtn: true,
    duration: 10000,
    zIndex: 99999,
    dismissible: true,
    shadow: true,
    animateIn: 200,
    animateOut: 200,
    append: true,
    maxWidth: 0
}

const types: Partial<ToastOptions>[] = [
    {bgColor: '#2f96b4', type: 'info'},
    {bgColor: '#f89406', type: 'warning'},
    {bgColor: '#ee6363', type: 'error'},
    {bgColor: '#51a351', type: 'success'},
]

const ToastTypes = {
    default: _default,
    getType(name: string): ToastOptions {
        return <ToastOptions>merge(_default, types.find((t) => t.type === name) || {})
    },
    setType(name: string, type: Partial<ToastOptions>): void {
        type.type = name
        const indexOf = types.findIndex((t) => t.type === name)
        indexOf === -1 ? types.push(type) : types[indexOf] = merge(types[indexOf], type)
    }
}

const el = (e = 'div') => document.createElement(e)
const ev = (el: Element, ev: string, f: any) => el.addEventListener(ev, f)
const merge = (a: Partial<ToastOptions>, b: Partial<ToastOptions>): Partial<ToastOptions> => {
    return {...a, ...b}
}

const style = {
    cnt: 'font-family:sans-serif;font-size:1rem;position:fixed;left:0;width:100%;margin:1rem 0;padding:0;display:grid;gap:0.5rem;pointer-events:none',
    elm: 'padding:0.5rem;margin:0 1rem;border-radius:3px;pointer-events:auto;transform-origin:50% 0;',
    btn: 'display:flex;float:right;align-items:center;cursor:pointer;background:rgba(0,0,0,0.1);padding:2px 5px;margin-left:0.5rem;border-radius:3px'
}

const getContainer = (options: ToastOptions): HTMLDivElement => {
    const id = `toast-container-${options.position}-${options.justify}`;
    const container = <HTMLDivElement>(document.querySelector(`#${id}`) || el())
    container.id = id
    container.setAttribute('style', style.cnt)
    container.style[options.position] = String(0);
    container.style.justifyItems = options.justify;
    document.body?.append(container)
    return container
}

const notify = (message: string, options: Partial<ToastOptions> = {}): HTMLDivElement => {
    const _optionsOfType: ToastOptions = ToastTypes.getType(options['type'] || 'default')
    const _options: ToastOptions = <ToastOptions>merge(_optionsOfType, options)
    const container = getContainer(_options), toast = el(), msg = el()
    const animateIn = () => toast.animate([{transform: 'scaleY(0)'}, {transform: 'scaleY(1)'}], _options.animateIn)
    const animateOut = () => toast.animate([{transform: 'scaleY(1)'}, {transform: 'scaleY(0)'}], _options.animateOut)
    const dismiss  = () => {
        if (_options.animateOut && toast) animateOut().addEventListener('finish', () => toast.remove())
        else toast.remove()
    }

    toast.setAttribute('style', style.elm)
    toast.style.backgroundColor = _options.bgColor;
    toast.style.color = _options.color;
    container.style.zIndex = _options.zIndex.toString()

    msg.style.display = 'flex'
    msg.innerHTML = message

    if (_options.dismissible) ev(toast, 'click', dismiss)
    if (_options.duration) setTimeout(dismiss, _options.duration)
    if (_options.shadow) toast.style.boxShadow = '0 0.05rem 0.75rem rgba(0, 0, 0, 0.5)'
    if (_options.maxWidth) toast.style.maxWidth = _options.maxWidth + 'px'
    if (_options.closeBtn) {
        const btn = el()
        btn.setAttribute('style', style.btn)
        btn.innerHTML = '&#x2715'
        toast.append(btn)
        ev(btn, 'click', dismiss)
    }

    toast.append(msg)
    _options.append ? container.append(toast) : container.prepend(toast)
    if (_options.animateIn) animateIn()

    return <HTMLDivElement>toast
}

const info = (message: string, options: Partial<ToastOptions> = {}) => notify(message, merge(options, {type: 'info'}))
const warning = (message: string, options: Partial<ToastOptions> = {}) => notify(message, merge(options, {type: 'warning'}))
const error = (message: string, options: Partial<ToastOptions> = {}) => notify(message, merge(options, {type: 'error'}))
const success = (message: string, options: Partial<ToastOptions> = {}) => notify(message, merge(options, {type: 'success'}))

export {
    ToastOptions,
    ToastTypes,
    notify,
    info,
    warning,
    error,
    success
}
