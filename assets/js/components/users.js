export const getUsers = () => {
const users = JSON.parse(window.localStorage.getItem('fakeDB')) || []

return { users }
}