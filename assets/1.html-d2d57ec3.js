import{_ as n,p as s,q as a,a1 as e}from"./framework-11e2b124.js";const t={},l=e(`<h1 id="css-选择器" tabindex="-1"><a class="header-anchor" href="#css-选择器" aria-hidden="true">#</a> CSS 选择器</h1><ol><li><p>所有选择器*</p></li><li><p>标签选择器</p></li><li><p>类选择器。将出现的场景分为一组。</p></li><li><p>ID选择器</p></li><li><p>伪类选择器，对元素的不同状态或者不确定存在的元素进行设置</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>article</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">&gt;</span></span>标题<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>aside</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h2</span><span class="token punctuation">&gt;</span></span>副标题<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h2</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>aside</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h2</span><span class="token punctuation">&gt;</span></span>html5-boilerplate<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h2</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>article</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token comment">/*
  CSS 伪类 :only-of-type 代表了任意一个元素，这个元素没有其他相同类型的兄弟元素。
  
  article的直接子元素h2这个元素的相同类型的兄弟元素，这里只有一个
*/</span>
<span class="token selector">article&gt;h2:only-of-type</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>后代选择器</p></li><li><p>子元素选择器，只到儿子辈</p></li><li><p>兄弟选择器</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code> <span class="token comment">/*兄弟元素选择器, h1的兄弟*/</span>
 <span class="token selector">article h1~h2</span> <span class="token punctuation">{</span>
   <span class="token property">color</span><span class="token punctuation">:</span>  yellow<span class="token punctuation">;</span>
 <span class="token punctuation">}</span>

 <span class="token comment">/*兄弟元素选择器, 紧挨着h1的*/</span>
 <span class="token selector">article h1+h2</span> <span class="token punctuation">{</span>
   <span class="token property">color</span><span class="token punctuation">:</span> #7952b3<span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>属性选择器</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token comment">/*属性选择器*/</span>
<span class="token selector">article h1[title]</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #ff5a60 <span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/*属性选择器,title属性以head开头*/</span>
<span class="token selector">article h1[title^=&quot;head&quot;]</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/*属性选择器,title属性以com结尾*/</span>
<span class="token selector">article h1[title$=&quot;com&quot;]</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> green<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/*属性选择器,title属性包含headline*/</span>
<span class="token selector">article h1[title*=&quot;headline&quot;]</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> purple<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/*属性选择器,title属性包含连续的headline*/</span>
<span class="token selector">article h1[title~=&quot;headline&quot;]</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> deeppink<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/*属性选择器,title属性以为headline开始*/</span>
<span class="token selector">article h1[title|=&quot;headline&quot;]</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> darkblue<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li></li></ol>`,2),p=[l];function i(c,o){return s(),a("div",null,p)}const d=n(t,[["render",i],["__file","1.html.vue"]]);export{d as default};
