<template>
  <task-list></task-list>
</template>

<script>
import taskList from './tasklist';
export default {
  layout: 'home',
  components: {
    taskList
  },
}
</script>

