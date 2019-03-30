<template>
  <div class="tweet">
      <header>
        {{ post.id }}
      </header>
      <main>
        {{ post.body }}
      </main>
      <aside>
        <img src="../images/МербиусСРамкой.jpg" alt="Выбери свою таблетку!" class="immageMerbius">
      </aside>
      <footer>
        {{ post.author }}
      </footer>
  </div>
</template>

<script>
export default {
  name: 'TwitterPost',
  props: {
    post: Object
  }
}
</script>

<style scoped>
  .tweet {
    /*border-bottom: 1px solid rgb(170, 170, 170);*/
    box-sizing: border-box;
    font-size: 15px;
    display: grid;
    grid-template-columns: 1fr 6fr;
    grid-template-rows: 1fr auto 1fr;
    font-family: "Segoe UI",Arial,sans-serif;
    font-size: 14px;
  }

  header, main, aside, footer {
    height: auto;
    border: 1px solid rgb(170, 170, 170);
    display: flex;
    text-align: left;
  }

  aside {
    grid-row: 1/4;
    justify-content: center;
    align-items: start;
  }

  header, main, footer {
    justify-content: start;
    align-items: center;
    padding-left: 10px;
  }

  img {
    width: 50px;
    height: 50px;
  }
</style>
