---
author: Vagral Soul
pubDatetime: 2024-07-18T23:11:41.000+08:00
modDatetime: 
title: 给首页增加一个侧边栏的样式，
slug: add-information-display-on-the-side
featured: false
draft: false
tags:
  - astro
description: 首页增加侧边栏的一个样式的展示
---

今天不一定能写完，添加几个核心的点，详情看这里[144](https://github.com/satnaing/astro-paper/discussions/144)

## Table of contents

##  heading 1


```astro title="/components/FixedSocials.astro"
<div
  class="hidden socials:fixed top-[100px] left-12 socials:flex h-auto w-6 flex-col items-center justify-between gap-3"
>
  <div class="mb-20 -rotate-0 text-lg tracking-widest single-line-text font-extrabold">
    <a
      href={`mailto:youremail@gmail.com`}
      class="link-outline text-3xl hover:text-skin-accent"
    >
    流浪<center>|</center>是灵魂最好的安放
    </a>
  </div>
  <div class="h-28 w-[0.2875rem] bg-skin-inverted"></div>
</div>
```
> 修改部分 
`-rotate-0`
`single-line-text font-extrabold`

`h-28 w-[0.2875rem]`
`hidden`
`socials:flex`