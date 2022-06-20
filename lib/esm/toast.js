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
let initialized = false;
const initialize = () => {
    var _a;
    if (initialized)
        return;
    const style = document.createElement('style');
    style.innerText = [
        '@keyframes toast-animate{from{transform:scaleY(0);opacity:0;}to{transform:scaleY(1);opacity:1;}}',
        '.toast-container{font-family:sans-serif;font-size:1rem;position:fixed;left:0;width:100%;margin:1rem 0;padding:0;display:grid;gap:0.5rem;pointer-events:none}',
        '.toast-element{padding:0.5rem margin:0 1rem;border-radius:3px;pointer-events:auto}',
        '.toast-animation{transform-origin:50% 0;animation: toast-animate .2s linear}',
        '.toast-btn{display:flex;float:right;align-items:center;cursor:pointer;background:rgba(0,0,0,0.1);padding:2px 5px;margin-left:0.5rem;border-radius:3px}',
    ].join('');
    initialized = (_a = document.body) === null || _a === void 0 ? void 0 : _a.insertAdjacentElement('beforebegin', style);
};
const getContainer = (options) => {
    var _a;
    initialize();
    const id = `toast-container-${options.position}-${options.justify}`;
    const container = (document.querySelector(`#${id}`) || document.createElement('div'));
    container.id = id;
    container.classList.add('toast-container');
    container.style[options.position] = '0';
    container.style.justifyItems = options.justify;
    (_a = document.body) === null || _a === void 0 ? void 0 : _a.appendChild(container);
    return container;
};
const notify = (message, options = {}) => {
    const _optionsOfType = ToastTypes.getType('type' in options ? options['type'] : 'default');
    const _options = Object.assign(Object.assign({}, _optionsOfType), options);
    const toast = document.createElement('div');
    toast.classList.add('toast-element');
    toast.style.backgroundColor = _options.bgColor;
    toast.style.color = _options.color;
    const msg = document.createElement('div');
    msg.style.display = 'flex';
    msg.innerHTML = message;
    if (_options.dismissible) {
        toast.addEventListener('click', () => toast === null || toast === void 0 ? void 0 : toast.remove());
    }
    if (_options.closeBtn) {
        const btn = document.createElement('div');
        btn.classList.add('toast-btn');
        btn.innerHTML = '&#x2715';
        toast.appendChild(btn);
        btn.addEventListener('click', () => toast === null || toast === void 0 ? void 0 : toast.remove());
    }
    toast.appendChild(msg);
    const container = getContainer(_options);
    if (container instanceof HTMLDivElement) {
        container.prepend(toast);
        container.style.zIndex = _options.zIndex.toString();
    }
    toast.addEventListener('animationend', () => toast === null || toast === void 0 ? void 0 : toast.classList.remove('toast-animation'));
    toast.classList.add('toast-animation');
    if (_options.duration) {
        setTimeout(() => toast === null || toast === void 0 ? void 0 : toast.remove(), _options.duration);
    }
    return toast;
};
const info = (message, options = {}) => notify(message, Object.assign(Object.assign({}, options), { type: 'info' }));
const warning = (message, options = {}) => notify(message, Object.assign(Object.assign({}, options), { type: 'warning' }));
const error = (message, options = {}) => notify(message, Object.assign(Object.assign({}, options), { type: 'error' }));
const success = (message, options = {}) => notify(message, Object.assign(Object.assign({}, options), { type: 'success' }));
export { ToastTypes, notify, info, warning, error, success };
