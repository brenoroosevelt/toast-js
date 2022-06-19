class Toast {
    private container: Element | null = null

    add(
        message: string,
        bg: string = '#333',
        color: string = '#fff',
        duration: number = 5000
    ): void {
        this.container = this.container instanceof Element ? this.container : Toast.init()
        this.container?.insertAdjacentHTML(
            'beforeend',
            `<p class="toast" style="background-color: ${bg};color: ${color};animation-duration: ${duration}ms">${message}</p>`
        )
        const toast = this.container?.lastElementChild;
        toast?.addEventListener('animationend', () => toast.remove())
    }

    private static init(): Element | null {
        document.body?.insertAdjacentHTML(
            'afterbegin',
            `<div class="toast-container"></div><style>${Toast.css()}</style>`
        );

        return document.querySelector('.toast-container')
    }

    private static css(): string {
        return `
            .toast-container {
              position: fixed;
              top: 1rem;
              right: 1.5rem;
              display: grid;
              justify-items: end;
              gap: 1.5rem;
            }
            
            .toast {
              font-size: 1.5rem;
              font-weight: bold;
              line-height: 1;
              padding: 0.5em 1em;
              border-radius: 2px;
              background-color: #333;
              color: #fff;
              animation: toastIt 3000ms cubic-bezier(0.785, 0.135, 0.15, 0.86) forwards;
            }
            
            @keyframes toastIt {
              0%,
              100% {
                transform: translateY(-150%);
                opacity: 0;
              }
              10%,
              90% {
                transform: translateY(0);
                opacity: 1;
              }
            }
        `
    }
}

export const toast = new Toast()