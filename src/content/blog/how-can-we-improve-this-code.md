---
author: Nik
pubDatetime: 2023-09-29T14:49:52.529Z
title: 如何改进这段代码
postSlug: how-to-improve-this-code
featured: false
draft: false
tags:
  - 浏览器渲染
  - 重绘
  - 回流
description: 在DOM频繁更新时优化性能的方法。DOM每次被添加到DOM树中与一次创建多个DOM节点附加到一个新的空白文档片段中，性能会有极大的提升。
---

# 如何改进这段代码

给出以下代码：

```html
<!doctype html>
<html lang="zh-Hans-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>如何改进这段代码-未优化版本</title>
  </head>
  <body>
    <ul id="myList"></ul>

    <script>
      let items = [...Array(50000).keys()].map(i => `Item ${i}`);

      let ul = document.getElementById("myList");

      for (let item of items) {
        let li = document.createElement("li");
        li.textContent = item;
        ul.appendChild(li);
      }
    </script>
  </body>
</html>
```

应该如何优化这段代码呢？
在传统的思维中，当我们有一个向DOM中追加(append)一些DOM节点的需求，最先联想到的API就是:`ParentNode.appendChild`，此API可以将一个节点附加到指定父节点的子节点列表的末尾处，但是如果频繁对DOM进行更新操作(通常是在循环中)，由于每次循环都会插入一个新的节点，会导致浏览器回流（英文：reflow，即重新布局）一次。

> 什么是回流？
>
> 根据生成的渲染树，进行回流(Reflow)，得到节点的几何信息（位置，大小）。回流是布局或者几何属性需要改变就称为回流。回流是影响浏览器性能的关键因素，因为其变化涉及到部分页面（或是整个页面）的布局更新。一个元素的回流可能会导致其所有子元素以及DOM中紧随其后的节点、祖先节点元素的随后的回流。大部分的回流将导致页面的重新渲染。 回流必定会发生重绘，重绘不一定会引发回流。

由于重绘和重排可能代价比较昂贵，因此最好就是可以减少它的发生次数。为了减少发生次数，我们可以合并多次对DOM和样式的修改，然后一次处理掉。

### CSS

- 使用 `transform` 替代 `top`

- 使用 `visibility` 替换 `display: none` ，因为前者只会引起重绘，后者会引发回流（改变了布局

- 避免使用`table`布局，可能很小的一个小改动会造成整个 `table` 的重新布局。

- 尽可能在DOM树的最末端改变class，回流是不可避免的，但可以减少其影响。尽可能在DOM树的最末端改变class，可以限制了回流的范围，使其影响尽可能少的节点。

- 避免设置多层内联样式，CSS 选择符从右往左匹配查找，避免节点层级过多。

```html
<div>
  <a> <span></span> </a>
</div>
<style>
  span {
    color: red;
  }
  div > a > span {
    color: red;
  }
</style>
```

对于第一种设置样式的方式来说，浏览器只需要找到页面中所有的 `span` 标签然后设置颜色，但是对于第二种设置样式的方式来说，浏览器首先需要找到所有的`span` 标签，然后找到 `span` 标签上的 `a` 标签，最后再去找到 `div` 标签，然后给符合这种条件的 `span`
标签设置颜色，这样的递归过程就很复杂。所以我们应该尽可能的避免写过于具体的 `CSS` 选择器，然后对于 HTML 来说也尽量少的添加无意义标签，保证层级扁平。

- 将动画效果应用到position属性为`absolute`或`fixed`的元素上，避免影响其他元素的布局，这样只是一个重绘，而不是回流，同时，控制动画速度可以选择
  `requestAnimationFrame`，详见探讨 `requestAnimationFrame`。

- 避免使用CSS表达式，可能会引发回流。

- 将频繁重绘或者回流的节点设置为图层，图层能够阻止该节点的渲染行为影响别的节点，例如`will-change`、`video`、`iframe`等标签，浏览器会自动将该节点变为图层。

- CSS3 硬件加速（GPU加速），使用css3硬件加速，可以让`transform`、`opacity`、`filters`这些动画不会引起回流重绘
  。但是对于动画的其它属性，比如`background-color`这些，还是会引起回流重绘的，不过它还是可以提升这些动画的性能。

### JavaScript

避免频繁操作样式，最好一次性重写`style`属性，或者将样式列表定义为`class`并一次性更改`class`属性。 避免频繁操作`DOM`，创建一个`documentFragment`，在它上面应用所有`DOM`操作，最后再把它添加到文档中。 避免频繁读取会引发回流/重绘的属性，如果确实需要多次使用，就用一个变量缓存起来。 对具有复杂动画的元素使用绝对定位，使它脱离文档流，否则会引起父元素及后续元素频繁回流。

想了解哪些属性和方法当在 `JavaScript` 中调用时，将触发浏览器同步样式计算和布局。参考[此篇](https://gist.github.com/paulirish/5d52fb081b3570c81e3a)文章。

根据以上关于浏览器渲染性能方面的介绍，考虑一下方式优化这段代码:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>如何改进这段代码-优化版本</title>
  </head>
  <body>
    <ul id="myList"></ul>

    <script>
      let items = [...Array(50000).keys()].map(i => `Item ${i}`);

      let ul = document.getElementById("myList");
      let fragment = document.createDocumentFragment();

      for (let item of items) {
        let li = document.createElement("li");
        li.textContent = item;
        fragment.appendChild(li);
      }

      ul.appendChild(fragment);
    </script>
  </body>
</html>
```

> 关于`DocumentFragments(en-us)`
>
> DocumentFragments (en-US) 是 DOM 节点。它们不是主 DOM 树的一部分。通常的用例是创建文档片段，将元素附加到文档片段，然后将文档片段附加到 DOM 树。在 DOM 树中，文档片段被其所有的子元素所代替。因为文档片段存在于内存中，并不在
> DOM 树中，所以将子元素插入到文档片段时不会引起页面回流（对元素位置和几何上的计算）。因此，使用文档片段通常会带来更好的性能。

参考链接：

- **[MDN DocumentFragment](https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentFragment)**
- **[第 22 题：介绍下重绘和回流（Repaint & Reflow），以及如何进行优化](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/24)**
- **[浏览器的重绘与回流（Repaint、Reflow）](https://github.com/sisterAn/blog/issues/33)**
- **[What forces layout / reflow](https://gist.github.com/paulirish/5d52fb081b3570c81e3a#what-forces-layout--reflow)**
