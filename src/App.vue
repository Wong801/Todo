<template>
  <router-view/>
  <footer id="nav">
    <router-link to="/todo">Todo Project</router-link> |
    <router-link to="/hope">Hope Project</router-link> |
    <router-link to="/about">About</router-link>
    <p>&#169; Wong801</p>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  watch: {
    '$route' (to, from) {
      document.title = to.meta.title || 'Wong801 Website'
    }
  }
})
</script>

<style>
#nav {
  margin-top: 3rem;
  padding: 2rem;
  text-align: center;
  background-color: #00feffFF;
  bottom: 0;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
