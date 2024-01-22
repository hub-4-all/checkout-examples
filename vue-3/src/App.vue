<!-- eslint-disable max-len -->
<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  <div v-once>
    <BasicPure token="token" :onError="onError" lang='pt'/>
  </div>
</template>

<script lang="ts" type="module">
import { defineComponent } from 'vue';
import { lazyPureReactInVue } from 'veaury';
import HelloWorld from './components/HelloWorld.vue';

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
    // eslint-disable-next-line import/extensions, import/no-unresolved
    BasicPure: lazyPureReactInVue(() => import('checkout/Checkout')),
  },
  setup() {
    // Esta dando erro pois as props ficam disparando useEffect do component Checkout
    // Rever por que isso ocorre
    return {
      token: '<YOUR_PAYMENT_TOKEN>',
      onError: (err: unknown) => console.log(err),
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
