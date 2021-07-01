export default function ({ $axios, store, app, redirect }) {
  $axios.onError((error) => {
    try{

      const code = parseInt(error.response.status)
      if (code == 401) {
        redirect('/logout')

      }
    } catch (err) {
      console.log(err)
    }
  })

  const getToken = () => {
    let token = ''
    if (window.localStorage.getItem('paxo') !== null) {
      token = JSON.parse(window.localStorage.getItem('paxo')).auth.token
    } else if (store.state.auth.token !== null) {
      token = store.state.auth.token
    }
    return token
  }
  $axios.setHeader('Authorization', getToken())
  $axios.onRequest((config) => {})
}
