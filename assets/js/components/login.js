import { getUsers } from './users.js'

const { users } = getUsers()

export const login = ({element}) => {
  function onSubmit (e) {
      e.preventDefault()
      const email = document.getElementById('email').value
      const password = document.getElementById('password').value
      const user = users.find(user => user.email === email && user.password === password)
    
      if (user) {
          window.localStorage.setItem('authenticated', true)
          window.localStorage.setItem('current-user', user.name)
          window.localStorage.setItem('current-user-id', user.id)
          window.location.replace('/index.html')
      } else {
          alert('invalid user or password')
      }
  }

  if(document.getElementById(element)) document.getElementById(element).addEventListener('submit', onSubmit)
}