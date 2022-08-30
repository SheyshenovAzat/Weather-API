const API = 'https://api.github.com/users/'

// const haeder = document.querySelector('header')
const form = document.querySelector('form')
const input = document.getElementById('inp')
const output = document.querySelector('#output')


const searchUser = async () => {
    let request = await fetch(API + input.value)
    let response = await request.json()
    renderUser(response);
    input.value = ''
}

const renderUser = (user) => {
    console.log(user);
    const avatar = document.createElement('img')
    avatar.src = user.avatar_url
    avatar.addEventListener('click', () => document.location.href = user.html_url)

    const login = document.createElement('h1')
    login.textContent = user.login

    const followers = document.createElement('p')
    const following = document.createElement('p')

    followers.textContent = 'Followers: ' + user.followers
    following.textContent = 'Following: ' + user.following

    output.append(avatar, login, followers, following)
}











form.addEventListener('submit', (event) => {
    event.preventDefault()
    searchUser()
})
