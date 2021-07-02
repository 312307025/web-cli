import store from '@/store'
import Cookies from 'js-cookie'

const TokenKey = 'access_token_mobile'

const allDomain = ['.wowqu.cn']

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function removeAllToken() {
  allDomain.forEach(item => {
    Cookies.remove(TokenKey, { domain: item })
  })
  Cookies.remove(TokenKey)
}

/**
 * 是否有权限
 * @param {*} key
 */
export function isAuth(key) {
  return store.state.globel.permissions.has(key) || process.env.NODE_ENV === 'development'
}
