import Axios from 'axios'
import { Store } from 'vuex'

export const state = () => ({
  StoreCart: [],
  cartItem: 0,
})

export const mutations = {
  ADD_Item(state, item) {
    if (state.StoreCart.some((data) => data.id === item.id)) {
      state.StoreCart.find((data) => data.id === item.id).quantity++
      // console.log(state.StoreCart)
      // console.log(state.StoreCart.findIndex((data) => data.id === item.id))
      // console.log(state.StoreCart[state.StoreCart.indexOf(item)])
    } else {
      state.StoreCart.push(item)

      //
    }

    // if (items.length > 0) {
    //   // eProduct.quantity += 1
    //   state.StoreCart.find((x) => x.id === item.id).quantity += 1
    // } else {
    //   state.StoreCart.push(item)
    // }
    var i,
      carts = 0
    for (i = 0; i < state.StoreCart.length; i++) {
      carts += state.StoreCart[i].quantity
    }
    state.cartItem = carts
  },

  REMOVE_Item(state, index) {
    state.StoreCart.splice(index, 1)
    var i,
      carts = 0
    for (i = 0; i < state.StoreCart.length; i++) {
      carts += state.StoreCart[i].quantity
    }
    state.cartItem = carts
  },
  CLEAR_CART(state, index) {
    state.StoreCart = []
    var i,
      carts = 0
    for (i = 0; i < state.StoreCart.length; i++) {
      carts += state.StoreCart[i].quantity
    }
    state.cartItem = carts
  },
}

export const getters = {
  StoreCart: (state) => state.StoreCart,
  cartItem: (state) => state.cartItem,
}

export const actions = {
  addToCart(context, product) {
    context.commit('ADD_Item', product)
  },
  async savecart({ state }) {
    console.log(state.StoreCart)
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$post('/user/cart/store', state.StoreCart, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })

    return data
  },

  removeFromCart(context, index) {
    context.commit('REMOVE_Item', index)
  },
  async addtowishlist({ },{product_id}) {

    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$post('/user/wishlist/store', {product_id}, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })

    return data
  },
  async wishlist() {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$get('/user/wishlist', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    return data
  },
  async deletewishlist({}, { id }) {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$delete('/user/wishlist/delete/' + id, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    return data
  },
  async addnew({ commit }, formData) {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$post('/admin/products/store', formData, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'multipart/form-data',
      },
    })

    return data
  },
  async update({ commit }, formData) {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$post(
      '/admin/products/update/' + formData.get('product_id'),
      formData,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    )

    return data
  },
  async all({}, { page }) {
    const data = await this.$axios.$get('/products?page=' + page)
    return data
  },

  async allall({}) {
    const data = await this.$axios.$get('/all-product')
    return data
  },

  async topproducts() {
    const data = await this.$axios.$get('/banner/top-product')
    return data
  },

  async categoryproducts({}, { page, id }) {
    const data = await this.$axios.$get('/products/category/' + id)
    return data
  },

  async brandproducts({}, { page, id }) {
    const data = await this.$axios.$get('/products/brand/' + id)
    return data
  },

  async single({}, { id }) {
    const data = await this.$axios.$get('/products/single/' + id)
    return data
  },

  async delete({}, { id }) {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$delete('/admin/products/delete/' + id, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    return data
  },

  async makeorder(
    { commit },
    { shipping_id, address, city, set_paid, product,email, phone, use_wallet, total, country }
  ) {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$post(
      '/user/order/create',
      {
        shipping_id,
        address,
        city,
        set_paid,
        product,email,phone,
        use_wallet,
        total, country
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    )

    return data
  },

  async storeorder({ commit }, { order_id, reference, amount, channel }) {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$post(
      '/user/payment/store',
      {
        order_id,
        reference,
        amount,
        channel,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    )

    return data
  },

  async search({}, { search }) {
    const data = await this.$axios.$post('/product/search', {
      search,
    })
    return data
  },
}
