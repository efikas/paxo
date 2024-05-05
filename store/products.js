import Axios from 'axios'
import { Store } from 'vuex'

export const state = () => ({
  StoreCart: [],
  cartItem: 0,
  referal: null
})

export const mutations = {
  ADD_Item(state, item) {
    if (state.StoreCart.some((data) => data.id === item.id)) {
      state.StoreCart.find((data) => data.id === item.id).quantity++
      state.StoreCart.find((data) => data.id === item.id).cart_id = item.cart_id
      // console.log(state.StoreCart)
      // console.log(state.StoreCart.findIndex((data) => data.id === item.id))
      // console.log(state.StoreCart[state.StoreCart.indexOf(item)])
    } else {
      state.StoreCart.push(item)
    }

    // if (items.length > 0) {
    //   // eProduct.quantity += 1
    //   state.StoreCart.find((x) => x.id === item.id).quantity += 1
    // } else {
    //   state.StoreCart.push(item)
    // }
    // var i,
    //   carts = 0
    // for (i = 0; i < state.StoreCart.length; i++) {
    //   carts += state.StoreCart[i].quantity
    // }
    state.cartItem = state.StoreCart.length
  },

  ADD_Item_cart_id(state, item) {
    if (state.StoreCart.some((data) => data.id === item.id)) {
      let items = [];
      state.StoreCart.forEach((data) => {
        if(data.id === item.id){
          items.push({
            ...data,
            cart_id: item.cart_id,
          });
        }
        else {
          items.push(data);
        }
      });

      state.StoreCart = items;
    }
    else {
      let items = state.StoreCart;
      state.StoreCart = [
        ...items,
        item
      ]
    }
    state.cartItem = state.StoreCart.length
  },

  UPDATE_Item_quantity(state, item) {
    if (state.StoreCart.some((data) => data.id === item.id)) {
      state.StoreCart.find((data) => data.id === item.id).quantity = item.quantity
    } 
  },

  UPDATE_ALL_CART(state, item) {
    state.StoreCart = item
    state.cartItem = state.StoreCart.length
  },

  REMOVE_Item(state, index) {
    state.StoreCart.splice(index, 1)
    // var i,
    //   carts = 0
    // for (i = 0; i < state.StoreCart.length; i++) {
    //   carts += state.StoreCart[i].quantity
    // }
    state.cartItem = state.StoreCart.length
  },
  CLEAR_CART(state) {
    state.StoreCart = []
    // var i,
    //   carts = 0
    // for (i = 0; i < state.StoreCart.length; i++) {
    //   carts += state.StoreCart[i].quantity
    // }
    state.cartItem = state.StoreCart.length
  },
  UPDATE_CART(state, data) {
    state.StoreCart = data
    state.cartItem = state.StoreCart.length
  },
  ADD_CART_QUANTITY(state) {
    // var i,
    //   carts = 0
    // for (i = 0; i < state.StoreCart.length; i++) {
    //   carts += state.StoreCart[i].quantity
    // }
    state.cartItem = state.StoreCart.length
  },
  SAVE_REFERAL(state, data) {
    state.referal = data
  }
}

export const getters = {
  StoreCart: (state) => state.StoreCart,
  cartItem: (state) => state.cartItem,
  referal: (state) => state.referal
}

export const actions = {
  addToCart(context, product) {
    context.commit('ADD_Item', product)
  },
  async savecart(context, {product}) {

    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    if(context.state.StoreCart.some((data) => data.id === product.id)){
      product.quantity = product.quantity + 1
      let item = context.state.StoreCart.find((data) => data.id === product.id);

      product = {
        ...product,
        cart_id: item.cart_id
      };
    }


    const data = await this.$axios.$post('/user/cart/webstore', {
      product, product_id: product.id}, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    if(data.status == true){
      let newItem = {
        ...data.data.product,
        cart_id: data.data.id,
      };
      newItem.cart_id = data.data.id;
      context.commit('ADD_Item_cart_id', newItem)
    }
    return data
  },

  async fetchcart(context) {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$get('/user/cart', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })

    if(data.status == true){
      let cartItems = [];
      

      data.data.forEach((item) => {
        let quantity = 1;
        if(item.product.quantity > item.products.stock_quantity){
          quantity = item.products.stock_quantity
        }
        else {
          quantity = item.product.quantity
        }
        cartItems.push({
          ...item.product,
          quantity: quantity,
          stock_quantity: item.products.stock_quantity,
          stock_status: item.products.stock_status,
          price: item.products.price,
          regular_price: item.products.regular_price,
          sale_price: item.products.sale_price,
          cart_id: item.id,
        });
      });

      context.commit('UPDATE_ALL_CART', cartItems)
    }
    else {
      context.commit('CLEAR_CART', 0)
    }
    return data
  },

  async removeFromCart (context, { index, product})  {

    context.commit('REMOVE_Item', index)
    
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$delete(`user/cart/delete/${product.cart_id}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })

    return data
  },
  async updateItemQuantity(context,{count, product}) {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    if(context.state.StoreCart.some((data) => data.id === product.id)){
      let item = {...product, quantity: count} 
      context.commit("UPDATE_Item_quantity", item);

      const data = await this.$axios.$post('/user/cart/webstore', {
        product: item, product_id: product.id}, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })

      if(data.status == true){
        context.commit('ADD_Item_cart_id', {
          ...data.data.product,
          cart_id: data.data.id,
        })
      }

      return data
    }
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
  async addreview({ commit }, {product_id, email, name, content}) {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$post('/review/store', {product_id, email, name, content}, {
      headers: {
        Authorization: 'Bearer ' + token,

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
  async all({}, { page,category,brand,price }) {
    var data
    data = await this.$axios.$get('/products/filter?category_id=' + category+ '&brand_id=' + brand+'&price='+price+ '&page='+page)
    // if(category.length > 0){

    // }else{
    //   data = await this.$axios.$get('/products/80' +'?page='+page)
    // }
    return data
  },
  async allproducts({}, page) {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$get(`admin/products/all-admin-product?page=${page}`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      return data;
  },

  async dumpallproducts({}) {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$get(`/all-product`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      return data;
  },
  async updateProductsPrice({}, { formData }) {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$post(
      '/admin/change-price',
      formData,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    )
    console.log(data)

    return data
  },

  async filter({}, { page,category,brand,price }) {
    var data
    data = await this.$axios.$get('/products/filter?category_id=' + category+ '&brand_id=' + brand+'&price='+price+ '&page='+page)
    // if(category.length > 0){

    // }else{
    //   data = await this.$axios.$get('/products/80' +'?page='+page)
    // }
    return data
  },
  async offers({}, { page, id, category, brand, availability, price, subcategory, section }) {
    let url = ""
    let isInitiated = false
    if(category != "" && category != undefined){
      url = url + "category_id=" + category
      isInitiated = true;
    }
    if(brand != "" && brand != undefined){
      if(isInitiated){url = url + "&"}
      url = url + "brand_id=" + brand
      isInitiated = true;
    }
    if(section != "" && section != undefined){
      if(isInitiated){url = url + "&"}
      url = url + "section_id=" + section
      isInitiated = true;
    }
    if(subcategory != "" && subcategory != undefined){
      if(isInitiated){url = url + "&"}
      url = url + "subcategory_id=" + subcategory
      isInitiated = true;
    }
    if(price != undefined && price.start != "" && price.start != undefined){
      if(isInitiated){url = url + "&"}
      url = url + "price_start=" + price.start + "&price_end=" + price.end
      isInitiated = true;
    }
    if(availability != "" && availability != undefined){
      if(isInitiated){url = url + "&"}
      url = url + "availability=" + availability.toLowerCase()
      isInitiated = true;
    }

    const data = await this.$axios.$get('/products/offer/filter?'+ url)

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
  async sectionproducts({}, { page, id, category, brand, availability, price, subcategory, section, bannerId }) {
//     products/filter
//     section_id
// brand_id
// category_id
// subcategory_id
// price
    let url = ""
    let isInitiated = false
    if(category != "" && category != undefined){
      url = url + "category_id=" + category
      isInitiated = true;
    }

    if(bannerId != "" && bannerId != undefined){
      if(isInitiated){url = url + "&"}
      url = url + "banner_id=" + bannerId
      isInitiated = true;
    }

    if(brand != "" && brand != undefined){
      if(isInitiated){url = url + "&"}
      url = url + "brand_id=" + brand
      isInitiated = true;
    }
    if(section != "" && section != undefined){
      if(isInitiated){url = url + "&"}
      url = url + "section_id=" + section
      isInitiated = true;
    }
    if(subcategory != "" && subcategory != undefined){
      if(isInitiated){url = url + "&"}
      url = url + "subcategory_id=" + subcategory
      isInitiated = true;
    }
    if(price != undefined && price.start != "" && price.start != undefined){
      if(isInitiated){url = url + "&"}
      url = url + "price_start=" + price.start + "&price_end=" + price.end
      isInitiated = true;
    }
    if(availability != "" && availability != undefined){
      if(isInitiated){url = url + "&"}
      url = url + "availability=" + availability.toLowerCase()
      isInitiated = true;
    }

    const data = await this.$axios.$get('/products/filter?'+ url)
    // const data = await this.$axios.$get('/products/section/' + id + '?category_id=' + category +'&brand_id=' + brand)
    return data
  },
  async categoryproducts({}, { page, id }) {
    const data = await this.$axios.$get('/products/category/' + id)
    return data
  },
  async subcategoryproducts({}, { page, id }) {
    const data = await this.$axios.$get('/products/subcategory/' + id + '?page='+page)
    return data
  },

  async brandproducts({}, { page, id }) {
    const data = await this.$axios.$get('/products/brand/' + id+'?page='+page)
    return data
  },
  async bannerproducts({}, { page, id }) {
    const data = await this.$axios.$get('/site-banners/single/' + id)
    return data
  },

  async single({}, { id }) {
    const data = await this.$axios.$get('/products/single/' + id)
    return data
  },

  async relatedproduct({}, { id }) {
    const data = await this.$axios.$get('/products/related/' + id)
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

  async trackorder(
    { commit },
    { order_number }
  ) {

    const data = await this.$axios.$post(
      '/track-order',
      {
        order_number
      },

    )

    return data
  },

  async makeorder(
    { commit },
    { shipping_id, address, city, state, lga, set_paid, product,email, phone, use_wallet, total, total_product, country, device, delivery_method, description, code , weight, dob}
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
        total, total_product, country, device, delivery_method, state, code, lga, weight, description, dob,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    )

    return data
  },

  async storeorder({ commit }, { order_id, reference, amount, channel, total_product }) {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$post(
      '/user/payment/store',
      {
        order_id,
        reference,
        amount,
        channel, total_product
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    )

    return data
  },

  async getorderproducts({ commit }, { product_id }) {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$post(
      '/product/orders',
      {
        product_id
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    )

    return data
  },

  async storeorderwallet({ commit }, { order_id, reference, amount, channel, total_product }) {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$post(
      '/user/payment/store/wallet',
      {
        order_id,
        reference,
        amount,
        channel, total_product
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
  async refreshcart({commit}, product_id) {
    const data = await this.$axios.$get(`/refresh-cart?product_id=${product_id}`)
    return data
  },
  async clearcart({commit}, product_id) {
    commit("CLEAR_CART")
  },
}
