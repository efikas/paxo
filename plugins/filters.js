import Vue from 'vue'
import moment from 'moment'

Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

Vue.filter('formatPrice', function (value) {
  let val = (value / 1).toFixed(2).replace(',', '.')
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
})
Vue.filter('formatNumber', function (value) {
  // var n = parseInt(value.replace(/\D/g, ''), 10)
  // return n.toLocaleString()
  return value
})

Vue.filter('formatDate', function (value) {
  return moment(value).format('MMMM Do, YYYY')
})

Vue.filter('stringToNumber', function (value) {
  let val = value
  return val
})

Vue.filter('reverse', function (value) {
  // slice to make a copy of array, then reverse the copy
  return value.slice().reverse()
})

Vue.filter('wholenumber', function (str) {
  let value = str || '0'
  return value.substring(0, value.indexOf('.'))
})

Vue.filter('decimalplace', function (str) {
  let value = str || '0'
  return value.split('.')[1]
})

Vue.filter('getDp', function (value) {
  if (value) {
    var names = value.split(' ')
    if (names.length == 1) {
      return names[0].substring(0, 2).toUpperCase()
    } else if (names.length > 1) {
      var first = names[0].substring(0, 1)
      var second = names[1].substring(0, 1)
      var dp = first + second
      return dp.toUpperCase()
    }
  }
})
