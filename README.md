# AnimalsMD

To get started:

1. clone the repo
2. cd into the directory 
3. Run this command in the ubuntu terminal

```
npm install
npm run dv
```

4. Connect application to api application

To connect the application to the flask application.

To go through vite :
1. Go to vit.config.js file
2. Add the following: 

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
    }
```
Change the target to the url you api port is running on. 

Now when you make a fetch, add '/api/your-route' 

To NOT go through vite:
1. Go to the api.jsx file
2. Replace the base url string with yours
The api.jsx file has methods built to make crud fetches. You just need to import them where you need them. 