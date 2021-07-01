import Axios from 'axios'
import { Store } from 'vuex'

export const state = () => ({})

export const mutations = {}

export const getters = {}

export const actions = {
  async addnew({ commit }, { product_id, skin_type, route, head_type }) {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$post(
      '/admin/recommendation/store',
      {
        product_id,
        skin_type,
        route,
        head_type,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    )

    return data
  },
  async update({ commit }, { product_id, skin_type, route, head_type,id }) {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$post(
      '/admin/recommendation/update/' + id,
      {
        product_id, skin_type, route, head_type
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
          
        },
      }
    )

    return data
  },
  async all() {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$get('/admin/recommendation', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    return data
  },
  async single({}, { id }) {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$get('/blog/single/' + id, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    return data
  },

  async delete({}, { id }) {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$delete(
      '/admin/recommendation/delete/' + id,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    )
    return data
  },
}
