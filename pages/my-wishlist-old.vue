<template>
  <v-container>
    <div class="text-center pb-16">
      <h1>My Wishlist</h1>
    </div>
    <!-- {{ wishlist }} -->
    <v-simple-table>
      <thead>
        <tr>
          <th>PRODUCT</th>
          <th>PRICE</th>
          <!-- <th>QUANTITY</th>
          <th>TOTAL</th> -->
          <th>ACTION</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(i, index) in wishlist" :key="index">
          <td class="py-5">
            <div class="d-flex align-center">
              <img :src="i.product.avatar" width="100px" alt="" />
              <nuxt-link :to="'/single-product?product_id='+i.product.id">
                <p class="ml-8">{{ i.product.name }}</p>
              </nuxt-link>
            </div>
          </td>

          <td>&#8358;{{ i.product.price | formatPrice }}</td>
          <!-- <td>
            <div class="qty-box pa-2">
              <v-btn
                icon
                small
                @click="i.quantity > 1 ? (i.quantity -= 1) : null, calculateSubtotal()"
                ><v-icon>ri-subtract-fill</v-icon></v-btn
              >
              <p class="ma-0">{{ i.quantity }}</p>
              <v-btn @click="i.quantity += 1 , calculateSubtotal()" icon small
                ><v-icon>ri-add-fill</v-icon></v-btn
              >
            </div>
          </td>
          <td>
            &#8358;{{
              (parseInt(i.price) * parseInt(i.quantity)) | formatPrice
            }}
          </td> -->
          <td class="text-">
            <v-icon @click="deleteWishlist(i.id)"
              >ri-delete-bin-line</v-icon
            >
          </td>
        </tr>
        <tr v-if="wishlist.length == 0">
          <td colspan="5" class="text-center pa-10">
            <p>Your cart is empty!</p>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      wishlist: [],
    }
  },
  mounted() {
    this.getWishList()
  },
  methods: {
    async getWishList() {
      await this.$store
        .dispatch('products/wishlist')
        .then((response) => {
          if(response.data){

            this.wishlist = response.data
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async deleteWishlist(id) {
      const data = {
        id: id,
      }
      confirm('Are you sure you want to delete this product from your wishlist?') &&
        (await this.$store.dispatch('products/deletewishlist', data).then((response) => {
          this.$toast.success(response.message)
          this.getWishList()
        }))
    },
  },
}
</script>
<style lang="scss" scoped>
h1 {
  font-size: 48px;
  font-weight: 600;
}
thead {
  background-color: #f1f1f1;
  th {
    font-size: 14px !important;
    color: #000 !important;
    font-weight: 600;
  }
}
td {
  font-size: 16px !important;
  color: #8193a5;
}

.qty-box {
  border: 0.5px solid #666;
  display: flex;
  justify-content: space-between;
  width: 120px;
  p {
    color: #000 !important;
  }
}

a {
  color: #0066cc !important;
  text-decoration: none;
}
.shopping-total {
  margin-bottom: 30px;
  padding: 30px 35px;
  background-color: #f1f1f1;
  border: 1px solid #bfbfbf;
  p {
    font-size: 14px !important;
    color: #000000de !important;
  }

  .header {
    font-size: 16px !important;
    color: #666 !important;
    display: flex;
    justify-content: space-between;
  }
}
</style>
