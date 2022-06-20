const _default = {
    position: 'top',
    justify: 'end',
    bgColor: '#333',
    color: '#fff',
    closeBtn: true,
    duration: 8000,
    zIndex: 99999,
    dismissible: true
};
const ToastTypes = {
    default: _default,
    _types: new Map([
        ['default', { bgColor: '#ddd' }],
        ['info', { bgColor: 'teal' }],
        ['warning', { bgColor: '#fd7e14' }],
        ['error', { bgColor: '#dc3545' }],
        ['success', { bgColor: '#198754' }]
    ]),
    getType(name) {
        return Object.assign(Object.assign({}, ToastTypes.default), (this._types.get(name) || {}));
    },
    setType(name, type) {
        this._types.set(name, Object.assign(Object.assign({}, (this._types.get(name) || {})), type));
    }
};
const getContainer = (options) => {
    var _a;
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
const create = (message, options = {}) => {
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
    msg.innerHTML = message;
    if (_options.dismissible) {
        msg.addEventListener('click', () => { var _a; return (_a = msg === null || msg === void 0 ? void 0 : msg.parentElement) === null || _a === void 0 ? void 0 : _a.remove(); });
    }
    if (_options.closeBtn) {
        const btn = createCloseButton();
        toast.appendChild(btn);
        btn.addEventListener('click', () => { var _a; return (_a = btn === null || btn === void 0 ? void 0 : btn.parentElement) === null || _a === void 0 ? void 0 : _a.remove(); });
    }
    toast.appendChild(msg);
    const container = getContainer(_options);
    if (container instanceof HTMLDivElement) {
        container.appendChild(toast);
        container.style.zIndex = _options.zIndex.toString();
    }
    if (_options.duration) {
        setTimeout(() => toast.remove(), _options.duration);
    }
    return toast;
};
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
const info = (message, options = { type: 'info' }) => create(message, options);
const warning = (message, options = { type: 'warning' }) => create(message, options);
const error = (message, options = { type: 'error' }) => create(message, options);
const success = (message, options = { type: 'success' }) => create(message, options);
export { ToastTypes, create, info, warning, error, success };
