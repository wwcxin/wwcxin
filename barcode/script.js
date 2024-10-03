document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('input');
    const generateBtn = document.getElementById('generate');
    const clearBtn = document.getElementById('clear');
    const pasteBtn = document.getElementById('paste');
    const barcodesContainer = document.getElementById('barcodes');

    generateBtn.addEventListener('click', () => {
        const values = input.value.split(/[\n,]+/).filter(v => v.trim() !== '');
        barcodesContainer.innerHTML = '';
        values.forEach(value => {
            const barcodeContainer = document.createElement('div');
            barcodeContainer.className = 'barcode-container';
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            JsBarcode(svg, value.trim(), {
                format: "CODE128",
                width: 2,
                height: 100,
                displayValue: true
            });
            barcodeContainer.appendChild(svg);
            barcodesContainer.appendChild(barcodeContainer);
        });
    });

    clearBtn.addEventListener('click', () => {
        input.value = '';
        barcodesContainer.innerHTML = '';
    });

    pasteBtn.addEventListener('click', async () => {
        try {
            const text = await navigator.clipboard.readText();
            input.value += (input.value ? '\n' : '') + text + '\n';
        } catch (err) {
            console.error('无法读取剪贴板内容: ', err);
            alert('无法读取剪贴板内容。请确保您已授予网站访问剪贴板的权限。');
        }
    });
});