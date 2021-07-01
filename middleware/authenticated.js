export default function ({ store, redirect, route }) {
  if (!store.getters['auth/isAuthenticated']) {
    if(route.path =='/checkout'){
      return redirect('/login?next=checkout')
    }
    return redirect('/login')
  }
}
