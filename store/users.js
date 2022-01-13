import Axios from 'axios'
import { Store } from 'vuex'

export const state = () => ({})

export const mutations = {}

export const getters = {}

export const actions = {
  async addnew({ commit }, formData) {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$post('/admin/blog/store', formData, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'multipart/form-data',
      },
    })

    return data
  },
  async update({ commit }, formData) {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$put(
      '/admin/blog/update/' + formData.get('id'),
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
  async changerole({ commit }, { id, role }) {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$post(
      '/admin/change-role/' + id,
      { role },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    )

    return data
  },

  async changestatus({ commit }, { id, role }) {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$post(
      '/admin/wallet/approve/' + id,
      { role },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    )

    return data
  },

  async all({}, { page }) {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$get('/admin/users?page=' + page, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    return data
  },

  async wallet({}, { page }) {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$get('/admin/wallet/request?page=' + page, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    return data
  },

  async allstaff({}, { page }) {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$get('/admin/staff?page=' + page, {
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

  async deletestaff({}, { id }) {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$delete('/admin/staff/delete/' + id, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    return data
  },
}
