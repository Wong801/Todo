<template>
  <router-view/>
  <footer id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </footer>
</template>

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
