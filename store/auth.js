import Axios from 'axios'
import { Store } from 'vuex'

export const state = () => ({
  token: null,
  authenticated: false,
  blur: false,
  user: [],
  wallet_balance: null,
})

export const mutations = {
  SET_AUTH: (state, payload) => {
    state.authenticated = true
  },
  SET_USER: (state, payload) => {
    state.user = payload
  },
  UPDATE_USER: (state, {key, value}) => {
    state.user[key] = value;
  },
  SET_WALLET_BALANCE: (state, payload) => {
    state.wallet_balance = payload
  },
  setToken: (state, payload) => {
    state.token = payload
  },
  BLUR_PAGE: (state, payload) => {
    state.blur = payload
  },
  RESET_STATE(state, payload) {
    state.authenticated = payload
    window.localStorage.clear()
    ;(state.token = null),
      (state.authenticated = false),
      (state.blur = false),
      (state.user = []),
      (state.wallet_balance = null),
      this.$router.push('/')
  },
}

export const getters = {
  isAuthenticated(state) {
    return state.authenticated
  },
  token: (state) => {
    return state.token
  },
  user: (state) => {
    return state.user
  },
  wallet_balance: (state) => {
    return state.wallet_balance
  },
  blur: (state) => {
    return state.blur
  },
}

export const actions = {
  async register(
    { commit },
    {
      password,
      email,
      first_name,
      last_name,
      mobile,
      password_confirmation,
      sex,
      dob,
      role,
      referred_by,
      referral_id,
    }
  ) {
    const data = await this.$axios.$post('/auth/register', {
      email,
      password,
      first_name,
      last_name,
      mobile,
      password_confirmation,
      gender: sex,
      dob,
      role,
      referred_by,
      referral_id,
    })
    this.$axios.defaults.headers.common['Token'] = data.message.access_token
    commit('setToken', data.data.access_token)
    commit('SET_AUTH')
    commit('SET_USER', data.data.user)
    return data
  },
  async shipping() {
    const data = await this.$axios.$get('/shipping')
    return data
  },
  async dashboard({ commit }) {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$get('/admin/dashboard', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })

    return data
  },

  async orders({ commit }, { page }) {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    // const data = await this.$axios.$get('/admin/orders?page=' + page, {
    const data = await this.$axios.$get('/admin/orders', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })

    return data
  },

  async getuser({ commit }) {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$get('/user', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    commit('SET_USER', data.data)

    return data
  },

  async skinexpert({ commit }, { skin_type, route, head_type }) {
    // let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$get(
      head_type
        ? `/recommendations/${skin_type}/${route}/${head_type}`
        : `/recommendations/${skin_type}/${route}`
      // {
      //   headers: {
      //     Authorization: 'Bearer ' + token,
      //   },
      // }
    )

    return data
  },

  async subscribenewsletter({ commit }, { email }) {
    const data = await this.$axios.$post('/subscribe', { email })
    return data
  },

  async validateotp({ commit }, { mydata }) {
    // const mobile = '234' + parseInt(phone, 10)
    const data = await this.$axios.$post('/validate-otp', {
      data: mydata,
    })
    return data
  },
  async login({ commit, dispatch }, { email, password }) {
    const data = await this.$axios.$post('/auth/login', {
      email,
      password,
    })

    this.$axios.defaults.headers.common['Token'] = data.message.access_token
    commit('setToken', data.data.access_token)
    commit('SET_AUTH')
    commit('SET_USER', data.data.user)

    dispatch('products/fetchcart', {}, {root:true})
    // commit('SET_WALLET_BALANCE', data.wallet_balance)
    return data
  },
  async forgotpassword({ commit }, { email, callback_url }) {
    const data = await this.$axios.$post('/auth/password/email', {
      email,
      callback_url,
    })
    return data
  },
  async verifyotp({ commit }, { verification_otp }) {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$post(
      '/auth/verify/otp',
      {
        verification_otp,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    )
    return data
  },
  async resendotp() {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$get('/auth/resend/otp', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    return data
  },
  async resendemail() {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$get('/email/resend', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    return data
  },
  async profile({ commit }) {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$get('/user', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    commit('SET_USER', data.data)
    return data
  },

  async updateprofile(
    { commit },
    {
      state_id,
      lga_id,
      first_name,
      last_name,
      email,
      mobile,
      gender,
      address,
      city,
      postcode,
      apartment,
      dob,
      id,
      account_number,
      account_name,
      bank_code,
    }
  ) {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$put(
      '/user/settings/profile/update',
      {
        state_id,
        lga_id,
        first_name,
        last_name,
        email,
        mobile,
        gender,
        address,
        city,
        postcode,
        apartment,
        dob,
        account_number,
        account_name,
        bank_code,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    )
    commit('SET_USER', data.data)
    return data
  },
  async wallet({ commit }, { user_id }) {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$get('/get_user_wallet_balance/' + user_id, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })

    return data
  },
  async loanbalance({ commit }, { user_id }) {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$get('/get_user_loan_balance/' + user_id, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })

    return data
  },

  async fundwallet({ commit }, { amount, reference, user_id }) {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$post(
      '/fund_user_wallet/card',
      {
        amount,
        reference,
        user_id,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    )
    return data
  },

  async becomewholesaler({ commit }) {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$post(
      '/user/settings/switch-wholesaler',
      {},
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    )
    return data
  },

  async becomeaffiliate({ commit }) {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$post(
      '/user/settings/activate-affiliate',
      {},
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    )
    commit('SET_USER', data.data)
    return data
  },

  async uploadavatar({ commit }, formData) {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$post('/imageupload', formData, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'multipart/form-data',
      },
    })
    return data
  },

  async uploadselfie({ commit }, formData) {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$post('/upload-skin', formData, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'multipart/form-data',
      },
    })
    return data
  },
  async logout({ commit }) {
    commit('RESET_STATE', false)
  },

  async resetpassword(
    { commit },
    { email, password, password_confirmation, token }
  ) {
    const data = await this.$axios.$post('/auth/password/reset', {
      email,
      password,
      password_confirmation,
      token,
    })
    return data
  },
  async changepassword(
    {},
    { password, password_confirmation, current_password }
  ) {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$post(
      '/user/settings/change-password',
      {
        password,
        password_confirmation,
        current_password,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    )
    return data
  },

  async banks() {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$get(
      '/user/wallet/get-banks',

      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    )
    return data
  },
  async allbanks() {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$get('https://api.payant.ng/banks', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    return data
  },
  async resolveaccount({}, { account_number, bank_code }) {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$post(
      '/user/wallet/enquiry',
      {
        account_number,
        bank_code,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    )
    return data
  },

  async withdraw({}, { amount, password }) {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$post(
      '/user/wallet/transfer',
      {
        amount,
        password,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    )
    return data
  },

  async updatereward({ commit }, formData) {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    console.log(formData)
    const data = await this.$axios.$post(`/admin/reward/update/${formData.get('id')}`, formData, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'multipart/form-data',
      },
    })
    return data
  },
  async rewardcontent() {
    const data = await this.$axios.$get(
      '/reward/content'

      // {
      //   // headers: {
      //   //   Authorization: 'Bearer ' + token,
      //   // },
      // }
    )
    return data
  },
}
