<template>
  <div class="container">
    <h2>Welcome to use QianKun ~</h2>
    <p>
      如果在使用中遇到任何问题，请在
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/umijs/umi/issues/new/choose"
      >
        此处
      </a>
      提Issue
    </p>
    <button @click="setQiankunGlobalState">修改全局 state</button>
    <button @click="setState">修改子应用 props</button>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data() {
      return {
        state: ''
      };
    },
    methods: {
      setState(state) {
        this.state = state;
      },
      setQiankunGlobalState() {}
    },
    components: {}
  };
</script>

<style>
  .container {
    height: 100%;
    padding: 50px;
    background: white;
  }
</style>
