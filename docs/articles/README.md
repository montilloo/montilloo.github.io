# Superset部署环境(CentOS)

## 下载Miniconda

下载地址：[https://conda.io/en/latest/miniconda.html](https://conda.io/en/latest/miniconda.html)

## 安装Minicoda

```powershell
bash Miniconda3-latest-Linux-x86_64.sh
```

> 在XShell中删除，按住Ctrl 再按Backspace才可以删除。

不想在每次登录Shell时候加载conda环境(如下图)
![image.png](https://cdn.nlark.com/yuque/0/2023/png/150305/1679578849644-9b0f037f-36cd-4410-bab1-14a9342ae54c.png#averageHue=%230c0a09&clientId=ue50b7e6e-a5dd-4&from=paste&height=419&id=u4c6c497f&name=image.png&originHeight=419&originWidth=916&originalType=binary&ratio=1&rotation=0&showTitle=false&size=37764&status=done&style=none&taskId=ufb1e5fb7-b162-4bf9-ab2d-2b47284c9bc&title=&width=916)
可以使用以下命令切换：

```powershell
conda config --set auto_activate_base false
```

## 创建Python 3.7环境

### 1)配置conda国内镜像

```powershell
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free

conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main
```

### 2)创建Python 3.10 环境

```powershell
conda create --name superset pthon=3.10
```

创建环境： conda create -n env_name python=3.10

查看所有环境： conda info --envs

删除一个环境： conda remove -n env_name --all

### 3)激活supserset环境

conda activate superset

![image.png](https://cdn.nlark.com/yuque/0/2023/png/150305/1679579549478-ed122f8a-7ea9-4055-a955-e45359df4618.png#averageHue=%230a0808&clientId=ue50b7e6e-a5dd-4&from=paste&height=401&id=u7c438efb&name=image.png&originHeight=401&originWidth=574&originalType=binary&ratio=1&rotation=0&showTitle=false&size=23090&status=done&style=none&taskId=u653f9748-bc61-4bd0-ac80-ad423e6c29a&title=&width=574)

### 4)退出当前环境

conda deactivate

## 2.Superset部署

### 2.1 安装依赖

安装superset之前，需要安装以下所需依赖：

```powershell
sudo yum install -y gcc gcc-c++ libffi-devel python-devel python-pip python-wheel python-setuptools openssl-devel cyrus-sasl-devel openldap-devel
```

### 2.2安装superset

1）安装（更新）setuptools 和pip

```powershell
pip install --upgrade setuptools pip
```

2)安装superset

```powershell
pip install apache-superset
```

3)初始化 Superset数据库

```powershell
superset db upgrade
```

4)创建管理员用户

```powershell
(superset) [root@VM-0-7-centos ~] export FLASK APP=superset

(superset) [root@VM-0-7-centos ~] superset fab create-admin
```

> superset的管理员用户
创建的user admin : nikun
> first name: ni
> last name: kun
> email：nikun2008@126.com
> password: life@2020

接下来：

```powershell
# Load some data to play with
superset load_examples

# Create default roles and permissions
superset init

# Build javascript assets
cd superset-frontend
npm ci
npm run build
cd ..

# To start a development web server on port 8088, use -p to bind to another port
superset run -p 8088 --with-threads --reload --debugger
```

如果一切正常，您应该能够在浏览器中导航到（例如 默认为本地 ），然后使用您创建的用户名和密码登录。`hostname:portlocalhost:8088`

### 2.3 启动Superset

1)安装gunicorn

```powershell
pip install gunicorn
```

2)启动superset

1. 确保当前conda环境为superset
2. 启动

```powershell
gunicorn --workers 5 --timeout 120 --bind hadoop102:8787 "superset.app:create_app()" --daemon
```

--workers: 指定进程个数
--timeout:worker进程超时时间，超时会自动重启
--bind: 绑定本机地址
--daemon: 后台运行

### 2.4superset启停脚本

1)创建superset.sh文件

```powershell
vim superset.sh
```

内容如下：

```powershell
# 创建并写入superset.sh文件
 
#!/bin/bash
 
superset_status(){
    result=`ps -ef | awk '/gunicorn/ && !/awk/{print $2}' | wc -l`
    if [[ $result -eq 0 ]]; then
        return 0
    else
        return 1
    fi
}
superset_start(){
        source ~/.bashrc
        superset_status >/dev/null 2>&1
        if [[ $? -eq 0 ]]; then
            conda activate superset ; gunicorn --workers 5 --timeout 120 --bind hadoop102:8787 --daemon 'superset.app:create_app()'
        else
            echo "superset正在运行"
        fi
 
}
 
superset_stop(){
    superset_status >/dev/null 2>&1
    if [[ $? -eq 0 ]]; then
        echo "superset未在运行"
    else
        ps -ef | awk '/gunicorn/ && !/awk/{print $2}' | xargs kill -9
    fi
}
 
 
case $1 in
    start )
        echo "启动Superset"
        superset_start
    ;;
    stop )
        echo "停止Superset"
        superset_stop
    ;;
    restart )
        echo "重启Superset"
        superset_stop
        superset_start
    ;;
    status )
        superset_status >/dev/null 2>&1
        if [[ $? -eq 0 ]]; then
            echo "superset未在运行"
        else
            echo "superset正在运行"
        fi
esac
```
