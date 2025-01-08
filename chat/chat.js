// 处理iframe加载
const frame = document.getElementById('chatFrame');
const loadingOverlay = document.getElementById('loadingOverlay');

frame.onload = function() {
    // iframe加载完成后隐藏加载动画
    loadingOverlay.style.display = 'none';
};

// 如果iframe加载失败
frame.onerror = function() {
    loadingOverlay.innerHTML = `
        <div class="text-center">
            <h3>加载失败</h3>
            <p>请检查网络连接后重试</p>
            <button onclick="location.reload()" class="btn btn-primary">
                重新加载
            </button>
        </div>
    `;
};

// 5秒后如果还没加载完成，显示提示信息
setTimeout(() => {
    if (loadingOverlay.style.display !== 'none') {
        loadingOverlay.innerHTML += `
            <div class="text-center mt-3">
                <p>加载时间较长，请耐心等待...</p>
            </div>
        `;
    }
}, 5000); 