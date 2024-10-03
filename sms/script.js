function generateMessage() {
    const phoneNumber = document.getElementById('phoneNumber').value;
    const packageNumber = document.getElementById('packageNumber').value;
    const courierCompany = document.getElementById('courierCompany').value;
    const proofType = document.getElementById('proofType').value;
    const chatContainer = document.getElementById('chatContainer');
    const chatMessages = document.getElementById('chatMessages');
    const headerPhoneNumber = document.getElementById('headerPhoneNumber');
    
    if (phoneNumber && packageNumber) {
        chatMessages.innerHTML = ''; // 清空之前的消息
        chatContainer.style.display = 'flex';
        headerPhoneNumber.textContent = phoneNumber;
        document.querySelector('.container').style.display = 'none';

        let initialMessage, response;

        if (proofType === '签收证明') {
            initialMessage = `你好${courierCompany}，这边给您送的包裹${packageNumber}是否收到？收到回复【是】谢谢！`;
            const responses = ['已收到', '收到了', '拿到了'];
            response = responses[Math.floor(Math.random() * responses.length)];
        } else {
            initialMessage = `你好${courierCompany}，这边给您送的包裹${packageNumber}收到时是否完好？`;
            response = '包装是好的';
        }

        // 添加日期
        addDateSeparator();

        // 添加快递公司的消息
        addMessage(initialMessage, 'sender');

        // 添加客户的回复
        addMessage(response, 'receiver');

    } else {
        alert('请填写对方手机号和快递包裹号');
    }
}

function addDateSeparator() {
    const chatMessages = document.getElementById('chatMessages');
    const dateElement = document.createElement('div');
    dateElement.classList.add('date-separator');
    const today = new Date();
    const dayNames = ['日', '一', '二', '三', '四', '五', '六'];
    dateElement.textContent = `今天 星期${dayNames[today.getDay()]}`;
    chatMessages.appendChild(dateElement);
}

function addMessage(content, type) {
    const chatMessages = document.getElementById('chatMessages');
    const messageWrapper = document.createElement('div');
    messageWrapper.classList.add('message-wrapper', `${type}-wrapper`);
    
    const avatarElement = document.createElement('div');
    avatarElement.classList.add('avatar', `${type}-avatar`);
    
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', type);
    messageElement.textContent = content;
    
    const timeElement = document.createElement('div');
    timeElement.classList.add('message-time');
    timeElement.textContent = getCurrentTime();
    
    messageWrapper.appendChild(avatarElement);
    messageWrapper.appendChild(messageElement);
    messageWrapper.appendChild(timeElement);
    chatMessages.appendChild(messageWrapper);
}

function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false });
}

// 添加返回按钮功能
document.querySelector('.back-button').addEventListener('click', function() {
    document.getElementById('chatContainer').style.display = 'none';
    document.querySelector('.container').style.display = 'block';
});