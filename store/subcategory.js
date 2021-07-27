import Axios from 'axios'
import { Store } from 'vuex'

export const state = () => ({})

export const mutations = {}

export const getters = {}

export const actions = {
  async addnew({ commit }, { name, description, section_id, category_id }) {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$post(
      '/admin/subcategory/store',
      { name, description, section_id, category_id },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    )

    return data
  },
  async update({ commit }, { name, description, section_id, category_id, id }) {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$put(
      '/admin/subcategory/update/' +id,
      { name, description, category_id, section_id },
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
    const data = await this.$axios.$get('/admin/subcategory', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    return data
  },

  async delete({}, {id}) {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$delete('/admin/subcategory/delete/' + id, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    return data
  },
}
