"use strict";
class Toast {
    constructor(position = Toast.defaultPosition, justify = Toast.defaultJustify) {
        this.position = position;
        this.justify = justify;
        this.container = null;
    }
    static setType(anType) {
        Toast.types.set(anType.type, anType);
    }
    createContainer() {
        const container = document.createElement('div');
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
        container.style.pointerEvents = 'none';
        return container;
    }
    create(message, config = {}) {
        var _a, _b;
        let type = Toast.types.get('default');
        if ('type' in config && Toast.types.has(config['type'])) {
            type = Toast.types.get(config['type']);
        }
        const _config = Object.assign(Object.assign({}, type), config);
        if (!(this.container instanceof Element)) {
            this.container = (_a = document.body) === null || _a === void 0 ? void 0 : _a.insertAdjacentElement('afterbegin', this.createContainer());
        }
        const toaster = document.createElement('div');
        toaster.style.padding = '0.5rem';
        toaster.style.margin = '0 1rem';
        toaster.style.borderRadius = '3px';
        toaster.style.backgroundColor = _config.bgColor || '#333';
        toaster.style.color = _config.color || '#fff';
        toaster.style.pointerEvents = 'auto';
        const msg = document.createElement('div');
        msg.innerHTML = message;
        if (_config.closeBtn) {
            toaster.appendChild(this.createCloseButton());
        }
        toaster.appendChild(msg);
        (_b = this.container) === null || _b === void 0 ? void 0 : _b.appendChild(toaster);
        if (_config.duration) {
            setTimeout(() => toaster.remove(), _config.duration);
        }
        return toaster;
    }
    createCloseButton() {
        const closeBtn = document.createElement('div');
        closeBtn.style.cursor = 'pointer';
        closeBtn.style.background = 'rgba(0,0,0,0.1)';
        closeBtn.style.borderRadius = '3px';
        closeBtn.style.padding = '2px 5px';
        closeBtn.style.marginLeft = '0.5rem';
        closeBtn.style.display = 'flex';
        closeBtn.style.float = 'right';
        closeBtn.style.alignItems = 'center';
        closeBtn.innerHTML = '&#x2715';
        closeBtn.addEventListener('click', () => { var _a; return (_a = closeBtn.parentElement) === null || _a === void 0 ? void 0 : _a.remove(); });
        return closeBtn;
    }
    static default(message, config = {}) {
        const _position = config.position || Toast.defaultPosition;
        const _justify = config.justify || Toast.defaultJustify;
        const defaultInstance = Toast.instances.get('top-center');
        const instance = Toast.instances.get(_position + '-' + _justify);
        return (instance || defaultInstance).create(message, config);
    }
    static info(message, config = {}) {
        return Toast.default(message, Object.assign(Object.assign({}, config), { type: 'info' }));
    }
    static warning(message, config = {}) {
        return Toast.default(message, Object.assign(Object.assign({}, config), { type: 'warning' }));
    }
    static error(message, config = {}) {
        return Toast.default(message, Object.assign(Object.assign({}, config), { type: 'error' }));
    }
    static success(message, config = {}) {
        return Toast.default(message, Object.assign(Object.assign({}, config), { type: 'success' }));
    }
    static setDefaults(config = {}) {
        Toast.defaultPosition = config.position || Toast.defaultPosition;
        Toast.defaultJustify = config.justify || Toast.defaultJustify;
        Toast.types.set('default', Object.assign(Object.assign({}, Toast.types.get('default')), config));
    }
}
Toast.defaultPosition = 'top';
Toast.defaultJustify = 'center';
Toast.types = new Map([
    ['default', { type: 'default', bgColor: '#333', color: '#fff', closeBtn: true, duration: 8000 }],
    ['info', { type: 'success', bgColor: 'teal', color: '#fff', closeBtn: true, duration: 8000 }],
    ['success', { type: 'success', bgColor: 'green', color: '#fff', closeBtn: true, duration: 8000 }],
    ['warning', { type: 'warning', bgColor: 'orange', color: '#fff', closeBtn: true, duration: 8000 }],
    ['error', { type: 'error', bgColor: 'red', color: '#fff', closeBtn: true, duration: 8000 }],
]);
Toast.instances = new Map([
    ['top-start', new Toast("top", "start")],
    ['top-center', new Toast("top", "center")],
    ['top-end', new Toast("top", "end")],
    ['bottom-start', new Toast("bottom", "start")],
    ['bottom-center', new Toast("bottom", "center")],
    ['bottom-end', new Toast("bottom", "end")],
]);
