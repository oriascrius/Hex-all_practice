<template>
  <div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  created() {
    // 動態路由是存在 params 參數裡面
    console.log(this.$route.params.id);
    //  數字 是到網址 data -> data -> info -> seed
    // const seed = '832f322d58a88be5';
    const seed = 'this.$route.params.id';
    axios.get(`https://randomuser.me/api/?seed=${seed}`).then((res) => { console.log(res); });
  },
};
</script>
