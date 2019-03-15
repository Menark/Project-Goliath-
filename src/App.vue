<template>
  <div id="app">
    <header>
    </header>
    <main>
      <router-view></router-view>
    </main>
    <footer class="linkToGithub">
      <a href="https://www.codewars.com/users/Menark" title="CodeWars account" target="_blank"><img src="../src/images/CodewarsMark.png" alt="GITHUB ACCOUNT" class="linkToSocial"></a>
      <a href="https://github.com/Menark" title="Github account" target="_blank"><img src="../src/images/GitHubMark.png" alt="GITHUB ACCOUNT" class="linkToSocial"></a>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
    }
  }
}
</script>

<style>
  body {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  footer {
    background-color: rgb(255, 255, 255);
  }

  .linkToSocial {
    width: 3%;
    height: 3%;
    padding: 0 20px;
    outline: 0 10px;
  }
</style>
