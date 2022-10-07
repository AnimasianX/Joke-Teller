const audioElement = document.getElementById('audio');
const button = document.getElementById('button');


//Disable/Enable button
function toggleButton() {
    button.disabled = !button.disabled;
}

//get jokes
async function getJokes() {
    let joke = '';

    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = `${data.joke}`;
        }
        //text to speech
        tellMe(joke);
        //disable button
        toggleButton();
    } catch (error) {
        //catch errors
        console.log("Whoops", error);
    }
}

//passing joke to our text to speech api
function tellMe(joke) {
    VoiceRSS.speech({
        key: '4f4a1f176f774e1f94f667e91f2a794f',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

//event listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
//onLoad
