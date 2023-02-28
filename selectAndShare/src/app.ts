const form = document.querySelector('form')!
const addressInput = document.getElementById('address')! as HTMLInputElement

function onSearch(event: Event) {
    event.preventDefault()
    const enteredAddress = addressInput.value
}

form.addEventListener('submit', onSearch)
