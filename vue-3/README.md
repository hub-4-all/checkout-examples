# Vue 3 with Webpack

This is a simple example about how to use Hub4All Checkout MF in a Vue 3 (Webpack) application.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## Webpack Configurations
First of all, it is necessary to configurate the webpack to initialize module federation. We do that using the [ModuleFederationPlugin](https://webpack.js.org/plugins/module-federation-plugin).

```javascript
// In the vue.config.js file add the following configurations
configureWebpack: {
    plugins: [
      new ModuleFederationPlugin({
        name: 'home',
        filename: 'remoteEntry.js',
        remotes: {
          checkout: 'https://checkout.hub4all.io/remoteEntry.js',
        },
        // Our MF is exposed as a Module and not as a Script
        remoteType: 'module',
        shared: {
          react: {
            eager: true,
            singleton: true,
          },
          'react-dom': {
            eager: true,
            singleton: true,
          },
        },
      }),
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
      }),
    ],
    // So, because we the MF is exposed as module, it is necessary to configurate your environment to work as module to.
    experiments: {
      outputModule: true,
    },
    output: {
      library: {
        type: 'module',
      },
      environment: {
        module: true,
      },
    },
}
```

### Troubleshooting

### <mark>Uncaught SyntaxError: Cannot use import statement outside a module</mark>
This error happen when your main javascript file is imported as a script, but it should be a module.
In this case, it is necessary to configurate the Webpack to inject the chunk or script as a module by adding the following code:

```javascript
// In the vue.config.js file add the following configurations
chainWebpack: (config) => {
    config
      .plugin('html')
      .tap((args) => {
        args[0].scriptLoading = 'module';
        return args;
    });
}
```

## Using the checkout component
If you are using ***Typescript*** the first step is to add the module declaration, it can be done by adding <mark>declare module 'checkout/Checkout'</mark> inside **./src/shims-vue.d.ts** or adding a new file **./src/*.d.ts**.

```javascript
//./src/shims-vue.d.ts

/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'checkout/Checkout';
```

The second step is to import the checkout component inside your Vue component. In this case, we are using the library [Veaury](https://github.com/devilwjp/veaury) that enable us to use a React component in a Vue application.

```javascript
<template>
  <div v-once>
    <Checkout token="token" :onError="onError" lang='pt'/>
  </div>
</template>

<script lang="ts" type="module">
    import { defineComponent } from 'vue';
    import { lazyPureReactInVue } from 'veaury';

    export default defineComponent({
        name: 'App',
        components: {
            Checkout: lazyPureReactInVue(() => import('checkout/Checkout')),
        },
        setup() {
            return {
                token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJPcmdhbml6YXRpb25VVUlEIjoiYzBlYjc1ZTctOGU4Ny00ODZlLTg4ZTUtZGIyZjIyMWZjYjgwIiwiYWNjb3VudFVVSUQiOiI5ODBiMTYzNi1jMzQ3LTQxNTctYmI1OS03MGZjMGJkMTkzZTgiLCJ1bmlxdWVJZGVudGlmaWVyIjoibHVjYXMtMDA3IiwicGF5bWVudFByb2R1Y3RzIjpbXSwiZGVzY3JpcHRpb24iOiJQYWdhbWVudG8gZGUgdW0gZXhlbXBsbyBkYSBkZW1vIGRlIDIwLTExIiwiY3VycmVuY3kiOiJFVVIiLCJhbW91bnQiOjExMTM3LCJpYXQiOjE3MDU0MTIyODF9.dGPUkOxyD8jlWKrt4P-roYgoagcsjD3LA6MY6FEX12uYFvfgU0hJggAQEm6939tmTMyE23z2-kbax18MnZ65ce2foRkW5gmwcN8B-yjBwaxVW4pqRO5Emob3gcyNOvkFzO-JWq-fTZkOYdMZ4GEHhQwSRyrUOemkFdlpE8PpKu4',
                onError: (err: unknown) => console.log(err),
            };
        },
    });
</script>
```

You can configurate the Checkout with following properties:

|Property|Type|Required|Default Value|
|--------|----|--------|-------------|
|token   |String (JWT)|True||
|onError|Callback Function|False||
|lang|pt, en or es|false|pt|
|onSuccess|Callback Function|False||
|layout| accordion or grid|False|accordion


Check the documentation [about how to generate the token](https://developer.hub4all.io/index/pagamentos/index/index-1).