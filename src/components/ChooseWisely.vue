<template>
  <div>
    <h1>{{ 'CHOOSE WISELY!!!!' }}</h1>
    <router-link to="/profile" class="rlink">LINK TO CONTENT</router-link>
  </div>
</template>

<script>
export default {

}
</script>

<style>
  .rlink {
    text-decoration: none;
    padding: 10px;
    background-color: rgb(110, 30, 30);
    border: none;
    font-size: 15px;
    color: #FFFFFF;
    text-align: center;
    transition-duration: 0.4s;
    cursor: pointer;
    outline: none;
    box-sizing: border-box;
  }

  .rlink {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .rlink:hover {
    left: 15%;
    width: 24%;
  }
</style>
