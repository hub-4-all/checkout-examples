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
      token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJPcmdhbml6YXRpb25VVUlEIjoiYzBlYjc1ZTctOGU4Ny00ODZlLTg4ZTUtZGIyZjIyMWZjYjgwIiwiYWNjb3VudFVVSUQiOiI5ODBiMTYzNi1jMzQ3LTQxNTctYmI1OS03MGZjMGJkMTkzZTgiLCJ1bmlxdWVJZGVudGlmaWVyIjoibHVjYXMtMDA3IiwicGF5bWVudFByb2R1Y3RzIjpbXSwiZGVzY3JpcHRpb24iOiJQYWdhbWVudG8gZGUgdW0gZXhlbXBsbyBkYSBkZW1vIGRlIDIwLTExIiwiY3VycmVuY3kiOiJFVVIiLCJhbW91bnQiOjExMTM3LCJpYXQiOjE3MDU0MTIyODF9.dGPUkOxyD8jlWKrt4P-roYgoagcsjD3LA6MY6FEX12uYFvfgU0hJggAQEm6939tmTMyE23z2-kbax18MnZ65ce2foRkW5gmwcN8B-yjBwaxVW4pqRO5Emob3gcyNOvkFzO-JWq-fTZkOYdMZ4GEHhQwSRyrUOemkFdlpE8PpKu4',
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
