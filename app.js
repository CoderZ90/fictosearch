// Javascript PART
// lets get all the material needed first
let input = document.querySelector('#input');
let searchBtn = document.querySelector('#search');
let apiKey = 'd42f9402-ee5c-4382-932b-cf8d3f7c082e';
let notFound = document.querySelector('.not__found');
let defBox = document.querySelector('.defi');
let audioBox = document.querySelector('.audio');
let loader = document.querySelector('.loading');

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // cleaning
    notFound.innerText = '';
    audioBox.innerHTML = '';
    defBox.innerHTML = '';

    // Get data
    let word = input.value;
    if (word === '') {
        alert('Please Enter a word to search...');
        return;
    }
    // if nto empty
    getData(word);
});

async function getData(word) {
    // loading
    loader.style.display = 'block';
    // Ajax Call
    const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`);
    const data = await response.json();
    // if empty result
    if (!data.length) {
        loader.style.display = 'none';
        notFound.innerHTML = 'No results found';
        return;
    }
    // if result notFound and if its = suggestion then 
    if (typeof data[0] === 'string') {
        loader.style.display = 'none';

        let heading = document.createElement('h3');
        heading.innerText = 'Try searching one of these';
        notFound.appendChild(heading);

        data.forEach(element => {
            let suggestion = document.createElement('span');
            // adding class
            suggestion.classList.add('suggested');
            suggestion.innerText = element;
            notFound.appendChild(suggestion);
        });

        return;
    }

    let defination = data[0].shortdef[0];
    defBox.innerText = defination;
    loader.style.display = 'none';
    // Sorry guys my pc got shutdown in middle of the recording LOl
    
    // Sound
    const soundName = data[0].hwi.prs[0].sound.audio;
    if (soundName) {
        renderSound(soundName);
    }

    console.log(data);
}

function renderSound(soundName) {
    let subFolder = soundName.charAt(0);
    let soundSrc = `https://media.merriam-webster.com/soundc11/${subFolder}/${soundName}.wav?${apiKey}`;
    
    let aud = document.createElement('audio');
    aud.src = soundSrc;
    aud.controls = true;
    audioBox.appendChild(aud);
}