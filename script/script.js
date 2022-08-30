const API = "https://api.openweathermap.org/data/2.5/weather?q="
const key = '&appid=9f964bde66bc914b823e5951e11d839e'


const form = document.querySelector('form')
const output = document.querySelector('.output')
const text_content = document.querySelector('#text_content')
const map_output = document.querySelector('.map')

const getWeather = async () => {
    const inp = document.querySelector('#inp')
    const url = API + inp.value + key
    const request = await fetch(url)
    const response = await request.json()
    renderWeather(response);
    getMap(response.coord)
    inp.value = ''
}

const renderWeather = (weather) => {
    // console.log(weather);
    text_content.innerHTML = ''
    map_output.innerHTML = ''
    const name = document.createElement('h1')
    name.textContent = 'City: ' + weather.name
    const temp_c = document.createElement('h2')
    temp_c.textContent = 'Temp C: ' + Math.round(weather.main.temp - 273.15)
    const temp_f = document.createElement('h2')
    temp_f.textContent = 'Temp F: ' + Math.round(((weather.main.temp - 273.15) * 1.8) + 32)
    const weathe = document.createElement('h2')
    weathe.textContent = 'Weather: ' + weather.weather[0].main
    const desc = document.createElement('h2')
    desc.textContent = 'Description: ' + weather.weather[0].description
    const code = document.createElement('h2')
    code.textContent = 'Country: ' + weather.sys.country


    text_content.append(name, temp_c, temp_f, weathe, desc, code)
}




form.addEventListener('submit', (event) => {
    event.preventDefault()
    getWeather()
})

const getMap = ({ lat, lon }) => {
    let map = document.createElement('div')
    map.id = 'map'
    map.style.width = '500px'
    map.style.height = '400px'
    DG.then(function () {
        map = DG.map('map', {
            center: [lat, lon],
            zoom: 13
        });

        DG.marker([lat, lon]).addTo(map).bindPopup('Вы кликнули по мне!');
    });
    map_output.append(map);
}