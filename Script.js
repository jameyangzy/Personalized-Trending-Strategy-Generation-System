// 初始化叶子动画
function createInitialLeaves() {
    const area = document.getElementById('keywords-area');
    for (let i = 0; i < 3; i++) {
        const leaf = document.createElement('img');
        leaf.src = 'https://jameyangzy.github.io/Personalized-Trending-Strategy-Generation-System/images/leaf.png';
        leaf.className = 'keyword-leaf';
        leaf.style.width = `${Math.random() * 50 + 30}px`;
        leaf.style.left = `${Math.random() * 80}%`;
        leaf.style.top = `${Math.random() * 80}%`;
        area.appendChild(leaf);
    }
}

// 初始化省份选择
async function initLocations() {
    // 这里需要接入实际的地理数据接口
    const provinces = ['北京', '上海', '广东', '江苏', '浙江'];
    const provinceSelect = document.getElementById('province');
    provinces.forEach(p => {
        const option = document.createElement('option');
        option.value = p;
        option.textContent = p;
        provinceSelect.appendChild(option);
    });
}

// 按钮交互处理
document.querySelectorAll('.action-button').forEach(button => {
    button.addEventListener('click', function() {
        this.classList.toggle('active');
    });
});

// 关键词添加功能
document.getElementById('add-keyword').addEventListener('click', function() {
    const input = document.getElementById('keyword-input');
    const area = document.getElementById('keywords-area');
    
    if (input.value.trim()) {
        const leaves = area.querySelectorAll('.keyword-leaf');
        const newLeaf = document.createElement('div');
        newLeaf.className = 'keyword-leaf';
        newLeaf.innerHTML = `
            <img src="https://jameyangzy.github.io/Personalized-Trending-Strategy-Generation-System/images/leaf.png"
                 style="width: ${Math.random() * 50 + 30}px">
            <span>${input.value}</span>
        `;
        
        if (leaves.length >= 3) {
            area.removeChild(leaves[0]);
        }
        area.appendChild(newLeaf);
        input.value = '';
    }
});

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    createInitialLeaves();
    initLocations();
    
    // 百度地图初始化
    const map = new BMap.Map('baidu-map');
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 12);
    map.enableScrollWheelZoom(true);
});
