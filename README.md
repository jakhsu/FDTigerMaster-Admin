# FD Tiger Master Admin Documentation

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![VueJs Version](https://img.shields.io/badge/vue-2.2.4-green.svg)](https://vuejs.org/v2/guide/)
[![pipeline status](http://104.154.20.200:8086/fdtigermaster/fdtigermaster-admin-web/badges/master/pipeline.svg)](http://104.154.20.200:8086/fdtigermaster/fdtigermaster-web/-/commits/master)

This project is a Vue-based admin for users to interact with the FD tigermaster system.

- [FD Tiger Master Admin Documentation](#fd-tiger-master-admin-documentation)
  - [Feature List](#feature-list)
    - [User](#user)
    - [Order](#order)
    - [Chatroom](#chatroom)
    - [Services](#services)
    - [Service Level](#service-level)
    - [Broadcast](#broadcast)
    - [Payment ( *to be implemented* )](#payment--to-be-implemented-)
    - [Real-Time Voice ( *to be implemented* )](#real-time-voice--to-be-implemented-)
  - [Tech Stack](#tech-stack)
  - [Start the project](#start-the-project)
  - [Deploy](#deploy)
  - [Test](#test)
  - [Developer Practices](#developer-practices)
    - [Commit](#commit)
    - [CI / CD](#ci--cd)
    - [Error Monitoring](#error-monitoring)
  - [Folder Structure](#folder-structure)
  - [Reference and Misc](#reference-and-misc)
    - [Why use Vue 2.x instead of Vue 3 and what about migration to 3](#why-use-vue-2x-instead-of-vue-3-and-what-about-migration-to-3)
    - [How to use tree cli](#how-to-use-tree-cli)

## Feature List

[top](#fd-tiger-master-admin-documentation)

Some key words are `highlighted` to emphasize functionality or important properties. For example, `query` and `edit` are both important functionalities to perform to `user`. Another example would be `comments`, which represents comments master and client leave for each other after an `order` is finished.

### User

- `Query` users
- `Create` user
- `Edit` user's `basic info`, `scores`, `notes`, `comments`, `certificates` and `skill`/`working categories` if user is master)
- `Deactivate` and `activate` user

### Order

- `Query` order, all relevant information and histories
- `Create` order
- `Edit` order
- `Assign` master to order
- `Transfer` order to another master
- Add and Edit `Comments` to order
- `Upload` and `Edit` order images
- Manage order `quotation`
- Add and Edit order `comment`
- Manage `eligible` / `other` masters to the order, eligibility is currently determined by masters' skill sets
- Run `calculations` to get `payment` for client and master, based on various `multipliers` and `bonuses` unique to that order, which are also `editable`
- Manage all `chatroom` entities created by the system. Please reference [chatroom feature](#chatroom)
  
### Chatroom

- `shadow query`, which queries messages of chatroom without marking messages as read
- `query`, similar to shadow query, but affect messages' read status
- `send` text, image and file to chatrooms  

### Services

> services refer to master skills and master working categories

A skill object looks like

```js
{
  active: 1,
  createBy: "2021032500001",
  createDate: "2021-04-08 17:05:18",
  description: "描述",
  id: "TM-A010000",
  name: "家電"
}
```

And a working category might look like

```js
{
  active: 1,
  commercialWarrantyDay: 7,
  consumerWarrantyDay: 31,
  createBy: "2021032500001",
  createDate: "2021-04-08 17:05:50",
  description: "描述"
  ...
  name: "洗衣機故障",
  // This property shows which skill this particular working category belongs to
  skillItemId: "TM-A020000"
}
```

- `Query` services
- `Add` services
- `Edit` services  
- `Deactivate` services
- `Batch` download
- `Batch` upload

### Service Level

> service level refers to the hierarchy relationship of all services tigermaster provides, from clients' perspective

```js
{
  // This is L1 level
  "水電服務": {
  "name": "水電服務",
  "desc": "這是水電服務包括...",
  "imagePath": "https://...",
  // This is L2 level
  "L2": {
  "通水管馬桶": {
  "name": "通水管馬桶",
  "desc": "這是通水管馬桶包括...",
  "imagePath": "https://...",
  // This property contains corresponding L3 items
  "L3": ["TM-P010101", "TM-P010201", "TM-P010301"]
  },
  // 水電服務 > 通水管馬桶 > "TM-P010101"
  ...
  "插座/開關/配電":{
    ...
  }
}
```

- `Add` new nodes (new item in L1~L3)
- `Delete` L3 node
- `Edit` node
- `Rollback` to previous saves

### Broadcast

- `Send` notification to user
- `Query` notification history

### Payment ( *to be implemented* )

- `Export` CSV file for bank transfer

### Real-Time Voice ( *to be implemented* )

- `Call` and `Receive` voice calls

## Tech Stack

[top](#fd-tiger-master-admin-documentation)

- [VueJs](https://vuejs.org/v2/guide/) as framework
  - [why use Vue2 and not 3](#why-use-vue-2x-instead-of-vue-3-and-what-about-migration-to-3)

- [Vue CLI](https://cli.vuejs.org/) for toolchains such as Babel, webpack
- [Vuex](https://vuex.vuejs.org/zh/guide/) for state management
- [Vue Router](https://router.vuejs.org/zh/) for routing
- [Bootstrap Vue](https://bootstrap-vue.org/) for UI components
- [FontAwesome](https://fontawesome.com/) for icons
- [Sentry.io](https://docs.sentry.io/platforms/javascript/) for out-of-box error monitoring
- [Firebase](https://firebase.google.com/docs/hosting) for hosting
- [FD Tiger Master Admin SDK](http://104.154.20.200:8086/fdtigermaster/fdtigermaster-admin-sdk-package) provides FD TigerMaster system APIs

## Start the project

[top](#fd-tiger-master-admin-documentation)

To run the project on local machine, execute

```shell
# For local environment
npm run serve

# For development stage --> cloud server
npm run serve:dev
```

The stages

- local
- development
- production ( *currently not implemented* )

Please check the scripts in package.json to see more details

## Deploy

[top](#fd-tiger-master-admin-documentation)

```shell
npm run deploy:dev
```

run to build static files and deploy to firebase hosting

## Test

[top](#fd-tiger-master-admin-documentation)

```shell
npm run test
```

run unit tests, located in `/test` folder

## Developer Practices

[top](#fd-tiger-master-admin-documentation)

### Commit

Use [commitizen](https://github.com/commitizen/cz-cli) and an adaptor plugin  [cz-customizable](https://github.com/leoforfree/cz-customizable) for standardized but flexible commits, refer to `.cz-config.js` file to see detail. Currently, there's no enforced config across team members, though it might be useful in the future. [Docs](http://commitizen.github.io/cz-cli/) for commitizen can also be helpful when tweaking the config.

### CI / CD

Currently, CI / CD practices are limited to running `.gitlab-ci.yml` after each push to the gitlab repo. Refer to `.gitlab-ci.yml` for detailed pipeline scripts.

### Error Monitoring

Although this can be implemented from scratch, I've decided to adopt [Sentry.io](https://sentry.io/welcome/) for its ease-of-use and great UI. Since this project will likely be maintained by one person, the free price tier should suffice. For installation guide, see [here](https://docs.sentry.io/platforms/javascript/)

## Folder Structure

[top](#fd-tiger-master-admin-documentation)

produced using [Tree-cli](https://github.com/MrRaindrop/tree-cli) package

```txt
├── public
├── README_Resource
├── src
|  ├── assets
|  ├── components
|  |  ├── Badge
|  |  ├── Broadcast
|  |  ├── Card
|  |  ├── Chatroom
|  |  ├── Header
|  |  ├── Image
|  |  ├── Modal
|  |  |  ├── Order
|  |  |  ├── Service
|  |  |  ├── User
|  |  |  └── Util
|  |  ├── MultiSearch
|  |  ├── Preview
|  |  ├── Sidebar
|  |  └── Table
|  ├── config
|  ├── model
|  |  ├── CaseConverter
|  |  ├── Date
|  |  ├── FetchAddress
|  |  ├── Mapping
|  |  ├── QueryBuilder
|  |  ├── Regex
|  |  └── Validator
|  ├── router
|  ├── store
|  ├── utility
|  └── views
|     ├── Auth
|     ├── Error
|     └── Home
|        ├── Broadcast
|        ├── Order
|        |  └── OrderDetailComponent
|        ├── Services
|        └── User
|           └── UserDetailComponent
└── test
```

Some of the more important folders are

- `components`: contains various [Vue single file components](https://vuejs.org/v2/guide/single-file-components.html)

- `views`: contains the view pages, such as client page, user detail page, order page, etc.

- `router`: is where Vue router script locates

- `utility`: contains firebase script

- `model`: contains various JS modules, where more complicated logic are encapsulated, and ideally unit test cases exist for each of these modules

- `store`: Vuex store

- `config`: contains config files such as predefined table fields and order status code map.

- `assets`: static assets

- `test`: unit tests

## Reference and Misc

[top](#fd-tiger-master-admin-documentation)

### Why use Vue 2.x instead of Vue 3 and what about migration to 3

```txt
Initially because BootstrapVue didn't support Vue 3 when we started the project. Migration to Vue 3 isn't a priority since Vue 2.x ecosystem is rich enough to support the project. Though developer should be aware that Vue 2.x is still supported and the Vue core team is planning to backport Vue3-like syntax and composition API. 
```

- [PR that migrate Vue to TypeScript](https://github.com/vuejs/vue/pull/12001)
- [RFC](https://github.com/vuejs/rfcs/blob/ie11/active-rfcs/0000-vue3-ie11-support.md#for-those-who-absolutely-need-ie11-support)
- [Author explains](https://www.zhihu.com/question/46397274/answer/101193678)

### How to use tree cli

In terminal run

```shell
npm run tree
```
