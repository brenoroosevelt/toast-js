type ToastPosition = 'top' | 'bottom'
type ToastJustify = 'start' | 'center' | 'end'

type ToastType = {
    type: string,
    closeBtn: boolean,
    duration: number,
    bgColor: string,
    color: string,
}

type ToastCreation = {
    position?: ToastPosition,
    justify?: ToastJustify,
    type?: string,
    closeBtn?: boolean,
    duration?: number,
    bgColor?: string,
    color?: string,
}

export default class Toast {

    private static defaultPosition: ToastPosition = 'top'
    private static defaultJustify: ToastJustify = 'center'

    private container: HTMLDivElement | null = null

    private static types = new Map<string, ToastType>([
        ['default', {type: 'default', bgColor: '#333', color: '#fff', closeBtn: true, duration: 8000}],
        ['info', {type: 'success', bgColor: 'teal', color: '#fff', closeBtn: true, duration: 8000}],
        ['success', {type: 'success', bgColor: 'green', color: '#fff', closeBtn: true, duration: 8000}],
        ['warning', {type: 'warning', bgColor: 'orange', color: '#fff', closeBtn: true, duration: 8000}],
        ['error', {type: 'error', bgColor: 'red', color: '#fff', closeBtn: true, duration: 8000}],
    ])

    private static instances = new Map<string, Toast>([
        ['top-start', new Toast("top", "start")],
        ['top-center', new Toast("top", "center")],
        ['top-end', new Toast("top", "end")],
        ['bottom-start', new Toast("bottom", "start")],
        ['bottom-center', new Toast("bottom", "center")],
        ['bottom-end', new Toast("bottom", "end")],
    ])

    constructor(
        private readonly position: 'top' | 'bottom' = Toast.defaultPosition,
        private readonly justify: 'start' | 'center' | 'end' = Toast.defaultJustify,
    ) {
    }

    public static setType(anType: ToastType): void {
        Toast.types.set(anType.type, anType)
    }

    private createContainer(): HTMLDivElement {
        const container = document.createElement('div')
        container.style.fontFamily = 'sans-serif';
        container.style.fontSize = '1rem';
        container.style.position = 'fixed';
        container.style[this.position] = '0';
        container.style['left'] = '0';
        container.style.width = '100%';
        container.style.margin = '1rem 0';
        container.style.padding = '0';
        container.style.display = 'grid';
        container.style.justifyItems = this.justify;
        container.style.gap = '0.5rem';
        container.style.pointerEvents = 'none'

        return container
    }

    public create(message: string, config: ToastType | object = {}): HTMLDivElement {
        let type: ToastType = <ToastType>Toast.types.get('default')
        if ('type' in config && Toast.types.has(config['type'])) {
            type = <ToastType>Toast.types.get(config['type'])
        }
        const _config: ToastType = {...type, ...config}

        if (!(this.container instanceof Element)) {
            this.container = <HTMLDivElement>document.body?.insertAdjacentElement(
                'afterbegin',
                this.createContainer()
            );
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

    private createCloseButton(): HTMLDivElement {
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

    public static default(message: string, config: ToastCreation = {}): HTMLDivElement {
        const _position: ToastPosition = config.position || Toast.defaultPosition
        const _justify: ToastJustify = config.justify || Toast.defaultJustify
        const defaultInstance = Toast.instances.get('top-center')
        const instance: Toast = (<Toast>Toast.instances.get(_position + '-' +_justify))
        return (instance || defaultInstance).create(message, config)
    }

    public static info(message: string, config: ToastCreation = {}): HTMLDivElement {
        return Toast.default(message, {...config, ...{type: 'info'}})
    }

    public static warning(message: string, config: ToastCreation = {}): HTMLDivElement {
        return Toast.default(message, {...config, ...{type: 'warning'}})
    }

    public static error(message: string, config: ToastCreation = {}): HTMLDivElement {
        return Toast.default(message, {...config, ...{type: 'error'}})
    }

    public static success(message: string, config: ToastCreation = {}): HTMLDivElement {
        return Toast.default(message, {...config, ...{type: 'success'}})
    }

    public static setDefaults(config: ToastCreation = {}): void {
        Toast.defaultPosition = config.position || Toast.defaultPosition
        Toast.defaultJustify = config.justify || Toast.defaultJustify
        Toast.types.set('default', {...Toast.types.get('default'), ...<ToastType>config})
    }
}
