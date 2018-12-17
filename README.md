# TP5

> TP5 with Vue.js by Antoine Frau

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## Explain how does it work

### src/

`src` folder got 2 main files `App.vue` and `main.js`, they are our main files, `App.vue` is the root file for all the website diferent layout will be push in this `<route-view></route-view>`. `main.js` is our main Vue app, where we configure everything.

Then we have `layouts` a layout is a full page with header, body and footer.
The body of the layout will be fill by `components`.

So the what is a `component` ? a component is a standalone module, which will be reusable everywhere.

In my case I created a `MainContent` coponent where I put other components. Like that I can have a same Layout with `nav` and `footer`, and just can change the mainContent.
Like having a form, or blog (using router).

About the `router` folder it's using vue-router and it's basic.

Finaly `store` able me to add cookie to the website.


## TODO

Actualy finished: 

    - account management fully working with store cookie id for future request to the API.
    - post golden book working

Next steps: 

    - add games page
    - add score board with search engine (autocompletion on name)-> API
    - add user-panel
    - add admin-panel

Note: 

Everyone can play but score will not be saved.

If logged, send the score to the api and could be found on the score board page.