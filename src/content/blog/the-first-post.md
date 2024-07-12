---
author: Sat Naing
pubDatetime: 2024-07-11T13:41:11.464Z
title: 修改记录日志
slug: the-first-post
featured: false
ogImage: https://user-images.githubusercontent.com/53733092/215771435-25408246-2309-4f8b-a781-1f3d93bdf0ec.png
tags:
  - 中文字体
description: 这里是文章的描述，后面想想怎么用ai生成一个.
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


### 中文

In the older version of AstroPaper, when someone search some article, the search criteria keys that will be searched are `title`, `description` and `headings` (heading means all the headings h1 ~ h6 of the blog post). In AstroPaper v2, only `title` and `description` will be searched as the user types.

### 中文12

The following frontmatter properties are renamed.

| Old Names | New Names   |
| --------- | ----------- |
| datetime  | pubDatetime |
| slug      | postSlug    |

### 中文333

If a blog post doesn't have any tag (in other words, frontmatter property `tags` is not specified), the default tag `others` will be used for that blog post. But you can set the default tag in the `/src/content/_schemas.ts` file.

```ts
// src/contents/_schemas.ts
export const blogSchema = z.object({
  // ---
  // replace "others" with whatever you want
  tags: z.array(z.string()).default(["others"]),
  ogImage: z.string().optional(),
  description: z.string(),
});
```

### 中文444

AstroPaper v2 has a new dark color scheme (high contrast & low contrast) which is based on Astro's dark logo. Check out [this link](https://astro-paper.pages.dev/posts/predefined-color-schemes#astro-dark) for more info.

![New Predefined Dark Color Scheme](https://user-images.githubusercontent.com/53733092/215680520-59427bb0-f4cb-48c0-bccc-f182a428d72d.svg)

### 中文555

AstroPaper 2.0 includes automatic class sorting with [TailwindCSS Prettier plugin](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier)

### 中文666

All the [#docs](https://astro-paper.pages.dev/tags/docs/) blog posts and [README](https://github.com/satnaing/astro-paper#readme) are updated for this AstroPaper v2.

## 中文777

- fix broken tags in the Blog Post page
- in a tag page, the last part of the breadcrumb is now updated to lower-case for consistency
- exclude draft posts in a tag page
- fix 'onChange value not updating issue' after a page reload
