<template>
  <div class="loader">
    <div class="loader--img"></div>
  </div>
</template>

<style lang="scss" scoped>
.loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  backdrop-filter: blur(10px);
  background: rgba(0, 0, 0, 0.5);

  &--img {
    width: 50px;
    padding: 8px;
    aspect-ratio: 1;
    border-radius: 50%;
    background: $other-color2;
    --_m: conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box;
    -webkit-mask: var(--_m);
    mask: var(--_m);
    -webkit-mask-composite: source-out;
    mask-composite: subtract;
    animation: l3 1s infinite linear;
  }
}
@keyframes l3 {
  to {
    transform: rotate(1turn);
  }
}
</style>