// 增强版叶子动画
function createFloatingLeaf(text) {
    const leaf = document.createElement('div');
    leaf.className = 'keyword-leaf';
    leaf.innerHTML = `
        <img src="https://jameyangzy.github.io/Personalized-Trending-Strategy-Generation-System/images/leaf.png" 
             alt="${text}">
        <span>${text}</span>
    `;
    
    // 动态设置位置和动画参数
    leaf.style.left = `${Math.random() * 85}%`;
    leaf.style.top = `${Math.random() * 85}%`;
    leaf.style.setProperty('--leaf-size', `${Math.random() * 60 + 40}px`);
    leaf.style.animation = `float ${8 + Math.random() * 4}s infinite ease-in-out`;
    
    return leaf;
}

// 增强版推荐系统
function generateRecommendations() {
    const recommendations = [
        {
            name: '故宫博物院',
            image: 'beijing.png',
            desc: '世界现存最大木质结构古建筑群',
            coordinates: [116.3974, 39.9183]
        },
        { name: '故宫', image: 'beijing.png', desc: '明清皇家宫殿' },
        { name: '外滩', image: 'shanghai.png', desc: '上海标志性景观' },
        { name: '小蛮腰', image: 'guangzhou.png', desc: '广州塔夜景' }
    ];

    const container = document.getElementById('recommendations');
    recommendations.forEach(item => {
        const card = document.createElement('div');
        card.className = 'recommend-item';
        card.innerHTML = `
            <img src="https://jameyangzy.github.io/Personalized-Trending-Strategy-Generation-System/images/${item.image}"
                 class="recommend-image"
                 alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.desc}</p>
            <div class="action-buttons">
                <button class="action-btn visited">去过</button>
                <button class="action-btn wish">想去</button>
            </div>
        `;
        
        // 添加地图标记交互
        card.querySelector('.action-btn').addEventListener('click', () => {
            if(!checkLogin()) return;
            new BMap.Marker(new BMap.Point(...item.coordinates))
              .addTo(map);
        });
        
        container.appendChild(card);
    });
}

// 登录状态检查
function checkLogin() {
    if(!sessionStorage.getItem('currentUser')) {
        alert('🍃 请先登录后再操作哦～');
        return false;
    }
    return true;
}

function createLeafElement(text, delay = 0) {
    const leaf = document.createElement('div');
    leaf.className = 'keyword-leaf';
    leaf.innerHTML = `
        <img src="https://jameyangzy.github.io/Personalized-Trending-Strategy-Generation-System/images/leaf.png"
             style="width: ${Math.random() * 60 + 40}px">
        <span>${text}</span>
    `;
    
    leaf.style.left = `${Math.random() * 80}%`;
    leaf.style.top = `${Math.random() * 80}%`;
    leaf.style.animationDelay = `${delay}ms`;
    
    return leaf;
}

// 初始化地理位置
async function initLocations() {
    // 实际应用中应接入地理接口
    const mockData = {
        provinces: ['北京市', '上海市', '广东省'],
        cities: {
            '北京市': ['北京市'],
            '上海市': ['上海市'],
            '广东省': ['广州市', '深圳市']
        },
        districts: {
            '北京市': ['东城区', '西城区'],
            '上海市': ['黄浦区', '徐汇区'],
            '广州市': ['天河区', '越秀区'],
            '深圳市': ['福田区', '南山区']
        }
    };

    const provinceSelect = document.getElementById('province');
    mockData.provinces.forEach(p => {
        const option = new Option(p, p);
        provinceSelect.add(option);
    });

    provinceSelect.addEventListener('change', function() {
        const citySelect = document.getElementById('city');
        citySelect.innerHTML = '';
        mockData.cities[this.value].forEach(c => {
            citySelect.add(new Option(c, c));
        });
        citySelect.dispatchEvent(new Event('change'));
    });

    const citySelect = document.getElementById('city');
    citySelect.addEventListener('change', function() {
        const districtSelect = document.getElementById('district');
        districtSelect.innerHTML = '';
        mockData.districts[this.value].forEach(d => {
            districtSelect.add(new Option(d, d));
        });
    });
}


// 处理用户操作
function handleAction(action) {
    const user = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!user) {
        alert('还没有登陆，请您先登陆哦～');
        return;
    }

    switch(action) {
        case '去过':
            alert('收到🫡，下次不会为您重复推荐');
            break;
        case '想去':
            alert('收到🫡已加入收藏');
            break;
        // 其他操作处理...
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    createInitialLeaves();
    initLocations();
    initRecommendations();
    
    // 初始化百度地图
    const map = new BMap.Map('baidu-map');
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 12);
    map.enableScrollWheelZoom(true);

    // 关键词添加功能
    document.getElementById('add-keyword').addEventListener('click', function() {
        const input = document.getElementById('keyword-input');
        const area = document.getElementById('keywords-area');
        
        if (input.value.trim()) {
            const leaves = area.querySelectorAll('.keyword-leaf');
            if (leaves.length >= 3) {
                area.removeChild(leaves[0]);
            }
            area.appendChild(createLeafElement(input.value.trim()));
            input.value = '';
        }
    });
});
