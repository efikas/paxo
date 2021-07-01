<template>
<v-hover v-slot="{ hover }">
  <v-card flat :to="'/single-product?product_id='+id" class="product-box">
    <img :src="image" width="100" alt="">
    <div>
      <div class="product-title">{{product_name}}</div>
      <v-rating dense small :value="5" color="orange"></v-rating>
      <div class="product-price">&#8358;{{price | formatPrice}}</div>
    </div>
  </v-card>
</v-hover>
</template>
<script>
export default {
  props: ['vendor', 'product_name', 'price', 'rating', 'badge', 'image', 'id'],
  data () {
    return {

    }
  }
}
</script>
<style lang="scss" scoped>
.product-box {
  position: relative;
  padding: 20px 20px 0;
  display: flex;
  justify-content: space-evenly;


  &:hover{
    border: 1px solid #d9d9d9;
  }
  .vendor {
    display: block;
    padding-bottom: 8px;
    margin-bottom: 13px;
    line-height: 1.2;
    font-size: 12px;
    color: #000;
    text-transform: uppercase;
    border-bottom: 1px solid #e1e1e1;
  }
  .product-title {
    margin: 0;
    display: block;
    font-size: 14px;
    line-height: 1.2em;
    padding-bottom: 5px;
    padding-left: 0;
    color: #06c;
    --max-lines: 2;
    max-height: calc(1.2em * var(--max-lines));
    overflow: hidden;
    padding-right: 1rem;
  }
  .product-price {
    font-size: 16px;
    color: #000;
  }
}
</style>
