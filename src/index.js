const DOGS_URL = 'http://localhost:3000/dogs'

document.addEventListener('DOMContentLoaded', () => {
fetchDogs()
submitForm()
})

function fetchDogs(){
    fetch(DOGS_URL)
    .then( res => res.json() )
    .then( dogs => renderDogs(dogs) )
}

function renderDogs(dogs){
    table = document.getElementById('table-body')
    table.innerHTML = ''
    dogs.forEach( dog => { renderDog(dog, table) })
}

function renderDog(dog, table){
    
    
    tr = document.createElement('tr')
    tr.innerHTML = `<td>${dog.name}</td>
    <td>${dog.breed}</td>
    <td>${dog.sex}</td>
    <td><button> Edit Dog </button></td>
    `
    editButton = tr.querySelector('button')
    editButton.addEventListener('click', e => {
     dogForm = document.getElementById('dog-form')
     dogForm.dataset.id = dog.id
     dogForm.name.value = dog.name
     dogForm.breed.value = dog.breed
     dogForm.sex.value = dog.sex
    })
    table.appendChild(tr)
}

function submitForm() {
    document.addEventListener('submit', e => {
        e.preventDefault()
        const dogForm = e.target
        
        let id = dogForm.dataset.id
        let name = dogForm.name.value
        let breed = dogForm.breed.value
        let sex = dogForm.sex.value

        const body = {name, breed, sex}

        updateDog(id,body)
    })
}

function updateDog(id, body) {
    fetch(`${DOGS_URL}/${id}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
            accept: 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then( res => res.json() )
    .then( fetchDogs )
}