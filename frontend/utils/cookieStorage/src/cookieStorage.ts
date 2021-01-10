import { CookieStorage } from 'cookie-storage'

const date = new Date()
date.setDate(date.getDate() + 30)
const cookieStorage = new CookieStorage({
  path: '/',
  expires: date,
  sameSite: 'Strict',
})

export { cookieStorage }
