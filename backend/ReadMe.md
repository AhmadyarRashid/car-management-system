# Backend Task

![version](https://img.shields.io/badge/version-1.0.0-blue.svg)

This task has the following feature such as login, signup, CRUD operation of category and car.


### Special thanks go for the owners of these plugins:
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [cors](https://www.npmjs.com/package/cors)
- [express](https://expressjs.com/)
- [express-validator](https://express-validator.github.io/docs/)
- [glob](https://www.npmjs.com/package/glob)
- [JWT](https://jwt.io/)
- [lodash](https://lodash.com/)
- [mongoose](https://mongoosejs.com/docs/)
- [nodemailer](https://nodemailer.com/about/)
- [winston](https://www.npmjs.com/package/winston)
- [winston-daily-rotate-file](https://www.npmjs.com/package/winston-daily-rotate-file)
- [await-to-js](https://www.npmjs.com/package/await-to-js)

We are very excited to share this dashboard with you and we look forward to hearing your feedback!

## Table of Contents

* [Quick Setup](#quick-setup)
* [File Structure](#file-structure)
* [Licensing](#licensing)


## File Structure

Within the download you'll find the following directories and files:

```
backend
.
│
├── .gitignore
├── README.md
├── package.json
├── index.js
├── config
│    ├── constants.js
│    ├── dbConfig.js
│    ├── errors.js
│    ├── express.js
│    ├── routes.js
│    └──  winston.js
├── models  
│    ├── cars.js
│    │── category.js
│    │── login.js
│    └── user.js
└── modules
     ├── car
     │   ├── car.controller.js
     │   ├── car.errors.json
     │   ├── car.middleware.js
     │   └── car.routes.js
     ├── common
     │   ├── common.js
     │   └── error-middleware.js
     └── user
         ├── user.controller.js
         ├── user.errors.json
         ├── user.middleware.js
         └── user.routes.js     
   
```

## Quick Setup
Install the dependencies and devDependencies.

```sh
cd {INSTALLED_REPO}
yarn install
```

Run Project

```sh
yarn start
```

## Licensing

- Copyright 2022 AhmadyarMeo (https://github.com/AhmadyarRashid)
