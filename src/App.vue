<template>
  <v-app>
    <v-main>
      <TaskManager/>
    </v-main>
  </v-app>
</template>

<script>
import TaskManager from './components/TaskManager.vue';

export default {
  name: 'App',

  components: {
      TaskManager,
  },

  data: () => ({
    //
  }),
};
</script>
