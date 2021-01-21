# FD Tiger Master Admin Documentation

## Table of Contents

1. [命名規則](#naming-convention)

2. [Commit格式](#commit-message-format)

***

## Naming Convention

### Variable Names

#### For simple variables, use camelCase

```js
let simpleVariable = 3;
```


### Functions and Methods

#### use camelCase style, but try to use descriptive verb as prefix

```js
function getTime() {
    \\Do something to retrieve time
}
```

### Classes and Components( for frameworks like ReactJs and VueJs )

#### Always Use PascalCase

```js
Class Task {...}

export default {
    name: 'MyComponent.vue'
}

```

***

## Commit Message Format

```txt
commit format:
Header
---a line of space---
Body
```

```txt
Header: <type>: <subject>
- type: commit的類別: feat, fix, docs, style, refractor, etc
- subject: commit的簡短描述，沒有硬性規定字元數，但是要盡量簡短，不要加句號
```

```txt
Body:
* Body是本次commit的詳細描述，可以分行但是每行不要太長
* 描述變動的項目、原因，並和修改前做對比
```

### type類型說明:

* feat: 新增修改功能(feature)
* fix: 修bug
* docs: 文件
* style: 格式修改(white-space, formatting, missing semi-colons, etc)
* refractor: 重構
* perf: 效能改進
* test: 增加測試
* chore: tooling, or anything that's not production code
* revert: 撤銷先前的commit，需在body附上revert的commit SHA-1

***

### Reference for naming convention and style guide

* W3SCHOOL JS style guide:

    <https://www.w3schools.com/js/js_conventions.asp>

* VueJs official style guide:

    <https://vuejs.org/v2/style-guide>

