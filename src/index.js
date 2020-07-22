DOGS_URL = "http://localhost:3000/dogs"

document.addEventListener('DOMContentLoaded', () => {
fetchDogs()

const dogForm = document.getElementById('dog-form')

dogForm.addEventListener('submit', (e)=> {
e.preventDefault()
let dogName = dogForm.name.value
let dogBreed = dogForm.breed.value
let dogSex = dogForm.sex.value

handleNewDogForm(dogName, dogBreed, dogSex)
})

})

function fetchDogs(){
    fetch(DOGS_URL)
    .then( res => res.json() )
    .then( dogs => renderDogs(dogs) )
}

function renderDogs(dogs) {
    dogs.forEach( dog => renderDog(dog) )
}

function renderDog(dog) {
     table = document.getElementById('table')
    
    tr = document.createElement('tr')
    tr.innerHTML = `<td>${dog.name}</td><td>${dog.breed}</td><td>${dog.sex}</td>
    <td><button> Edit Dog </button></td>`
    table.appendChild(tr)

}

function handleNewDogForm(dogName, dogBreed, dogSex) {
    let config = {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
            accept: 'application/json'
        },
        body: JSON.stringify({
            name: dogName,
            breed: dogBreed,
            sex: dogSex
        })
    }
    fetch('http://localhost:3000/dogs/' + `${dog.id}`, config)
    .then( res=> res.json() )
    .then ( updatedDog => renderDog(updatedDog) )
}