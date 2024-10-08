<template>
  <v-container pt-16>
    <v-row
      :class="{
        'p10p': $vuetify.breakpoint.mdAndUp,
        'px-4': $vuetify.breakpoint.smAndDown,
      }"
    >
      <v-col md="4">
        <UserSideBar />
      </v-col>
      <v-col md="8">
        <h3 class="font-weight-bold">Wishlist</h3>
        <v-divider color="#14ADAC99"></v-divider>
        <div class="mt-5" id="shopTable">
          <v-row class="body-2">
            <v-col md="7">Product</v-col>
            <v-col md="2">Total</v-col>
            <v-col md="3">Add to cart</v-col>
          </v-row>
          <!-- <v-divider></v-divider> -->

          <v-row v-if="wishlist.length == 0">
            <v-col md="12" class="d-flex align-center text-center pa-10">
              <p>Your wishlist is empty!</p>
            </v-col>
          </v-row>

          <div v-for="(i, index) in wishlist" :key="index" class="d-flex" :class="{'half-faded': isOutOfStock(i) == 'outofstock'}">
            <div style="width: 100%">
              <v-row class="table-row">
                <v-col md="7" class="py-3">
                  <div class="d-flex align-center">
                    <img
                      :src="i.product.avatar"
                      width="100px"
                      alt=""
                      class="br-all-5"
                    />
                    <div class="ml-8">
                      <nuxt-link
                        :to="'/single-product?product_id=' + i.product.id"
                      >
                        <p class="body-2" style="color: black">
                          {{ i.product.name }}
                        </p>
                      </nuxt-link>

                      <v-btn
                        v-if="isOutOfStock(i.product) == 'outofstock'"
                        outlined
                        small
                        color="error"
                        class="br-all-5 text-caption error-text"
                      >
                      </v-btn>
                      <v-btn
                        v-else
                        outlined
                        small
                        color="primary"
                        class="br-all-5 text-caption primary-text"
                      >
                        <v-icon small> mdi-check-circle-outline</v-icon>
                        &nbsp;&nbsp;In Stock</v-btn
                      >
                    </div>
                  </div>
                </v-col>
                <v-col
                  md="2"
                  class="d-flex align-center body-2 font-weight-bold"
                >
                  &#8358;{{
                    (isAuthenticated
                      ? user.role == 'wholesaler' || user.role == 'next_champ'
                        ? i.product.wholesale_price
                        : i.product.price
                      : i.product.price) | formatPrice
                  }}
                </v-col>
                <v-col md="3" class="d-flex align-center body-2">
                  <v-btn color="primary" class="br-all-5" 
                   :disabled="(isOutOfStock(i.product) == 'outofstock') || (loading && loadingID != i.id)"
                    :loading="(loading && loadingID == i.id)"
                     @click="buyNow(i)"
                  >Buy Now</v-btn
                  >
                </v-col>
              </v-row>
            </div>
            <div class="ml-3 d-flex align-center body-2">
              <v-icon color="error" @click="deleteWishlist(i.id)"
                >mdi-delete-outline</v-icon
              >
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
import UserSideBar from '~/components/UserSideBar.vue'
export default {
  components: { UserSideBar },
  data() {
    return {
      loading: false,
      loadingId: 0,
      selectedItem: '',
      wishlist: [],
    }
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'user']),
  },
  mounted() {
    this.getWishList()
  },
  methods: {
    isOutOfStock(item) {
      if (item.stock_status == 'outofstock') {
        return 'outofstock'
      }

      if (item.stock_quantity < item.quantity) {
        return 'outofstock'
      }

      return ''
    },
    async getWishList() {
      await this.$store
        .dispatch('products/wishlist')
        .then((response) => {
          if (response.data) {
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
      confirm(
        'Are you sure you want to delete this product from your wishlist?'
      ) &&
        (await this.$store
          .dispatch('products/deletewishlist', data)
          .then((response) => {
            this.$toast.success(response.message)
            this.getWishList()
          }))
    },
    async buyNow(item) {
      if (this.isAuthenticated) {
        this.loading = true;
        this.loadingID = item.id;
        const data = {
          product: { ...item.product, cart_id: null, quantity: 1 },
        }
        await this.$store
          .dispatch('products/savecart', data)
          .then((response) => {
            if (response.status == true) {
              //  this.$store.dispatch('products/addToCart', this.product)
              // this.$toast.success('Product added to cart successfully!')
              this.$router.push('/shopping-cart')
            }
          })
          .catch((error) => {
            this.$toast.error(error.response.data.error.message)
          })

          this.loading = false;
          this.loadingID = 0;
       
      } else {
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.sidebar {
  background: transparent !important;
  .v-list-item:not(:first-child) {
    border-top: 1px solid #ddd;
  }
}
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

.table-row {
  border: 2px solid #66666633 !important;
  margin-top: 20px !important;
  margin-bottom: 10px !important;
  border-radius: 0.4rem !important;
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

.half-faded * {
  opacity: .7;
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
