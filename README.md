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
  - [Tech Stack](#tech-stack)
  - [Start the project](#start-the-project)
  - [Deploy](#deploy)
  - [Test](#test)
  - [Developer Practices](#developer-practices)
    - [Commit](#commit)
    - [CI / CD](#ci--cd)
  - [Folder Structure](#folder-structure)

## Feature List

[top](#fd-tiger-master-admin-documentation)

Functionalities are highlighted

### User

- [x] `Query` users, either upon loading relevant pages or when explicitly searching
- [x] `Create` user
- `Edit` user's `basic info`, `scores`, `notes`, `comments`, `certificates` and `skill`/`working categories` if user is master)
- `Deactivate` and `activate` user

### Order

- `Query` order
- `Create` order
- `Edit` order
- `Assign` master to order
- `Transfer` order to another master
- Add and Edit `Comments` to order
- `Query`

### Chatroom

- Query chatroom messages
- Send messages to chatroom
- Send files, including images to chatroom

### Services

 namely, skills and working categories

- Query services
- Add services
- Edit services  
- Deactivate services
- Batch download
- Batch upload

### Service Level

L1~L3 hierarchy

- Add new nodes (new item in L1~L3)
- Delete L3 node
- Edit node
- Rollback to previous saves

### Broadcast

- Send notification to user
- Query notification history

### Payment ( *to be implemented* )

- Export CSV file for bank transfer

## Tech Stack

[top](#fd-tiger-master-admin-documentation)

- [VueJs](https://vuejs.org/v2/guide/) as framework
- [Vue CLI](https://cli.vuejs.org/) for toolchains such as Babel, webpack
- [Vuex](https://vuex.vuejs.org/zh/guide/) for state management
- [Vue Router](https://router.vuejs.org/zh/) for routing
- [Bootstrap](https://bootstrap-vue.org/) Vue for UI components
- [FontAwesome](https://fontawesome.com/) for icons
- [Sentry.io](https://docs.sentry.io/platforms/javascript/) for error monitoring ( *to be finalized* )
- [Firebase](https://firebase.google.com/docs/hosting) for hosting
- [FD Tiger Master Admin SDK](http://104.154.20.200:8086/fdtigermaster/fdtigermaster-admin-sdk-package) provides FD TigerMaster system APIs

## Start the project

[top](#fd-tiger-master-admin-documentation)

To run the project in local machine, execute

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

## Folder Structure

[top](#fd-tiger-master-admin-documentation)

produces using [Tree-cli](https://github.com/MrRaindrop/tree-cli) package

```shell
├── public
├── README_Resource
├── src
|  ├── assets
|  ├── components
|  |  ├── Badge
|  |  ├── Broadcast
|  |  ├── Card
|  |  ├── Chart
|  |  ├── Chatroom
|  |  ├── Header
|  |  ├── Image
|  |  ├── Modal
|  |  ├── MultiSearch
|  |  ├── Preview
|  |  ├── Sidebar
|  |  └── Table
|  ├── config
|  ├── model
|  |  ├── CaseConverter
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
|        ├── User
|        |  └── UserDetailComponent
|        └── Utility
└── test
```

Some of the more important folders are

- components: contains various [Vue single file components](https://vuejs.org/v2/guide/single-file-components.html)

- views: contains the view pages, such as client page, user detail page, order page, etc.

- router: is where Vue router script locates

- utility: contains firebase script

- model: contains various JS modules, where more complicated logic are encapsulated, and ideally unit test cases exist for each of these modules

- store: Vuex store instance

- config: contains config files such as predefined table fields and order status code map.

- assets: static assets

- test: unit tests
