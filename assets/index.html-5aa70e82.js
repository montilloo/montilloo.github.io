import{_ as e,M as t,p,q as i,R as n,t as s,N as l,a1 as o}from"./framework-11e2b124.js";const r={},c=n("h1",{id:"superset部署环境-centos",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#superset部署环境-centos","aria-hidden":"true"},"#"),s(" Superset部署环境(CentOS)")],-1),d=n("h2",{id:"下载miniconda",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#下载miniconda","aria-hidden":"true"},"#"),s(" 下载Miniconda")],-1),u={href:"https://conda.io/en/latest/miniconda.html",target:"_blank",rel:"noopener noreferrer"},v=o(`<h2 id="安装minicoda" tabindex="-1"><a class="header-anchor" href="#安装minicoda" aria-hidden="true">#</a> 安装Minicoda</h2><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>bash Miniconda3-latest-Linux-x86_64<span class="token punctuation">.</span>sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p>在XShell中删除，按住Ctrl 再按Backspace才可以删除。</p></blockquote><p>不想在每次登录Shell时候加载conda环境(如下图) <img src="https://cdn.nlark.com/yuque/0/2023/png/150305/1679578849644-9b0f037f-36cd-4410-bab1-14a9342ae54c.png#averageHue=%230c0a09&amp;clientId=ue50b7e6e-a5dd-4&amp;from=paste&amp;height=419&amp;id=u4c6c497f&amp;name=image.png&amp;originHeight=419&amp;originWidth=916&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;size=37764&amp;status=done&amp;style=none&amp;taskId=ufb1e5fb7-b162-4bf9-ab2d-2b47284c9bc&amp;title=&amp;width=916" alt="image.png"> 可以使用以下命令切换：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>conda config <span class="token operator">--</span><span class="token function">set</span> auto_activate_base false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="创建python-3-7环境" tabindex="-1"><a class="header-anchor" href="#创建python-3-7环境" aria-hidden="true">#</a> 创建Python 3.7环境</h2><h3 id="_1-配置conda国内镜像" tabindex="-1"><a class="header-anchor" href="#_1-配置conda国内镜像" aria-hidden="true">#</a> 1)配置conda国内镜像</h3><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>conda config <span class="token operator">--</span>add channels https:<span class="token operator">/</span><span class="token operator">/</span>mirrors<span class="token punctuation">.</span>tuna<span class="token punctuation">.</span>tsinghua<span class="token punctuation">.</span>edu<span class="token punctuation">.</span>cn/anaconda/pkgs/free

conda config <span class="token operator">--</span>add channels https:<span class="token operator">/</span><span class="token operator">/</span>mirrors<span class="token punctuation">.</span>tuna<span class="token punctuation">.</span>tsinghua<span class="token punctuation">.</span>edu<span class="token punctuation">.</span>cn/anaconda/pkgs/main
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-创建python-3-10-环境" tabindex="-1"><a class="header-anchor" href="#_2-创建python-3-10-环境" aria-hidden="true">#</a> 2)创建Python 3.10 环境</h3><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>conda create <span class="token operator">--</span>name superset pthon=3<span class="token punctuation">.</span>10
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>创建环境： conda create -n env_name python=3.10</p><p>查看所有环境： conda info --envs</p><p>删除一个环境： conda remove -n env_name --all</p><h3 id="_3-激活supserset环境" tabindex="-1"><a class="header-anchor" href="#_3-激活supserset环境" aria-hidden="true">#</a> 3)激活supserset环境</h3><p>conda activate superset</p><p><img src="https://cdn.nlark.com/yuque/0/2023/png/150305/1679579549478-ed122f8a-7ea9-4055-a955-e45359df4618.png#averageHue=%230a0808&amp;clientId=ue50b7e6e-a5dd-4&amp;from=paste&amp;height=401&amp;id=u7c438efb&amp;name=image.png&amp;originHeight=401&amp;originWidth=574&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;size=23090&amp;status=done&amp;style=none&amp;taskId=u653f9748-bc61-4bd0-ac80-ad423e6c29a&amp;title=&amp;width=574" alt="image.png"></p><h3 id="_4-退出当前环境" tabindex="-1"><a class="header-anchor" href="#_4-退出当前环境" aria-hidden="true">#</a> 4)退出当前环境</h3><p>conda deactivate</p><h2 id="_2-superset部署" tabindex="-1"><a class="header-anchor" href="#_2-superset部署" aria-hidden="true">#</a> 2.Superset部署</h2><h3 id="_2-1-安装依赖" tabindex="-1"><a class="header-anchor" href="#_2-1-安装依赖" aria-hidden="true">#</a> 2.1 安装依赖</h3><p>安装superset之前，需要安装以下所需依赖：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>sudo yum install <span class="token operator">-</span>y gcc gcc-c+<span class="token operator">+</span> libffi-devel python-devel python-pip python-wheel python-setuptools openssl-devel cyrus-sasl-devel openldap-devel
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-2安装superset" tabindex="-1"><a class="header-anchor" href="#_2-2安装superset" aria-hidden="true">#</a> 2.2安装superset</h3><p>1）安装（更新）setuptools 和pip</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>pip install <span class="token operator">--</span>upgrade setuptools pip
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>2)安装superset</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>pip install apache-superset
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>3)初始化 Superset数据库</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>superset db upgrade
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>4)创建管理员用户</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token punctuation">(</span>superset<span class="token punctuation">)</span> <span class="token namespace">[root@VM-0-7-centos ~]</span> export FLASK APP=superset

<span class="token punctuation">(</span>superset<span class="token punctuation">)</span> <span class="token namespace">[root@VM-0-7-centos ~]</span> superset fab create-admin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>superset的管理员用户 创建的user admin : nikun first name: ni last name: kun email：nikun2008@126.com password: life@2020</p></blockquote><p>接下来：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># Load some data to play with</span>
superset load_examples

<span class="token comment"># Create default roles and permissions</span>
superset init

<span class="token comment"># Build javascript assets</span>
cd superset-frontend
npm ci
npm run build
cd <span class="token punctuation">.</span><span class="token punctuation">.</span>

<span class="token comment"># To start a development web server on port 8088, use -p to bind to another port</span>
superset run <span class="token operator">-</span>p 8088 <span class="token operator">--</span>with-threads <span class="token operator">--</span>reload <span class="token operator">--</span>debugger
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果一切正常，您应该能够在浏览器中导航到（例如 默认为本地 ），然后使用您创建的用户名和密码登录。<code>hostname:portlocalhost:8088</code></p><h3 id="_2-3-启动superset" tabindex="-1"><a class="header-anchor" href="#_2-3-启动superset" aria-hidden="true">#</a> 2.3 启动Superset</h3><p>1)安装gunicorn</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>pip install gunicorn
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>2)启动superset</p><ol><li>确保当前conda环境为superset</li><li>启动</li></ol><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>gunicorn <span class="token operator">--</span>workers 5 <span class="token operator">--</span>timeout 120 <span class="token operator">--</span>bind hadoop102:8787 <span class="token string">&quot;superset.app:create_app()&quot;</span> <span class="token operator">--</span>daemon
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>--workers: 指定进程个数 --timeout:worker进程超时时间，超时会自动重启 --bind: 绑定本机地址 --daemon: 后台运行</p><h3 id="_2-4superset启停脚本" tabindex="-1"><a class="header-anchor" href="#_2-4superset启停脚本" aria-hidden="true">#</a> 2.4superset启停脚本</h3><p>1)创建superset.sh文件</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>vim superset<span class="token punctuation">.</span>sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>内容如下：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 创建并写入superset.sh文件</span>
 
<span class="token comment">#!/bin/bash</span>
 
superset_status<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    result=\`<span class="token function">ps</span> <span class="token operator">-</span>ef <span class="token punctuation">|</span> awk <span class="token string">&#39;/gunicorn/ &amp;&amp; !/awk/{print $2}&#39;</span> <span class="token punctuation">|</span> wc <span class="token operator">-</span>l\`
    <span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token variable">$result</span> <span class="token operator">-eq</span> 0 <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> then
        <span class="token keyword">return</span> 0
    <span class="token keyword">else</span>
        <span class="token keyword">return</span> 1
    fi
<span class="token punctuation">}</span>
superset_start<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        source ~<span class="token operator">/</span><span class="token punctuation">.</span>bashrc
        superset_status &gt;<span class="token operator">/</span>dev/null 2&gt;&amp;1
        <span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> $? <span class="token operator">-eq</span> 0 <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> then
            conda activate superset <span class="token punctuation">;</span> gunicorn <span class="token operator">--</span>workers 5 <span class="token operator">--</span>timeout 120 <span class="token operator">--</span>bind hadoop102:8787 <span class="token operator">--</span>daemon <span class="token string">&#39;superset.app:create_app()&#39;</span>
        <span class="token keyword">else</span>
            <span class="token function">echo</span> <span class="token string">&quot;superset正在运行&quot;</span>
        fi
 
<span class="token punctuation">}</span>
 
superset_stop<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    superset_status &gt;<span class="token operator">/</span>dev/null 2&gt;&amp;1
    <span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> $? <span class="token operator">-eq</span> 0 <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> then
        <span class="token function">echo</span> <span class="token string">&quot;superset未在运行&quot;</span>
    <span class="token keyword">else</span>
        <span class="token function">ps</span> <span class="token operator">-</span>ef <span class="token punctuation">|</span> awk <span class="token string">&#39;/gunicorn/ &amp;&amp; !/awk/{print $2}&#39;</span> <span class="token punctuation">|</span> xargs <span class="token function">kill</span> <span class="token operator">-</span>9
    fi
<span class="token punctuation">}</span>
 
 
case <span class="token variable">$1</span> in
    <span class="token function">start</span> <span class="token punctuation">)</span>
        <span class="token function">echo</span> <span class="token string">&quot;启动Superset&quot;</span>
        superset_start
    <span class="token punctuation">;</span><span class="token punctuation">;</span>
    stop <span class="token punctuation">)</span>
        <span class="token function">echo</span> <span class="token string">&quot;停止Superset&quot;</span>
        superset_stop
    <span class="token punctuation">;</span><span class="token punctuation">;</span>
    restart <span class="token punctuation">)</span>
        <span class="token function">echo</span> <span class="token string">&quot;重启Superset&quot;</span>
        superset_stop
        superset_start
    <span class="token punctuation">;</span><span class="token punctuation">;</span>
    status <span class="token punctuation">)</span>
        superset_status &gt;<span class="token operator">/</span>dev/null 2&gt;&amp;1
        <span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> $? <span class="token operator">-eq</span> 0 <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> then
            <span class="token function">echo</span> <span class="token string">&quot;superset未在运行&quot;</span>
        <span class="token keyword">else</span>
            <span class="token function">echo</span> <span class="token string">&quot;superset正在运行&quot;</span>
        fi
esac
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,47);function m(h,k){const a=t("ExternalLinkIcon");return p(),i("div",null,[c,d,n("p",null,[s("下载地址："),n("a",u,[s("https://conda.io/en/latest/miniconda.html"),l(a)])]),v])}const g=e(r,[["render",m],["__file","index.html.vue"]]);export{g as default};
