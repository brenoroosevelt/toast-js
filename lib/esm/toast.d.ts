declare type ToastPosition = 'top' | 'bottom';
declare type ToastJustify = 'start' | 'center' | 'end';
declare type ToastType = {
    type: string;
    closeBtn: boolean;
    duration: number;
    bgColor: string;
    color: string;
};
declare type ToastCreation = {
    position?: ToastPosition;
    justify?: ToastJustify;
    type?: string;
    closeBtn?: boolean;
    duration?: number;
    bgColor?: string;
    color?: string;
};
declare class Toast {
    private readonly position;
    private readonly justify;
    private static defaultPosition;
    private static defaultJustify;
    private container;
    private static types;
    private static instances;
    constructor(position?: 'top' | 'bottom', justify?: 'start' | 'center' | 'end');
    static setType(anType: ToastType): void;
    private createContainer;
    create(message: string, config?: ToastType | object): HTMLDivElement;
    private createCloseButton;
    static default(message: string, config?: ToastCreation): HTMLDivElement;
    static info(message: string, config?: ToastCreation): HTMLDivElement;
    static warning(message: string, config?: ToastCreation): HTMLDivElement;
    static error(message: string, config?: ToastCreation): HTMLDivElement;
    static success(message: string, config?: ToastCreation): HTMLDivElement;
    static setDefaults(config?: ToastCreation): void;
}
