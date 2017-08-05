<template>
	<div class="l-container">
		

	</div>
</template>
<script>

import * as Common from 'c_vendor/common.js'

export default {
  components: {
    
  },
  methods: {
    load () {

    }
  },
  data () {
    return {
      pageState: this.$store.state.index.pageState,
      param: this.$store.state.index.param,
      promise: this.$store.state.index.promise,
    }
  },
  computed: {

  },
  mounted () {
    // 初始化的操作要放到路由那里进行处理
    this.loadMy()
    
    this.scrollLoad()
    // 执行还原滚动条数据
    window.scrollTo(0, this.$store.state.index.pageState.scrollTop)
  },
  /**
   * 走之前要保留滚动条信息
   * @param  {[type]}   to   [description]
   * @param  {[type]}   from [description]
   * @param  {Function} next [description]
   * @return {[type]}        [description]
   */
  beforeRouteLeave (to, from, next) {
    this.clearScrollLoad()
    this.$store.commit('PAGE_STATE_INDEX', {
      scrollTop: Common.getScrollTop()
    })
    next()
  }
}
</script>
<style scoped lang="less">
	.l-container{

		

	}
</style>