---
author: Vagral Soul
pubDatetime: 2024-07-18T14:32:03.000+08:00
modDatetime: 
title: Astrop-aper模板用expressive-code代替默认的代码高亮
slug: replaces-the-expresive-code
featured: false
draft: false
tags:
  - astropaper
description: 用expressive-code插件替换模板自身的代码高亮部分，需要修改的部分文件
---

虽然这个模板作者写了高亮代码的相关样式设置，实际使用了一下，感觉不是很适合自己，所以用Astro自己匹配的代码高亮插件`expressive-code`代替原来的，自己测试了一下，感觉还不错，记录下来

## Table of contents

##  Expressive Code

添加[expressive-code](https://expressive-code.com/key-features/frames/#available-plugin-options)的方法可以去官方的文档里面，写的非常详细，我这里简单记录几个关键的点，

### 安装

```bash
npx astro add astro-expressive-code
```
> 这个代码的字体展示感觉不是很友好，后面有时间需要调整一下


### 修改 astro.config.ts
添加如下文件中的代码部分，其中`catppuccin-mocha`为高亮代码的主题

```ts title="astro.config.ts" ins={6-11}
 export default defineConfig({
  site: SITE.website,
  integrations: [tailwind({
    applyBaseStyles: false
  }), react(), sitemap(), expressiveCode(
    {
      
      // Pass the theme to the `themes` option
      // (consider adding a dark and light theme for accessibility)
      themes: ['catppuccin-mocha'],
    }
  )],
```
> 这个主题本身的高亮代码主题我设置的是相同的`catppuccin-mocha`，没有太多时间去查找这两个对模板的影响，暂时先这样

### fix原模板中关于代码Copy按钮的问题
本来以为直接这样就可以用了，仔细查看发现那个copy的按钮会相互影响，我觉得还是`expressive-code`自带的舒服一点

注释掉相关文件中的代码
```ts title="layouts/PostDetail.astro" ins={1-41}
/** Attaches copy buttons to code blocks in the document,
   * allowing users to copy code easily. */
  // function attachCopyButtons() {
  //   let copyButtonLabel = "Copy";
  //   let codeBlocks = Array.from(document.querySelectorAll("pre"));

  //   for (let codeBlock of codeBlocks) {
  //     let wrapper = document.createElement("div");
  //     wrapper.style.position = "relative";

  //     let copyButton = document.createElement("button");
  //     copyButton.className =
  //       "copy-code absolute right-3 -top-3 rounded bg-skin-card px-2 py-1 text-xs leading-4 text-skin-base font-medium";
  //     copyButton.innerHTML = copyButtonLabel;
  //     codeBlock.setAttribute("tabindex", "0");
  //     codeBlock.appendChild(copyButton);

  //     // wrap codebock with relative parent element
  //     codeBlock?.parentNode?.insertBefore(wrapper, codeBlock);
  //     wrapper.appendChild(codeBlock);

  //     copyButton.addEventListener("click", async () => {
  //       await copyCode(codeBlock, copyButton);
  //     });
  //   }

  //   async function copyCode(block, button) {
  //     let code = block.querySelector("code");
  //     let text = code?.innerText;

  //     await navigator.clipboard.writeText(text ?? "");

  //     // visual feedback that task is completed
  //     button.innerText = "Copied";

  //     setTimeout(() => {
  //       button.innerText = copyButtonLabel;
  //     }, 700);
  //   }
  // }
  // attachCopyButtons();
```

 > 注释掉170-210行关于代码copy部分，这部分与expressive-code相关部分冲突，不知道这种办法能不能行得通，自己测试通过，等后续发现问题再优化

### 下面是展示代码

这部分展示源自官方的那个文档，只为测试效果，没有实际意义

效果一

```js {1, 4, 7-8}
// Line 1 - targeted by line number
// Line 2
// Line 3
// Line 4 - targeted by line number
// Line 5
// Line 6
// Line 7 - targeted by range "7-8"
// Line 8 - targeted by range "7-8"
```

效果二

```js title="line-markers.js" del={2} ins={3-4} {6}
function demo() {
  console.log('this line is marked as deleted')
  // This line and the next one are marked as inserted
  console.log('this is the second inserted line')

  return 'this line uses the neutral default marker type'
}
```

效果三

```jsx {"1":5} del={"2":7-8} ins={"3":10-12}
// labeled-line-markers.jsx
<button
  role="button"
  {...props}
  value={value}
  className={buttonClassName}
  disabled={disabled}
  active={active}
>
  {children &&
    !active &&
    (typeof children === 'string' ? <span>{children}</span> : children)}
</button>
```