// 处理iframe加载
const frame = document.getElementById('chatFrame');
const loadingOverlay = document.getElementById('loadingOverlay');

// 加载状态管理
let isLoading = true;
let loadTimeout;

// iframe加载成功处理
frame.onload = function() {
    isLoading = false;
    clearTimeout(loadTimeout);
    hideLoadingOverlay();
};

// iframe加载失败处理
frame.onerror = function() {
    isLoading = false;
    showErrorMessage();
};

// 隐藏加载遮罩
function hideLoadingOverlay() {
    loadingOverlay.style.opacity = '0';
    setTimeout(() => {
        loadingOverlay.style.display = 'none';
    }, 300);
}

// 显示错误信息
function showErrorMessage() {
    loadingOverlay.innerHTML = `
        <div class="text-center">
            <h3>连接失败</h3>
            <p>无法连接到AI服务器，请检查网络连接</p>
            <button onclick="location.reload()" class="btn btn-primary mt-3">
                <i class="fas fa-sync-alt"></i> 重新加载
            </button>
        </div>
    `;
}

// 显示加载时间过长提示
function showLoadingTimeout() {
    if (isLoading) {
        const timeoutMessage = document.createElement('div');
        timeoutMessage.className = 'text-center mt-3';
        timeoutMessage.innerHTML = `
            <p>加载时间较长，请耐心等待...</p>
            <small class="text-muted">如果一直无法加载，请尝试刷新页面</small>
        `;
        loadingOverlay.appendChild(timeoutMessage);
    }
}

// 设置加载超时提示
loadTimeout = setTimeout(showLoadingTimeout, 5000);

// 添加页面可见性变化监听
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible' && isLoading) {
        location.reload(); // 当页面重新可见且仍在加载时刷新
    }
}); 