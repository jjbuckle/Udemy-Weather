


const weatherForm = document.getElementById('weatherForm')
const searchElement = document.getElementById('weatherSearch')
const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')

// messageOne.textContent = 'Fun with node.js'

weatherForm.addEventListener('submit', (e) => {

    e.preventDefault()
    const weatherQueryURL = '/weather?address=' + searchElement.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch(weatherQueryURL).then((response) => {
        {
            response.json().then((data) => {

                if (data.error) {
                    messageOne.textContent = data.error
                    // console.log(data.error)
                } else {
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.forecastdata
                    // console.log(data.location)
                    // console.log(data.forecastdata)

                }
            }
            )
        }
    })

})