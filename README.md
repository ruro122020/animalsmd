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


IMPORTANT NOTE: If you want to use GSAP's {useGSAP} plugin, you must install: 

```
npm install @gsap/react
```

The useGSAP hook must be used to avoid any memory leaks and kill lingering animation. 