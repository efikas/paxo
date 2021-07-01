import Axios from 'axios'
import { Store } from 'vuex'

export const state = () => ({})

export const mutations = {}

export const getters = {}

export const actions = {
  async apply(
    { commit },
    {
      first_name,
      last_name,
      middlename,
      email,
      gender,
      phone_number,
      educational_level,
      bvn,
      nok,
      nok_contact,
      home_address,
      children,
      marital_status,
      emergency_contact_name,
      emergency_contact_number,
      state,
      lga,
      city,
      residential_status,
      employment_status,
      company_name,
      job_title,
      date_started,
      monthly_income,
      loan_amount,
    }
  ) {
    let token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    const data = await this.$axios.$post(
      '/request-loan',
      {
        first_name,
        last_name,
        middlename,
        email,
        phone_number,
        bvn,
        nok,
        nok_contact,
        home_address,
        children,
        marital_status,
        emergency_contact_name,
        emergency_contact_number,
        state,
        lga,
        city,
        residential_status,
        employment_status,
        company_name,
        job_title,
        date_started,
        monthly_income,
        loan_amount,
        gender,
        educational_level,
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
