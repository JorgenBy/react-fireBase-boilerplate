# ReactJS + Vite + TailwindCSS + TypeScript + Firebase auth + Firebase Functions

This project can be used as a starting point for your next project where you need firebase Auth and some handling of the users.

Lets users "log in". After a user creates an account an Admin needs to approve the account before that user gets access to the private routes on the page.



# Description
**This project is based upon IgorBayerl's project ReactJS + Vite + TailwindCSS + TypeScript + Firebase auth**
https://github.com/IgorBayerl/react-vite-tailwind-firebase-auth-template.git

# Setup

- Clone the project with

```
git clone https://github.com/JorgenBy/react-fireBase-boilerplate.git
```

- Navigate to the directory

```
cd react-fireBase-boilerplate
```

- Install the dependencies with

```
npm i
```

- Configure the .env file with your firebase credentials
- run with

```
npm run dev
```

# Firebase Functions
This project uses a couple of functions so that Admin users can fetch and handle the users.

### Deploy using the production configuration

```
firebase deploy --project your-project-name --only functions --config firebase.prod.json
```

### Deploy using the development configuration

```
firebase deploy --project your-project-name --only functions --config firebase.dev.json
```

# Firebase Hosting

### Deploy using the production configuration

```
firebase deploy --project your-project-name --only hosting:production
```

### Deploy using the development configuration

```
firebase deploy --project your-project-name --only hosting:dev
```

### Links

Good to have links

- https://headlessui.com/react/disclosure
- https://react-icons.github.io/react-icons/search?q=admin
