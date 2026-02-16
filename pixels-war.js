// using vite, we can write our code with URLs that simply read /api/v2/xxx and
// vite will proxy them to whichever server is configured in vite.config.js,
// which is currently set to https://pixels-war.fly.dev
// so there's essentially no need for a global variable with the server URL..
// const PREFIX = `/api/v2/${MAP_ID}`

// it's probably wise to start with the test map
let MAP_ID = "TEST"
let API_KEY = undefined

document.addEventListener("DOMContentLoaded", async () => {

    // for starters we get the list of maps from the server
    // and use that to populate the mapid input
    // so we don't have to guess the map ids

    const maps_response = await fetch(`/api/v2/maps`, {credentials: "include"})
    const maps_json = await maps_response.json()

    //SPOILER:
    // test for the response status code, and if not 2xx,
    // use alert() to display an ehopefully meaningful error
    if (!maps_response.ok) {
        alert(`Error retrieving maps: ${maps_response.status} ${maps_response.statusText}`)
        return
    }

    //SPOILER:
    // when the response is good, use the resulting JSON
    // to populate the datalist in the HTML,
    // so the user picks among actually available maps
    const datalist = document.getElementById("mapids-list")
    maps_json.forEach(map => {
        const option = document.createElement("option")
        option.value = map.name
        datalist.appendChild(option)
    })

    //TODO:
    // write the connect(..) function below, and attach it
    // to the Connect button

    //TODO:
    // now that we have the init JSON, we can
    // display the grid, and retrieve corresponding the API-KEY

    //TODO:
    // now that we have the API-KEY,
    // write a refresh(...) function that updates the grid
    // and attach this function to the refresh button click

    //TODO:
    // to be able to color a pixel: write a set_pixel(...)
    // function that sends a request to the server to color a pixel
    // and attach this function to each pixel in the grid click
    // the color is taken from the color picker (code provided below)
    // it's up to you to find a way to get the pixel coordinates

    //TODO:
    // why not refresh the grid every 2 seconds?
    // or even refresh the grid after clicking a pixel?

    // ---- cosmetic / convenience / bonus:

    //TODO: for advanced students, make it so we can change maps from the UI
    // using e.g. the Connect button in the HTML

    // TODO: to be efficient, it would be useful to display somewhere
    // the coordinates of the pixel hovered by the mouse

    //TODO: for the quick ones: display somewhere how much time
    // you need to wait before being able to post again

    //TODO: for advanced users: it could be useful to be able to
    // choose the color from a pixel?


    // To complete and then attach to the connect button
    async function connect(event) {
        //TODO:
        // - retrieves the selected map id from the input
        // - sends the /init request to the server for this map id
        // - check the response status code as usual
        // - initialize the map when OK
    }

    // Little helper function to retrieve the clicked color in RGB
    function getPickedColorInRGB() {
        const colorHexa = document.getElementById("colorpicker").value

        const r = parseInt(colorHexa.substring(1, 3), 16)
        const g = parseInt(colorHexa.substring(3, 5), 16)
        const b = parseInt(colorHexa.substring(5, 7), 16)

        return [r, g, b]
    }

    // in the other direction, to put the color of a pixel in the color picker
    // (the color picker insists on having a color in hexadecimal...)
    function pickColorFrom(div) {
        // rather than taking div.style.backgroundColor
        // whose format we don't necessarily know
        // we use this which returns a 'rgb(r, g, b)'
        const bg = window.getComputedStyle(div).backgroundColor
        // we keep the 3 numbers in an array of strings
        const [r, g, b] = bg.match(/\d+/g)
        // we convert them to hexadecimal
        const rh = parseInt(r).toString(16).padStart(2, '0')
        const gh = parseInt(g).toString(16).padStart(2, '0')
        const bh = parseInt(b).toString(16).padStart(2, '0')
        const hex = `#${rh}${gh}${bh}`
        // we put the color in the color picker
        document.getElementById("colorpicker").value = hex
    }

})
