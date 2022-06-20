declare type ToastPosition = 'top' | 'bottom';
declare type ToastJustify = 'start' | 'center' | 'end';
declare type ToastOptions = {
    position: ToastPosition;
    justify: ToastJustify;
    bgColor: string;
    color: string;
    duration: number;
    closeBtn: boolean;
    zIndex: number;
    dismissible: boolean;
};
declare const ToastTypes: {
    default: ToastOptions;
    _types: Map<string, object>;
    getType(name: string): ToastOptions;
    setType(name: string, type: object): void;
};
declare const notify: (message: string, options?: ToastOptions | object) => HTMLDivElement;
declare const info: (message: string, options?: ToastOptions | object) => HTMLDivElement;
declare const warning: (message: string, options?: ToastOptions | object) => HTMLDivElement;
declare const error: (message: string, options?: ToastOptions | object) => HTMLDivElement;
declare const success: (message: string, options?: ToastOptions | object) => HTMLDivElement;
export { ToastOptions, ToastTypes, notify, info, warning, error, success };
