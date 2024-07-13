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

 时间太紧，晚上在详细写一点

## Table of contents

##  标题
settings.json文件需要修改成下面的样子

```json
{
    "editor.inlineSuggest.showToolbar": "always",
    "diffEditor.experimental.showMoves": true,    
    "[markdown]": {
        "editor.formatOnSave": true,
        "editor.renderWhitespace": "all",
        "editor.quickSuggestions": {
            "other": true,
            "comments": true,
            "strings": true
        },
        "editor.acceptSuggestionOnEnter": "on",
    },
    "json.schemas": [
        
    ]
}

```
然后这个代码片段有一点东西要根据自己的实际情况修改
`slug`这个字段要添加，`draft`这个要根据自己的需求改成true或者false