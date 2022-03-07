import Axios from 'axios'
import { Store } from 'vuex'

export const state = () => ({})

export const mutations = {}

export const getters = {}

export const actions = {
  async addnew({ commit }, { state_id, lga_id, weight_from, weight_to, delivery_fee }) {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$post(
      '/admin/delivery/store',
      { state_id, lga_id, weight_from, weight_to, delivery_fee },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    )

    return data
  },
  async update(
    { commit },
    { state_id, lga_id, weight_from, weight_to, delivery_fee, id }
  ) {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$put('/admin/delivery/update/' + id, { state_id, lga_id, weight_from, weight_to, delivery_fee },{headers: {Authorization: 'Bearer ' + token },})

    return data
  },
  async all() {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$get('/admin/delivery', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    return data
  },

  async delete({}, { id }) {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$delete('/admin/delivery/delete/' + id, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    return data
  },
  async deliveryfee({},{state_id, weight, lga_id}) {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$get('/delivery-fee/'+state_id + '/'+weight+ (lga_id ?  '/' + lga_id : ''), {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    return data
  },
}
