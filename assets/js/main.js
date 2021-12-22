import { auth } from './components/auth.js'
import { crud } from './components/crud.js'
import { login } from './components/login.js'
import { register } from './components/register.js'

document.addEventListener('DOMContentLoaded', ()=> {
  auth()
  register({element: 'register-form'})
  login({element: 'login-form'})
  crud({form: 'home-form', list: 'home-list'})
})