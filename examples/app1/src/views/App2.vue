<template>
  <div>
    <micro-app name="app2" />
  </div>
</template>

<script>
import MicroApp from "../master/MicroApp";

export default {
  name: "App2",
  data() {
    return {
      state: "",
    };
  },
  methods: {
  },
  components: {
    MicroApp,
  },
};
</script>
