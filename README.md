### 项目根目录

1. **README.md**: 项目说明文件，通常包含项目简介、安装步骤、使用指南等。
2. **LICENSE**: 许可协议文件，定义项目的开源协议。
3. **requirements.txt**: 包含项目所需的 Python 库及其版本，用于环境配置。
4. **manage.py**: Django 项目启动文件，用于执行项目相关的命令。
5. **.gitignore**: 列出需要 Git 忽略的文件或目录（如敏感信息或编译文件）。

### 项目目录

该目录通常包含 Django 项目的设置和入口，建议使用项目名称命名。例如 `trend_strategy_gen/`。

1. **__init__.py**: Python 包初始化文件。
2. **settings.py**: Django 项目的设置文件，包含数据库配置、静态文件设置等。
3. **urls.py**: URL 路由文件，定义项目的 URL 映射。
4. **wsgi.py**: WSGI 配置文件，用于部署项目。
5. **asgi.py**: ASGI 配置文件，用于支持异步操作。
   
### 应用目录

根据功能模块划分应用，每个应用都有其独立的目录结构。例如，`personalization/` 或 `trending/`：

1. **migrations/**: 包含数据库迁移文件，通常使用 `python manage.py makemigrations` 和 `migrate` 自动生成。
2. **__init__.py**: Python 包初始化文件。
3. **models.py**: 定义数据模型，描述数据库表结构。
4. **views.py**: 定义视图函数，处理请求并返回响应。
5. **urls.py**: 应用级的 URL 映射。
6. **admin.py**: 注册模型到 Django admin 后台。
7. **apps.py**: 配置应用程序的名称及属性。
8. **tests.py**: 编写测试用例，确保应用功能正确。
9. **templates/**: HTML 模板文件，定义用户界面的呈现。
10. **static/**: 静态文件目录，用于存储 CSS、JavaScript 和图片等。

### 数据库文件

如果使用数据库迁移文件，也会在根目录下创建 **db.sqlite3**（如果用的是 SQLite）

### 其他配置

1. **.env**: 存储环境变量，如数据库账号密码、API 密钥等信息。应在 `.gitignore` 中忽略。
2. **Dockerfile**: 如果使用 Docker 部署项目，包含构建项目的指令。
3. **docker-compose.yml**: 如果有多个服务，比如数据库、缓存等，用于协调服务之间的关系。

travel_guide_system/
├── manage.py
├── requirements.txt
├── travel_guide_system/          # 项目配置目录
│   ├── __init__.py
│   ├── settings.py               # 全局配置
│   ├── urls.py                   # 全局路由
│   ├── asgi.py
│   └── wsgi.py
├── users/                        # 用户管理应用
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── views.py
│   ├── urls.py
│   └── migrations/
├── recommendations/              # 景点推荐应用
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── views.py
│   ├── urls.py
│   └── migrations/
├── itinerary/                    # 行程规划应用
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── views.py
│   ├── urls.py
│   └── migrations/
├── templates/                    # 全局模板
│   └── base.html
├── static/                       # 静态文件
│   └── css/
│       └── style.css
└── venv/                         # 虚拟环境

