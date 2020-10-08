<template>
  <div id="intro">
    <div id="intro-text">
      <h1 class="hide">
        <span class="text">No challenge poses</span>
      </h1>
      <h1 class="hide">
        <span class="text">a greater threat</span>
      </h1>
      <h1 class="hide">
        <span class="text">to future generations</span>
      </h1>
      <h1 class="hide">
        <span class="text">than climate change.</span>
      </h1>
      <h1 class="hide">
        <span id="quote-name" class="text">~ Obama ~</span>
      </h1>
    </div>
    <div id="slider"></div>
  </div>
</template>

<script>
import { gsap } from "gsap";
export default {
  mounted() {
    const t1 = gsap.timeline({ defaults: { ease: "power1.out" } });
    t1.to(".text", { y: "0%", duration: 1, stagger: 0.25 });
    t1.to('#slider', {y:"-100%", duration: 2, delay: 1});
    t1.to('#intro', {y: "-100%", duration: 0.5}, "-=1.65");
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss">
#intro {
  background: black;
  position: fixed;
  top: 0;
  left: 0;
  color: white;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  #intro-text {
    color: rgb(233, 233, 233);
    .hide {
      background: black;
      font-size: 3rem;
      overflow: hidden;
      span {
        transform: translateY(100%);
        display: inline-block;
      }
      #quote-name{
          font-size: 2rem;
      }
    }
  }
}

#slider {
  background: rgb(97, 105, 109);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: translateY(100%);
}
</style>
