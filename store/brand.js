import Axios from 'axios'
import { Store } from 'vuex'

export const state = () => ({})

export const mutations = {}

export const getters = {}

export const actions = {
  async addnew({ commit }, formData) {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$post('/admin/brands/store', formData, {
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
      '/admin/brands/update/' + formData.get('id'),
      formData,
      {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'multipart/form-data',
        },
      }
    )

    return data
  },
  // async all() {
  //   let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
  //   const data = await this.$axios.$get('/admin/brands', {
  //     headers: {
  //       Authorization: 'Bearer ' + token,
  //     },
  //   })
  //   return data
  // },

  async all() {
    const data = await this.$axios.$get('/brands', {

    })
    return data
  },

  async allBrands() {
    const data = await this.$axios.$get('/brands-admin', {

    })
    return data
  },

  async delete({}, { id }) {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$delete('/admin/brands/delete/' + id, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    return data
  },
}
