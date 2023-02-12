<template>
  <div>
    後台頁面
    <hr>
    <RouterView></RouterView>
  </div>
</template>


<script>
import { RouterView } from 'vue-router';
export default {
  components: {
    RouterView,
  }
}
</script>