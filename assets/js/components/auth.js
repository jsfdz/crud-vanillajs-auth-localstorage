export const auth = () => {
  const isAuth = window.localStorage.getItem('authenticated')

  //Proteger ruta
  if (!isAuth) {
    if(window.location.pathname === '/index.html' || window.location.pathname === '/') {
      window.location.href = '/login.html'
    }
  } else {
    if(window.location.pathname !== '/index.html' || window.location.pathname === '/') {
      window.location.href = '/index.html'
    }
  }
  
  const username = window.localStorage.getItem('current-user')
  if (document.getElementById('user-name')) document.getElementById('user-name').textContent = username

  //Cerrar Sesion
  function logout () {
    window.localStorage.removeItem('current-user')
    window.localStorage.removeItem('current-user-id')
    window.localStorage.removeItem('authenticated')
    window.location.replace('/login.html')
  }

  if (document.getElementById('home-logout')) document.getElementById('home-logout').addEventListener('click', logout)
}