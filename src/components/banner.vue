<template>

      <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :circular='circular' :interval="interval" :duration="duration">
        <block v-for="(item, index) in banner" :key="index">
            <swiper-item>
                <image :src="item.imageUrl" class="slide-image" mode="aspectFill"/>
            </swiper-item>
        </block>
        
    </swiper> 

</template>

<script>

export default {
  props: {
    banner: {
      type: Array,
      default() {
          return {}
        }
    }
  },
  data() {
    return {
      indicatorDots: true,
      autoplay: true,
      circular:true,
      interval: 3000,
      duration: 500
    };
  },
  
  created() {
    // this.a()
  },
 
 
};
</script>

<style scoped>

image {
  height: 100%;
  width: 100%;
}
</style>
