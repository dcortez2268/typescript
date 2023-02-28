import axios from 'axios'

const form = document.querySelector('form')!
const addressInput = document.getElementById('address')! as HTMLInputElement

const GOOGLE_API_KEY = 'AIzaSyASngE81hzOEP0DosZ4kGO1_gJEOGvP0Ik'

type GeocodingResponse = {
    results: { geometry: { location: { lat: number; lng: number } } }[]
    status: 'OK' | 'ZERO_RESULTS'
}

async function onSearch(event: Event) {
    event.preventDefault()
    const enteredAddress = addressInput.value

    try {
        let response = await axios.get<GeocodingResponse>(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
                enteredAddress
            )}&key=${GOOGLE_API_KEY}`
        )

        if (response.data.status !== 'OK') {
            throw new Error('Could not fetch this location!')
        }
        const coordinates = response.data.results[0].geometry.location
        const map = new google.maps.Map(document.getElementById('map')!, {
            center: coordinates,
            zoom: 13,
        })
        new google.maps.Marker({
            position: coordinates,
            map: map,
        })
    } catch (error) {
        if (error instanceof Error) {
            alert(error.message)
        }
        console.log(error)
    }
}

form.addEventListener('submit', onSearch)
