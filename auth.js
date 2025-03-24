// 使用Supabase进行用户管理（需先创建supabase项目）
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_KEY = 'YOUR_SUPABASE_KEY';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// 登录注册切换
document.getElementById('showRegister').addEventListener('click', () => {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('registerForm').classList.remove('hidden');
});

document.getElementById('showLogin').addEventListener('click', () => {
    document.getElementById('registerForm').classList.add('hidden');
    document.getElementById('loginForm').classList.remove('hidden');
});

// 注册处理
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const { data: lastUser } = await supabase
        .from('users')
        .select('account')
        .order('account', { ascending: false })
        .limit(1);

    const newAccount = String(parseInt(lastUser[0].account) + 1).padStart(6, '0');
    
    const { error } = await supabase
        .from('users')
        .insert([{
            account: newAccount,
            username: document.getElementById('regUsername').value,
            password: document.getElementById('regPassword').value
        }]);

    if (!error) {
        alert(`注册成功！您的账号是：${newAccount}`);
        document.getElementById('loginForm').classList.remove('hidden');
        document.getElementById('registerForm').classList.add('hidden');
    }
});

// 登录处理
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('account', document.getElementById('loginAccount').value)
        .eq('password', document.getElementById('loginPassword').value);

    if (data.length > 0) {
        sessionStorage.setItem('currentUser', JSON.stringify(data[0]));
        window.location.href = 'index.html';
    } else {
        alert('账号或密码错误！');
    }
});
