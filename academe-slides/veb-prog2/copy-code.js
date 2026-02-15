document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('pre.code-block').forEach(pre => {
        const button = document.createElement('button');
        button.className = 'copy-btn';

        // Clipboard SVG icon
        button.innerHTML = `
            <svg viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v16h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 18H8V7h11v16z"/></svg>
        `;

        pre.appendChild(button);

        button.addEventListener('click', () => {
            const code = pre.querySelector('code').innerText;
            navigator.clipboard.writeText(code).then(() => {
                // Change icon to checkmark
                button.innerHTML = `
                    <svg viewBox="0 0 24 24"><path d="M9 16.2l-3.5-3.5 1.41-1.41L9 13.38l7.09-7.09 1.41 1.41z"/></svg>
                `;
                setTimeout(() => {
                    // revert back to clipboard icon
                    button.innerHTML = `
                        <svg viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v16h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 18H8V7h11v16z"/></svg>
                    `;
                }, 1500);
            });
        });
    });
});
