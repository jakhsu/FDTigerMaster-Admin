# FD Tiger Master Admin Documentation

## Table of Contents

* [開發人員](#for-developers)
  
  1. [命名規則](#naming-convention)
     1. [資料型態](#semantic-data-types)
     2. [變數、函數](#variables-and-functions)

  2. [commit](#commit)
     1. [commit 格式](#commit-format)
     2. [commit 類型](#commit-type)

* [使用者](#for-users)

***

## For Developers

## Naming Convention

```txt
Overall, keep names short and concise, but don't sacrifice readability.
Avoid unnecessary abbreviations, unless it's very well-known, e.g., URL.
```

### Semantic Data Types

In most cases, numbers, strings, and individual objects use singular noun

```js
let profileData = {
    name: "Jack",
    job: "rookie programmer"
}

let hypotenuse = Math.sqrt(a**2 + b**2)
```

for booleans, add **is** prefix

Array and Collection-like data, such as `Map` and `Set`, use plural noun.

```js
let programmers = ["Jack", "Jill", "James"]

let herdOfProgrammers = ["Gilfoyle", "Dinesh", "Richard"]
```

```js
let isAuthenticated = false
```

### Variables and Functions

for variables, try to be **declarative** and use **camelCase**

```js
let userIsAuthenticated
```

and for constants, use **SCREAMING_SNAKE_CASE**

```js
const HOURS_IN_A_DAY = 24
```

for functions, be **imperative** and use **camelCase**

```js
let getUserName () => {}
```

try to work with a set of prefixes for functions

```js
let isUserActive() => {} --> let determineIsUserActive => {}
let canLoadItem() => {} -> let determineCanLoadItem => {}

let makeFormattedDate() {} --> let prepareFormattedDate => {}
let sortActiveUsers() {} --> let prepareSortedActiveUsers => {}
```

### Classes and Components( for frameworks like ReactJs and VueJs )

Always Use PascalCase

```js
Class Task {}

Class Admin extends User {}

export default {
    name: 'MyComponent.vue'
}

```

***

## Commit

### commit format

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

### commit type

* feat: 新增修改功能(feature)
* fix: 修bug
* docs: 文件
* style: 格式修改(white-space, formatting, missing semi-colons, etc)
* refractor: 重構
* perf: 效能改進
* test: 增加測試
* chore: tooling, or anything that's not production code
* revert: 撤銷先前的commit，如果不是修改前一次commit，需在body附上revert的commit SHA-1

***

### Reference for naming convention and style guide

* W3SCHOOL JS style guide:

    <https://www.w3schools.com/js/js_conventions.asp>

* VueJs official style guide:

    <https://vuejs.org/v2/style-guide>

* Zen naming convention:
  * <https://dev.to/somedood/a-grammar-based-naming-convention-13jf>
  * <https://medium.com/better-programming/zen-naming-convention-5314aa0ab67a>

***

## For Users
