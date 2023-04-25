# Summary

- [About](#about)
- [Quick Start](#start)
- [Built using](#built_using)

# About <a id="about"></a>

This project is a WebApp built with NextJs, that simulates a fictional medical clinic appointment management system named AttaMed.

This App comunicates with an API that can be found [here](https://github.com/cbravos5/atta-med-api).

# Quick Start <a id="start"></a>

### Clone the repository:
```bash
git clone https://github.com/cbravos5/atta-med.git
```
or
```bash
git clone git@github.com:cbravos5/hard-skill-frontend-test.git
```

### CD into reposory folder and install the app packages:
```bash
npm install
```
or
```bash
yarn
```

### Set the enviroment variables:

Create a **.env** file according to the example in **.env.example**

## Start the app in development mode:
```bash
npm run dev
```
or
```bash
yarn dev
```

## Usage
The default app URL is http://localhost:3000.

As you go to this URL you will find a login page.

The default user registered in the API is:

```
email: email@attamed.com
senha: attamed123
```

Login and have fun exploring the app :)

## Built using <a id="built_using"></a>

- [NextJs](https://nextjs.org/) - Framework
- [Typescript](https://www.typescriptlang.org/) - Main language
- [Mantine](https://mantine.dev/) - Components Library
- [Zustand](https://github.com/pmndrs/zustand) - State Management Library