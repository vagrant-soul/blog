---
author: Vagral Soul
pubDatetime: 2024-07-11T13:41:11.464Z
title: 修改记录日志
slug: the-first-post
featured: true
ogImage: https://user-images.githubusercontent.com/53733092/215771435-25408246-2309-4f8b-a781-1f3d93bdf0ec.png
tags:
  - 中文字体
description: 记录一下这个主题主要修改的地方，也参考了网上的大佬的一些内容，搬运了一部分还有自己鼓捣的一些.
---

记录使用 AstroPaper模板的修改

## Table of Contents

## 针对这个主题的相关修改

### 主题颜色的修改
文章参考了[这个主题](https://blog.lkwplus.com/posts/astropaper-blog-customization/),对应的github[源代码](https://github.com/synthpop123/astro-blog/blob/main/src/content/blog/blog-customization.md?plain=1)

根据个人喜好对主题的深色模式中的颜色定义进行了修改，模板文章中也有说明，详见[自定义主题的配色方案](https://wqonline.com/posts/customizing-astropaper-theme-color-schemes/)。相对来说这部分不是特别麻烦，主要是没找到舒服的颜色，这块等以后遇到合适的配色再说吧，

> 相关 CSS 定义于 src/styles/base.css，它的值是一个 CSS 颜色代码。 `--color-fill`作用于背景色，`--color-accent`作用于强调色，

### 调整了主题代码高亮

Astro本身的代码高亮用的是[Shiki](https://shiki.style/guide/dual-themes),跟着文档的说明在网上找的一个感觉还算舒服的主题 `catppuccin-mocha`

```diff
astro.config.ts
- theme: "one-dark-pro",
+ theme: "catppuccin-mocha",

```

### 修改字体

主题默认采用的 IBM Plex Mono 字体对于中文支持不佳，我选择将主字体替换为开源中文字体修改文件是 `tailwind.config.cjs`
```diff
tailwind.config.cjs
  fontFamily: {
    mono: ["IBM Plex Mono", "monospace"],
+   fontfix: ["LXGW WenKai Screen"],
  },
```
相对应的，需要在 `src/styles/base.css` 中将 `font-mono` 替换为 `font-fontfix`

```diff
src/styles/base.css
   body {
-    @apply flex min-h-[100svh] flex-col bg-skin-fill font-mono text-skin-base
-    selection:bg-skin-accent selection:bg-opacity-70 selection:text-skin-inverted;
+    @apply flex min-h-[100svh] flex-col bg-skin-fill font-fontfix text-skin-base 
+    selection:bg-skin-accent selection:bg-opacity-70 selection:text-skin-inverted;
   }
   section,
```
接下来需要引入霞鹜文楷字体的 Stylesheet，为了避免阻塞渲染，可以将 media 设置为 print，在加载完成后再将 media 设置为 all。同时，使用的阿里的npm镜像[可以看这里](https://github.com/CMBill/lxgw-wenkai-screen-web)，相关代码添加到 src/layouts/Layout.astro 中：
同时，把上面文件中引用的google字体换个国内的加速，这里用的是loli.net
```diff
src/layouts/Layout.astro
+    <!-- 用loli.net加速字体样式 -->
     <link
-       href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&display=swap"
+       href="https://fonts.loli.net/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&display=swap"
        rel="stylesheet"
      />

+    <!-- 用cdn加速字体样式，LXGW WenKai Font 霞鹜文楷 -->
+    <link
+      rel="stylesheet"
+      href="https://registry.npmmirror.com/lxgw-wenkai-screen-web/1.321.0/files/style.css"
+      media="print"
+      onload="this.media='all'"
+    />
+
     <meta name="theme-color" content="" />
```
但是通过以上的修改，会存在两个问题：

- 标签展示时，若采用霞鹜文楷字体，会导致显示紊乱；
- 代码框中也会采用霞鹜文楷字体，不符合等宽字体的要求。

对于第一个问题，需要在 src/components/Tag.astro 中将字体强制设定为 IBM Plex Mono：


```diff
diff --git a/src/components/Tag.astro b/src/components/Tag.astro
index 5a4a376..72f65e0 100644
--- a/src/components/Tag.astro
+++ b/src/components/Tag.astro
@@ -31,6 +31,7 @@ const { tag, size = "sm" } = Astro.props;
 <style>
   a {
     @apply relative underline decoration-dashed hover:-top-0.5 hover:text-skin-accent focus-visible:p-1;
+    font-family: "IBM Plex Mono" !important;
   }
   a svg {
     @apply -mr-5 h-6 w-6 scale-95 text-skin-base opacity-80 group-hover:fill-skin-accent;
```
对于第二个问题，在 src/styles/base.css 中，将 pre > code 的字体强制设定为 IBM Plex Mono 即可：
```diff
diff --git a/src/styles/base.css b/src/styles/base.css
index 6efa219..7b4de7a 100644
--- a/src/styles/base.css
+++ b/src/styles/base.css
@@ -122,6 +120,33 @@
   pre > code {
     white-space: pre;
+    font-family: "IBM Plex Mono" !important;
   }
 }
```
### 部分内容中文化

其他一些小修改，主要是尽量把主题中英文显示的部分，替换为中文，这个就不详细记载了，只要找到对应的字段，在对应的位置修改就好

>也有一些还没来及或者修改后，发现功能异常，暂时先不动了。本身这个模板坐着也是好久没更新了，期待后续功能更加完善