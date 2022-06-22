type ToastOptions = {
    type: string,
    title?: string,
    position: 'top' | 'bottom',
    align: 'start' | 'center' | 'end',
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
    maxWidth: number,
    actions: ToastAction[]
}

type ToastAction = {
    text: string,
    value: any,
    color?: string,
    bgColor?: string
}

const _default: ToastOptions = {
    type: 'default',
    title: undefined,
    position: 'top',
    align: 'end',
    bgColor: '#333',
    color: '#fff',
    closeBtn: true,
    duration: 10000,
    zIndex: 99999,
    dismissible: true,
    shadow: true,
    animateIn: 200,
    animateOut: 150,
    append: true,
    maxWidth: 600,
    actions: []
}

const types: Partial<ToastOptions>[] = [
    {bgColor: '#2f96b4', type: 'info'},
    {bgColor: '#f89406', type: 'warning'},
    {bgColor: '#ee6363', type: 'error'},
    {bgColor: '#51a351', type: 'success'},
    {bgColor: '#fff', color: '#333', type: 'system'},
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
    cnt: '.br-toast-container{font-family:sans-serif;font-size:14px;position:fixed;left:0;width:100%;margin:1rem 0;padding:0;display:grid;gap:0.60rem;pointer-events:none}',
    elm: '.br-toast-element{padding:0.6rem;margin:0 1rem;border-radius:5px;pointer-events:auto;transform-origin:50% 0;box-shadow: 0 1px 5px 0 rgba(0,0,0,0.3)}.br-toast-element:hover{box-shadow: 0 1px 10px 0 rgba(0,0,0,0.5)}',
    btn: '.br-toast-close-btn{width:24px; height:24px; display:flex;align-items:center;cursor:pointer;background:rgba(0,0,0,0.1);padding:0px 5px;margin-left:0.5rem;border-radius:4px}',
    msg: '.br-toast-message{margin:0; padding:0; display: block;}',
    tlt: '.br-toast-title{width: 100%;margin:0;font-weight:bold; display:block}',
    act: '.br-toast-action{background:rgba(0,0,0,0.5); color: #fff; border-radius: 3px; margin: 10px 10px 0 0; padding: 6px 10px; cursor: pointer; border: 0}.br-toast-action:hover{box-shadow:0px 1px 8px 1px rgba(0,0,0,0.5);}',
    initialized: false,
    init() {
        if (this.initialized) return;
        const css = el('style')
        css.textContent = [this.cnt, this.elm, this.btn, this.msg, this.tlt, this.act].join('')
        // @ts-ignore
        this.initialized = document.head?.appendChild(css)
    }
}

const getContainer = (options: ToastOptions): HTMLDivElement => {
    style.init()
    const id = `toast-container-${options.position}-${options.align}`;
    const container = <HTMLDivElement>(document.querySelector(`#${id}`) || el())
    container.id = id
    container.classList.add('br-toast-container')
    container.style[options.position] = String(0);
    container.style.justifyItems = options.align;
    document.body?.append(container)
    return container
}

const create = (message: string | undefined | null, options: Partial<ToastOptions> = {}): Promise<ToastAction> => {
    return new Promise((resolve, reject) => {
        const _optionsOfType: ToastOptions = ToastTypes.getType(options['type'] || 'default')
        const _options: ToastOptions = <ToastOptions>merge(_optionsOfType, options)
        const container = getContainer(_options), toast = el(), msg = el('p')
        const animateIn = () => toast.animate([{transform: 'scaleY(0)'}, {transform: 'scaleY(1)'}], _options.animateIn)
        const animateOut = () => toast.animate([{transform: 'scaleY(1)'}, {transform: 'scaleY(0)'}], _options.animateOut)
        const remove = (action: ToastAction) => {
            toast.remove()
            resolve(action)
        }
        const dismiss  = (action: ToastAction) => {
            if (_options.animateOut && toast) animateOut().addEventListener('finish', () => remove(action))
            else remove(action)
        }

        const inner = el()
        toast.style.display ='flex'
        toast.style.justifyContent = 'space-between'
        toast.append(inner)

        toast.classList.add('br-toast-element')
        toast.style.backgroundColor = _options.bgColor;
        toast.style.color = _options.color;
        container.style.zIndex = _options.zIndex.toString()

        msg.classList.add('br-toast-message')
        msg.innerHTML = message || ''

        if (_options.dismissible) ev(toast, 'click', () => dismiss({text: "click", value: "click"}))
        if (_options.duration) setTimeout(() => dismiss({text: "timeout", value: "timeout"}), _options.duration)
        if (!_options.shadow) toast.style.boxShadow = 'none'
        if (_options.maxWidth) toast.style.maxWidth = _options.maxWidth + 'px'
        if (_options.closeBtn) {
            const btn = el()
            btn.classList.add('br-toast-close-btn')
            btn.innerHTML = '&#x2715'
            toast.append(btn)
            ev(btn, 'click', () => dismiss({text: "close-btn", value: "close-btn"}))
        }

        if (_options.title) {
            const title = el('p')
            title.classList.add('br-toast-title')
            title.innerHTML = _options.title
            inner.append(title)
        }

        inner.append(msg)
        _options.append ? container.append(toast) : container.prepend(toast)
        if (_options.animateIn) animateIn()

        _options.actions.forEach((action, i) => {
            const d = el('button')
            d.classList.add('br-toast-action')
            d.style.color = action.color || _options.color
            if (action.bgColor) d.style.backgroundColor = action.bgColor
            d.innerHTML = action.text
            d.addEventListener('click', (e) => {
                dismiss(action)
            })
            toast.appendChild(d)
        })
    })
}

const info = (message: string | undefined | null, options: Partial<ToastOptions> = {}) => create(message, merge(options, {type: 'info'}))
const warning = (message: string | undefined | null, options: Partial<ToastOptions> = {}) => create(message, merge(options, {type: 'warning'}))
const error = (message: string | undefined | null, options: Partial<ToastOptions> = {}) => create(message, merge(options, {type: 'error'}))
const success = (message: string | undefined | null, options: Partial<ToastOptions> = {}) => create(message, merge(options, {type: 'success'}))
const system = (message: string | undefined | null, options: Partial<ToastOptions> = {}) => create(message, merge(options, {type: 'system'}))

export {
    ToastOptions,
    ToastTypes,
    create,
    info,
    warning,
    error,
    success,
    system
}