import Axios from 'axios'
import { Store } from 'vuex'

export const state = () => ({})

export const mutations = {}

export const getters = {}

export const actions = {
  async userorders() {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$get('/user/order', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    return data
  },
  async userpendingorders() {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$get('/user/pending/order', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    return data
  },
  async singleblog({}, { id }) {
    // let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$get('/blog/single/' + id, {
      // headers: {
      //   Authorization: 'Bearer ' + token,
      // },
    })
    return data
  },

  async cancelorder({}, { id }) {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$put(
      '/user/order/cancel/' + id,
      {},
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    )
    return data
  },

  async updateorders({}, { status, id }) {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$put(
      '/admin/orders/update/' +id,
      {
        status
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    )
    return data
  },

  async applycoupon({}, { code }) {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$post(
      '/apply-coupon',
      {
        code
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    )
    return data
  },
}
