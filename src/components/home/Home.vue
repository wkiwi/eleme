<template>
    <div>
        <home-header></home-header>
    </div>
</template>

<script>
import axios from 'axios'
import HomeHeader from './components/Header'
export default {
  name: 'Home',
  components: {
      HomeHeader
  },
  methods: {
    getInfo: function () {
        axios.get('/api/data.json')
        .then(this.handleGitInfoSucc)  
    },
    handleGitInfoSucc: function (res) {
        console.log(res)
    }
  },
  mounted () {
        this.getInfo()
  }
}
</script>

<style>

</style>
