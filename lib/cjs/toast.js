"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.success = exports.error = exports.warning = exports.info = exports.notify = exports.ToastTypes = void 0;
const _default = {
    position: 'top',
    justify: 'end',
    bgColor: '#333',
    color: '#fff',
    closeBtn: true,
    duration: 10000,
    zIndex: 99999,
    dismissible: false
};
const ToastTypes = {
    default: _default,
    _types: new Map([
        ['default', { bgColor: '#333' }],
        ['info', { bgColor: '#2f96b4' }],
        ['warning', { bgColor: '#f89406' }],
        ['error', { bgColor: '#ee6363' }],
        ['success', { bgColor: '#51a351' }]
    ]),
    getType(name) {
        return Object.assign(Object.assign({}, ToastTypes.default), (this._types.get(name) || {}));
    },
    setType(name, type) {
        this._types.set(name, Object.assign(Object.assign({}, (this._types.get(name) || {})), type));
    }
};
exports.ToastTypes = ToastTypes;
let initialized = false;
const init = () => {
    if (initialized)
        return;
    document.body.insertAdjacentHTML('beforebegin', `<style>.toast-animation{animation: ease-in-out;}</style>`);
    initialized = true;
};
const getContainer = (options) => {
    var _a;
    init();
    const id = `toast-container-${options.position}-${options.justify}`;
    const container = (document.querySelector(`#${id}`) || document.createElement('div'));
    container.id = id;
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
    container.style.pointerEvents = 'none';
    (_a = document.body) === null || _a === void 0 ? void 0 : _a.appendChild(container);
    return container;
};
const notify = (message, options = {}) => {
    const _optionsOfType = ToastTypes.getType('type' in options ? options['type'] : 'default');
    const _options = Object.assign(Object.assign({}, _optionsOfType), options);
    const toast = document.createElement('div');
    toast.style.padding = '0.5rem';
    toast.style.margin = '0 1rem';
    toast.style.borderRadius = '3px';
    toast.style.backgroundColor = _options.bgColor;
    toast.style.color = _options.color;
    toast.style.pointerEvents = 'auto';
    const msg = document.createElement('div');
    msg.style.display = 'flex';
    msg.innerHTML = message;
    if (_options.dismissible) {
        toast.addEventListener('click', () => toast === null || toast === void 0 ? void 0 : toast.remove());
    }
    if (_options.closeBtn) {
        const btn = createCloseButton();
        toast.appendChild(btn);
        btn.addEventListener('click', () => toast === null || toast === void 0 ? void 0 : toast.remove());
    }
    toast.appendChild(msg);
    const container = getContainer(_options);
    if (container instanceof HTMLDivElement) {
        container.appendChild(toast);
        container.style.zIndex = _options.zIndex.toString();
        toast.classList.add('toast-animation');
    }
    if (_options.duration) {
        setTimeout(() => toast.remove(), _options.duration);
    }
    return toast;
};
exports.notify = notify;
const createCloseButton = () => {
    const btn = document.createElement('div');
    btn.style.cursor = 'pointer';
    btn.style.background = 'rgba(0,0,0,0.1)';
    btn.style.borderRadius = '3px';
    btn.style.padding = '2px 5px';
    btn.style.marginLeft = '0.5rem';
    btn.style.display = 'flex';
    btn.style.float = 'right';
    btn.style.alignItems = 'center';
    btn.innerHTML = '&#x2715';
    return btn;
};
const info = (message, options = {}) => notify(message, Object.assign(Object.assign({}, options), { type: 'info' }));
exports.info = info;
const warning = (message, options = {}) => notify(message, Object.assign(Object.assign({}, options), { type: 'warning' }));
exports.warning = warning;
const error = (message, options = {}) => notify(message, Object.assign(Object.assign({}, options), { type: 'error' }));
exports.error = error;
const success = (message, options = {}) => notify(message, Object.assign(Object.assign({}, options), { type: 'success' }));
exports.success = success;
