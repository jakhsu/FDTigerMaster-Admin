# FD Tiger Master Admin Documentation

This is the web-frontend for fdtigermaster and is intended for internal use only.

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
![VueJs Version](https://img.shields.io/badge/vue-2.2.4-green.svg)
[![pipeline status](http://104.154.20.200:8086/fdtigermaster/fdtigermaster-admin-web/badges/master/pipeline.svg)](http://104.154.20.200:8086/fdtigermaster/fdtigermaster-web/-/commits/master)

- [FD Tiger Master Admin Documentation](#fd-tiger-master-admin-documentation)
  - [Run the project](#run-the-project)
  - [Deploy](#deploy)
  - [Developer Practices](#developer-practices)
    - [Commit](#commit)
    - [CI / CD](#ci--cd)
  - [Folder Structure](#folder-structure)

The project is built using

- VueJs as framework
- Vue CLI for toolchains such as Babel, webpack
- Vuex for state management
- Vue Router for routing
- Bootstrap Vue for UI components
- FontAwesome for icons
- [Sentry.io](https://docs.sentry.io/platforms/javascript/) for error monitoring ( *this is to be finalized* )
- Firebase for hosting

***

## Run the project 

[top](#fd-tiger-master-admin-documentation)

To run the project in local machine, execute

```shell
npm run serve:[env flag]
```

where env flag is the stage which you'd like to serve the website in, the default being local.

The stages and their flags are

- local ( NA, it's the default )
- development ( serve:dev )
- production ( *currently not implemented* )

Please check the scripts in package.json to see more details

***

## Deploy

[top](#fd-tiger-master-admin-documentation)

```shell
npm run deploy:dev
```

run to build static files and deploy to firebase hosting

***

## Developer Practices

[top](#fd-tiger-master-admin-documentation)

### Commit

Use [commitizen](https://github.com/commitizen/cz-cli) and an adaptor plugin  [cz-customizable](https://github.com/leoforfree/cz-customizable) for standardized but flexible commits, refer to `.cz-config.js` file to see detail. Currently, there's no enforced config across team members, though it might be useful in the future. [Docs](http://commitizen.github.io/cz-cli/) for commitizen can also be helpful when tweaking the config.

### CI / CD

Currently, CI / CD practices are limited to running `.gitlab-ci.yml` after each push to the gitlab repo. Refer to `.gitlab-ci.yml` for detailed pipeline scripts.

***

## Folder Structure

[top](#fd-tiger-master-admin-documentation)

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
|  |  ├── Comment
|  |  ├── Forms
|  |  ├── Header
|  |  ├── Image
|  |  ├── Modal
|  |  ├── Note
|  |  ├── OngoingOrder
|  |  ├── Order
|  |  ├── Preview
|  |  ├── Services
|  |  |  ├── Skill
|  |  |  └── WorkingCategory
|  |  ├── Sidebar
|  |  ├── Table
|  |  └── User
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

***
