---
author: Vagral Soul
pubDatetime: 2024-07-13T14:32:03.000+08:00
modDatetime: 2024-07-13T14:40:03.000
title: 使用模板提供的代码片段在Marscode里面应用
slug: add-post-auto
featured: false
draft: false
tags:
  - astro
  - Marscode
  - 代码片段
description: 使用模板提供的代码片段在Marscode里面应用
---

 今天闲来无事，又研究了一下这个模版，感觉在发布新文章的时候需要写许多的frontmatter,尤其是时间这些，感觉有点麻烦，翻看issue的时候，终于发现原来这个模版自带一个便捷的小代码，采用的是代码片段的形式，抓紧时间体验了一下。
 中间由于对vxcode了解的不是很深刻，总是不成功，网上也查找了一下，发现针对markdown的代码片段还需要单独设置一下`setting.json`文件，vxcode测试成功，但是我目前在玩豆包的那个marscode，按照思路也测试成功了，记录一下主要的代码

## Table of contents

##  标题

settings.json文件需要修改成下面的样子

```diff
 {
     "editor.inlineSuggest.showToolbar": "always",
     "diffEditor.experimental.showMoves": true,    
+    "[markdown]": {
+        "editor.formatOnSave": true,
+       "editor.renderWhitespace": "all",
+        "editor.quickSuggestions": {
+            "other": true,
+            "comments": true,
+            "strings": true
+        },
+        "editor.acceptSuggestionOnEnter": "on",
+    },
+    "json.schemas": [
+        
+    ]
}

```
然后这个代码片段有一点东西要根据自己的实际情况修改
`slug`这个字段要添加，`draft`这个要根据自己的需求改成true或者false