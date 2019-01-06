<template>
  <div>
    <div class="card">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.card {
  background-color: white;
  font-size: 1rem;
  font-weight: 400;
  margin: 0px 0 5px;
  padding: 25px 35px;
  border: 1px solid #f7fffa;
  border-radius: 5px;
  -webkit-box-shadow: 0px 1px 55px 0px rgba(0, 0, 0, 0.15);
  -moz-box-shadow: 0px 1px 55px 0px rgba(0, 0, 0, 0.15);
  box-shadow: 0px 1px 25px 0px rgba(0, 0, 0, 0.15);
  -webkit-transition: all 0.3s linear 0s;
  -moz-transition: all 0.3s linear 0s;
  -ms-transition: all 0.3s linear 0s;
  -o-transition: all 0.3s linear 0s;
  transition: all 0.3s linear 0s;
  &:hover {
    border: 1px solid #f7fffa;
    -webkit-box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.3);
  }
}
</style>
