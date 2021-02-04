# FD Tiger Master Admin Documentation

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Vue](https://img.shields.io/badge/language-vue-41B883.svg)](https://img.shields.io/badge/language-vue-41B883.svg)
[![pipeline status](http://104.154.20.200:8086/fdtigermaster/fdtigermaster-admin-web/badges/master/pipeline.svg)](http://104.154.20.200:8086/fdtigermaster/fdtigermaster-web/-/commits/master)

- [FD Tiger Master Admin Documentation](#fd-tiger-master-admin-documentation)
  - [開發人員專用](#開發人員專用)
    - [Naming Convention](#naming-convention)
      - [Semantic Data Types](#semantic-data-types)
      - [Variables and Functions](#variables-and-functions)
      - [Classes and Components](#classes-and-components)
    - [Commit](#commit)
      - [commit format](#commit-format)
      - [commit type](#commit-type)
      - [Reference for naming convention and style guide](#reference-for-naming-convention-and-style-guide)
  - [使用手冊](#使用手冊)
    - [資訊面板](#資訊面板)
    - [使用者列表](#使用者列表)
    - [用戶詳情](#用戶詳情)
    - [編輯用戶](#編輯用戶)
    - [服務內容](#服務內容)
    - [工項總表](#工項總表)
    - [技能總表](#技能總表)
    - [訂單](#訂單)
    - [進行中訂單](#進行中訂單)
    - [已完成訂單](#已完成訂單)
    - [訂單詳情](#訂單詳情)
      - [符合工項師傅](#符合工項師傅)
      - [施工照片](#施工照片)

***

## 開發人員專用

***

### Naming Convention

```txt
Overall, keep names short and concise, but don't sacrifice readability.
Avoid unnecessary abbreviations, unless it's very well-known, e.g., URL.
```

#### Semantic Data Types

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

#### Variables and Functions

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

#### Classes and Components

Always Use PascalCase

```js
Class Task {}

Class Admin extends User {}

export default {
    name: 'MyComponent.vue'
}

```

***

### Commit

[回到目錄](#table-of-contents)

#### commit format

```txt
commit format:
Header
---a line of space---
Body
```

```txt
Header: <type>(scope): <subject>
- type: commit的類別: feat, fix, docs, style, refractor, etc
- scope: commit影響的範圍，如component、model、page等等，optional
- subject: commit的簡短描述，沒有硬性規定字元數，但是要盡量簡短，不要加句號
```

```txt
Body:
* Body是本次commit的詳細描述，可以分行但是每行不要太長
* 描述變動的項目、原因，並和修改前做對比
```

#### commit type

- feat: 新增修改功能(feature)
- fix: 修bug
- docs: 文件
- style: 格式修改(white-space, formatting, missing semi-colons, etc)
- refractor: 重構
- perf: 效能改進
- test: 增加測試
- chore: tooling, or anything that's not production code
- revert: 撤銷先前的commit，如果不是修改前一次commit，需在body附上revert的commit SHA-1

***

#### Reference for naming convention and style guide

- W3SCHOOL JS style guide:

    <https://www.w3schools.com/js/js_conventions.asp>

- VueJs official style guide:

    <https://vuejs.org/v2/style-guide>

- Zen naming convention:
  - <https://dev.to/somedood/a-grammar-based-naming-convention-13jf>
  - <https://medium.com/better-programming/zen-naming-convention-5314aa0ab67a>

***

## 使用手冊

***

### 資訊面板

[回到目錄](#table-of-contents)

![資料面板](/README_resource/dashboard.PNG)

資訊面板，包含

- 會員數
- 師傅數
- 已媒合案件數

***

### 使用者列表

[回到目錄](#table-of-contents)

![使用者列表](/README_resource/user-table-full.PNG)

包含三種使用者

- 客戶(一般客戶、企業級用戶)
- 師傅
- 管理員(客服、財務、行銷、超級用戶)

進入對應列表，預設會抓取100筆用戶資料，並在上方顯示用戶數以及被停權的數量。

用戶列表提供的功能

- 搜尋用戶
   1. 可用的搜尋條件為列表有列出之欄位，如: 電話、住址、姓名
   2. 搜尋失敗會彈出視窗提醒，並保留搜尋條件以供參考
   3. **清空搜索列** 按鈕會清除已經輸入的搜尋條件，並重新載入一開始顯示的100筆用戶
- 新增用戶
   1. 用彈出視窗讓使用者填入資料
   2. 必填欄位為電話、姓名、Email和角色
      1. 角色是用下拉式選單
   3. 有欄位格式驗證(如Email、電話格式驗證)，但是**目前沒有**辦法驗證電話是否有重複，由於電話是作為登入帳號使用，這邊不能是資料庫已有的電話，否則新增失敗。

- **檢視/修改**用戶詳細資料
   1. 在列表中，點擊用戶的電話(超連結)會將頁面跳轉至該用戶的[詳情](#用戶詳情)

***

### 用戶詳情

[回到目錄](#table-of-contents)

- 基本資料
   1. 包含用戶基本資料
   2. **編輯**按鈕按下跳轉至[編輯用戶頁面](#編輯用戶)
- 相關訂單
   1. 列表顯示與此用戶相關的訂單
   2. 可供搜尋
   3. 訂單編號為超連結
   4. 頁面頂部有列出如: 本日收入、本月收入、平均月收和總收入 (如果此用戶是客戶的話，則是改顯示支出)
- 評分和評論
   1. 頁面頂部顯示此用戶平均評分
   2. 列表顯示此用戶收到過的訂單評分，和相對應的訂單評論
   3. **修改平均分數** 按鈕會彈出視窗，讓使用者對平均分數直接修改，但是必須附上修改理由，會被存到註記
- 註記
  - 目前註記種類
     1. 一般註記
     2. 停權註記
     3. 評分修改註記
  - 列表顯示此用戶收到過的註記，點擊註記會彈出視窗，可以修改或是刪除該註記
  - **新增註記** 按鈕可以新增註記
- 證照 **!!只適用師傅**
  - 列表顯示此師傅的證照，以及證照上傳者、描述、上傳時間
  - 點擊證照彈出視窗顯示原尺寸圖，也提供刪除功能。如要修改已經上傳的證照，得要刪掉重新上傳
  - 另外提供**上傳區**
- 專長 **!!只適用師傅**
  - 技能列表顯示此師傅會的技能，包含編號、技能描述、以及是否為啟用狀態。點擊技能也會在下面顯示該技能對應工項
  - **新增/移除技能** 按鈕會彈出視窗，可以輸入選擇想要加入的技能，並按下**加入**按鈕，視窗內也有標籤形式條列師傅技能，直接將標籤取消就可以刪掉該技能。所有操作結束後必須按下**確認**來進行修改。
  - **不會的工項**區塊則是顯示此師傅不會的工項，用以辨別在師傅會的技能中，有哪些特定的工項是不會的，這邊編輯的機制和技能相同

***

### 編輯用戶

- 顯示格式基本上和用戶詳情中的基本資料相同，但是反輝的欄位不可修改。其餘的欄位，可以直接進行修改，修改完成後按下**完成**，就完成編輯，並跳轉回該用戶[詳情](#用戶詳情)

***

### 服務內容

[回到目錄](#table-of-contents)

此為技能和工項的總資料庫，包含

- 工項總表
- 技能總表

總表共同功能

- 搜尋
- 新增項目
- 下載
  1. 下載列表excel檔案
  2. 下載前會提醒若是要上傳總表，要注意的事項
- 上傳
- 點擊項目編號，皆會有彈出視窗以供修改該項目資料

### 工項總表

列表中**對應技能**欄位，就是代表此工項是屬於於哪個技能的範疇

### 技能總表

直接點擊特定技能列，可以在下方看到該技能對應的工項有哪些

### 訂單

[回到目錄](#table-of-contents)

目前在系統中，訂單的狀態以及對應的code

- 代號: 5 狀態: 訂單建立
- 代號: 10 狀態: 媒合中
- 代號: 15 狀態: 已媒合
- 代號: 20 狀態: 等待支付派遣費
- 代號: 25 狀態: 等待前往現場查看
- 代號: 30 狀態: 等待送出報價單
- 代號: 35 狀態: 等待確認報價單
- 代號: 40 狀態: 等待完工
- 代號: 45 狀態: 等待上傳施工照片
- 代號: 50 狀態: 等待驗收
- 代號: 55 狀態: 等待支付尾款
- 代號: 60 狀態: 已支付尾款
- 代號: 65 狀態: 保固中
- 代號: 90 狀態: 出保
- 代號: 95 狀態: 訂單終止
- 代號: 100 狀態: 訂單結束

### 進行中訂單

- 頁面切分成幾個區塊
  1. 媒合中訂單
      - 狀態包含 媒合中、訂單建立
  2. 施工中訂單
      - 狀態從 已媒合一直到等待支付尾款
  3. 待結帳訂單
      - 狀態從 已支付尾款一直到訂單終止
  4. 特殊訂單
      - 和訂單狀態無關，這邊是放大金額訂單
- 提供搜尋列，選擇想要用的搜尋條件並加入後，即可搜尋
- 可以新增訂單
- 點擊訂單卡片可以跳轉至訂單詳情
  
### 已完成訂單

- 顯示狀態為**訂單結束**的訂單
- 可以新增訂單
- 點擊訂單編號可以跳轉至訂單詳情
- 點擊師傅或是客戶電話，都會跳轉至該用戶

***

### 訂單詳情

[回到目錄](#table-of-contents)

包含

- 基本資料
  1. 提供訂單資料檢視、編輯和關閉訂單(將訂單狀態轉為結束)
  2. 按下編輯，可供編輯的欄位將會反白，編輯完畢後按下**完成編輯**即可
  3. **重新計算價錢** 功能尚在調試中...
- 符合此訂單工項師傅
- 施工照片
- 報價單 **!!NOT IMPLEMENTED YET**

#### 符合工項師傅

- **符合工項列表** 條列和此訂單的工項**符合**的師傅，和一些重要資料
- 其中**師傅距離**是該師傅和施工地點的距離
- 左側 **操作** 欄位提供兩種操作，由系統自行判定哪種適用
  1. 指定，如果此訂單尚未媒合成功，用**指定**功能把單指定給師傅
  2. 轉單，若訂單已經有師傅，後台仍可以用**轉單**將單轉給其他師傅
- **重新配對** 按鈕，則會讓系統重新進行媒合，並再產出一個師傅列表，適用於有新師傅加入、師傅位置改變等等需要重新媒合的情況
- **其他師傅** 列表則是供使用者去搜群其他師傅(也就是工項沒有符合的)，搜出來之後也可以進行 **指定** 或是 **轉單**，讓使用者可以跳過工項限制將訂單給其他師傅，如有必要的話

#### 施工照片

用途仍須再討論...