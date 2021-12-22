import { getUsers } from './users.js'
import { generateID } from "../utils/generateID.js"

const { users } = getUsers()

export const register = ({element}) => {
  function onSubmit (e) {
    e.preventDefault()
    const name = document.getElementById('name').value
    const lastname = document.getElementById('lastname').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
  
    const user = {
        id: generateID(users),
        name,
        lastname,
        email,
        password
    }

    users.push(user)
    window.localStorage.setItem('fakeDB', JSON.stringify(users))
    window.location.replace('/login.html')
  }

  if(document.getElementById(element)) document.getElementById(element).addEventListener('submit', onSubmit)
}