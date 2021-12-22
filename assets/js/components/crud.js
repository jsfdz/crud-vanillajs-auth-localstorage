import { generateID } from "../utils/generateID.js"

export const crud = ({ list, form }) => {
  const users = JSON.parse(window.localStorage.getItem('users')) || []

  //Cread 
 function create (e) {
    e.preventDefault()

    if (updating) {
      saveEdit()
      return
    }

    const name = e.target[0].value
    const lastname = e.target[1].value
    const email = e.target[2].value

    const newUser = {
      id: generateID(users),
      name,
      lastname,
      email,
      userId: JSON.parse(window.localStorage.getItem('current-user-id'))
    }

    users.push(newUser)
    window.localStorage.setItem('users', JSON.stringify(users))
    readList()
    if(document.getElementById('home-form')) document.getElementById('home-form').reset()
  }

  if (document.getElementById(form)) document.getElementById(form).addEventListener('submit', create)

  //Read
  function readList () {
    if(document.getElementById(list)) {

      //Filtrar por id - ver solo los usuarios que creo el usuario que esta autenticado
      // let user = users.filter(user => user.userId === JSON.parse(window.localStorage.getItem('current-user-id')))
      // remplaza users por user

      if (users.length > 0) {
        let html = ''
    
        html += `<table>
                  <thead>
                    <tr>
                      <th>id</th>
                      <th>Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Actions</th>
                    </tr>
                  </thead><tbody>`
    
        users.forEach(user => {
          html += `<tr>
                    <td data-column="id">${user.id}</td>
                    <td data-column="Name">${user.name}</td>
                    <td data-column="Last Name">${user.lastname}</td>
                    <td data-column="Email">${user.email}</td>
                    <td data-column="Actions">
                      <button class="home__form-action btn-delete" onclick="remove(${user.id})">🗑️</button>
                      <button class="home__form-action btn-update" onclick="update(${user.id})">✏️</button>
                    </td>
                  </tr>`
        })
    
        html += `</tbody>
              </table>`
    
        document.getElementById(list).innerHTML = html
      } else {
        document.getElementById(list).innerHTML = `<span>To get started, add a new user</span>`
      }
    }
  }

  //Update
  let updating = false,
  updatingId = -1

  function update (id) {
    updatingId = id
    const user = users.find(user => user.id === id)
    
    if(document.getElementById('home-form')) {
      document.getElementById('home-name').value = user.name
      document.getElementById('home-lastname').value = user.lastname
      document.getElementById('home-email').value = user.email
    }

    updating = true

    if(document.getElementById('home-form-btn')) document.getElementById('home-form-btn').value = 'update'
  }

  window.update = update

  function saveEdit () {
    const user = users.find(user => user.id === updatingId);

    if(document.getElementById('home-form')) {
      user.name = document.getElementById('home-name').value
      user.lastname = document.getElementById('home-lastname').value
      user.email = document.getElementById('home-email').value
    }

    window.localStorage.setItem('users', JSON.stringify(users))
    readList()
    if(document.getElementById('home-form')) document.getElementById('home-form').reset()

    updating = false
    updatingId = -1

    if(document.getElementById('home-form-btn')) document.getElementById('home-form-btn').value = 'add'
  }

  //Delete
  function remove (id) {
    const index = users.findIndex(user => user.id === id)
    users.splice(index, 1)
    window.localStorage.setItem('users', JSON.stringify(users))
    readList()
    if(document.getElementById('home-form')) document.getElementById('home-form').reset()
  }

  window.remove = remove

  readList()
}