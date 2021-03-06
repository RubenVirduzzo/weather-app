 const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const section = document.querySelector('section')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const location = search.value

    fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            section.innerHTML = `<p class="forecast">${data.error}</p>`
        } else {
        
            section.innerHTML += `<div class="forecast">
                                    <p><img src="${data.icon}" alt="Icon"></p>
                                    <hr>
                                    <p>${data.forecast}</p>
                                    <p>Temperature: ${data.temperature}</p>
                                    <p>Feels like: ${data.feelslike}</p>
                                    <p>${data.location}</p>
                                 </div>
                                 `
        }
    })
})
})

 