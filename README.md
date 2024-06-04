# AnimalsMD

To get started:

1. clone the repo
2. cd into the directory 
3. Run this command in the ubuntu terminal

```
npm install
npm run dv
```

4. Connect front-end application to api application
Add the following to your vite.config.js file under plugins. Inside the object that is being passed to defineConfig

```
  server: {
      port: 5173,
      proxy: {
        '/api': {
          target: 'http://localhost:5555',
          changeOrigin: true,
          secure:false,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
```
Change the target to the url you api port is running on. 

Now when you make a fetch, add '/api/your-route' to all your routes

# Animating Elements

Running npm install will install all the libraries used in this project. This is more for information purposes. 
I'm using GSAP to animate the elements in this project. [Here](https://gsap.com/docs/v3/Installation/?tab=npm&module=esm&method=private+registry&tier=free&club=false&require=false&trial=true) are instructions on how to install gsap.

IMPORTANT NOTE: If you want to use GSAP's {useGSAP} plugin, you must install: 

```
npm install @gsap/react
```

The useGSAP hook must be used to avoid any memory leaks and kill lingering animation. 

# FORMS

When building forms a config file must be created along with the form component. The config file but have an object with 3 properties:
  1. initialValues
  2. formSchema
  3. field(s)

Example:
```
import * as yup from 'yup';

const formConfig = {

  initialValue: {
    username: '',
    password: ''
  },

  fields: [
    {
      label: 'Username',
      name: 'username',
      type: 'text',
    },
    {
      label: 'Password',
      name: 'password',
      type: 'password',
    }
  ],

  formSchema: yup.object().shape({
    username: yup.string().required('*required'),
    password: yup.string().required('*required')
  })
}

export default formConfig
```