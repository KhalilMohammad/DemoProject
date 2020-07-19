<template>
  <div id="app" class="mt-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 text-center">
          <VForm />
          <LinkGrid />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import VForm from './components/V-Form.vue';
import LinkGrid from './components/LinkGrid.vue';

@Component({
  components: {
    VForm,
    LinkGrid,
  },
})
export default class App extends Vue {}
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
