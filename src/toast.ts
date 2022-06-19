type ToastConfig = {
    position?: 'top' | 'bottom',
    justify?: 'end' | 'start' | 'center',
    closeBtn?: boolean,
    duration?: number,
    bgColor?: string,
    color?: string
}

type ToastCreateConfig = {
    duration?: number | undefined,
    closeBtn?: boolean | undefined,
    bgColor?: string | undefined,
    color?: string | undefined,
}

class Toast {
    private static _topLeft: Toast | null = null;
    private static _topCenter: Toast | null = null;
    private static _topRight: Toast | null = null;
    private static _bottomLeft: Toast | null = null;
    private static _bottomRight: Toast | null = null;
    private static _bottomCenter: Toast | null = null;

    private container: Element | null = null

    private readonly config: ToastConfig = {
        position: 'top',
        justify: 'end',
        closeBtn: true,
        duration: 5000,
        bgColor: '#333',
        color: '#fff'
    }

    constructor(config: ToastConfig = {position: "top", justify: "end"}) {
        this.config = {...this.config, ...config}
    }

    private createContainer(): Element {
        const container = document.createElement('div')
        container.style.fontFamily = 'sans-serif';
        container.style.fontSize = '1rem';
        container.style.position = 'fixed';
        container.style[this.config.position || 'top'] = '0'; // aqui
        container.style['left'] = '0';
        container.style.width = '100%';
        container.style.margin = '1rem 0';
        container.style.padding = '0';
        container.style.display = 'grid';
        container.style.justifyItems = this.config.justify || 'end'; // aqui
        container.style.gap = '0.5rem';
        container.style.pointerEvents = 'none'

        return container
    }

    public create(message: string, config: ToastCreateConfig = {}): Element {
        const _config = {...this.config, ...config}
        if (!(this.container instanceof Element)) {
            this.container = document.body?.insertAdjacentElement('afterbegin', this.createContainer());
        }

        const toaster = document.createElement('div')
        toaster.style.padding = '0.5rem';
        toaster.style.margin = '0 1rem';
        toaster.style.borderRadius = '3px';
        toaster.style.backgroundColor = _config.bgColor || '#333';
        toaster.style.color = _config.color || '#fff';
        toaster.style.pointerEvents = 'auto'

        const msg = document.createElement('div')
        msg.innerHTML = message

        if (_config.closeBtn) {
            toaster.appendChild(this.createCloseButton())
        }

        toaster.appendChild(msg)
        this.container?.appendChild(toaster)

        if (_config.duration) {
            setTimeout(() => toaster.remove(), _config.duration)
        }

        return toaster
    }

    private createCloseButton(): Element {
        const closeBtn = document.createElement('div')
        closeBtn.style.cursor = 'pointer'
        closeBtn.style.background = 'rgba(0,0,0,0.1)'
        closeBtn.style.borderRadius = '3px'
        closeBtn.style.padding = '2px 5px'
        closeBtn.style.marginLeft = '0.5rem'
        closeBtn.style.display = 'flex'
        closeBtn.style.float = 'right';
        closeBtn.style.alignItems = 'center'
        closeBtn.innerHTML = '&#x2715'
        closeBtn.addEventListener('click', () => closeBtn.parentElement?.remove())

        return closeBtn
    }

    set position(v: 'top' | 'bottom') {
        this.config.position = v
    }

    set justify(v: 'start' | 'center' | 'end') {
        this.config.justify = v
    }

    set bgColor(v: string) {
        this.config.bgColor = v
    }

    set color(v: string) {
        this.config.color = v
    }

    set closeBtn(v: boolean) {
        this.config.closeBtn = v
    }

    set duration(v: number) {
        this.config.duration = v
    }

    get position() {
        return <'top'|'bottom'>this.config.position
    }

    get justify() {
        return <'start' | 'center' | 'end'>this.config.justify
    }

    get bgColor() {
        return <string>this.config.bgColor
    }

    get color() {
        return <string>this.config.color
    }

    get closeBtn() {
        return <boolean>this.config.closeBtn
    }

    get duration() {
        return <number>this.config.duration
    }

    public info(message: string, config: ToastCreateConfig = {}): Element {
        return this.create(message, {...config, ...{bgColor: "#333"}})
    }

    public warning(message: string, config: ToastCreateConfig = {}): Element {
        return this.create(message, {...config, ...{bgColor: "orange"}})
    }

    public error(message: string, config: ToastCreateConfig = {}): Element {
        return this.create(message, {...config, ...{bgColor: "red"}})
    }

    public success(message: string, config: ToastCreateConfig = {}): Element {
        return this.create(message, {...config, ...{bgColor: "teal"}})
    }

    public static topLeft(config: ToastConfig = {}): Toast {
        return Toast._topLeft || (Toast._topLeft = new Toast({...config, ...{position: "top", "justify" : "start"}}))
    }

    public static topRight(config: ToastConfig = {}): Toast {
        return Toast._topRight || (Toast._topRight = new Toast({...config, ...{position: "top", "justify" : "end"}}))
    }

    public static topCenter(config: ToastConfig = {}): Toast {
        return Toast._topCenter || (Toast._topCenter = new Toast({...config, ...{position: "top", "justify" : "center"}}))
    }

    public static bottomLeft(config: ToastConfig = {}): Toast {
        return Toast._bottomLeft || (Toast._bottomLeft = new Toast({...config, ...{position: "bottom", "justify" : "start"}}))
    }

    public static bottomRight(config: ToastConfig = {}): Toast {
        return Toast._bottomRight || (Toast._bottomRight = new Toast({...config, ...{position: "bottom", "justify" : "end"}}))
    }

    public static bottomCenter(config: ToastConfig = {}): Toast {
        return Toast._bottomCenter || (Toast._bottomCenter = new Toast({...config, ...{position: "bottom", "justify" : "center"}}))
    }
}
