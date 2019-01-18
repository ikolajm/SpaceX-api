let url = 'https://api.spacexdata.com/v3/rockets';
let search = document.querySelector('form');
let results = document.querySelector('#results');

search.addEventListener('submit', getRocket);

function getRocket(e)  {
    e.preventDefault();

    url = 'https://api.spacexdata.com/v3/rockets';

    // Take input in string and check to see if a rocket matches
    let query = document.querySelector('select').value;

    if (query !== '') {
        if (query == 'Falcon 1') {
            url += '/falcon1';
        } else if (query == 'Falcon 9') {
            url += '/falcon9';
        } else if (query == 'Falcon Heavy') {
            url += '/falconheavy';
        } else if (query == 'Big Falcon Rocket (BFR)') {
            url += '/bfr';
        }
    }

    fetch(url).then(result => {
        return result.json();
    }).then(json => {
        rocketInfo(json);
    })
}

function rocketInfo(json) {
    // Loop to wipe on new search
    while (results.firstChild) {
        results.removeChild(results.firstChild);
    }

    if (Array.isArray(json) === true) {
        json.forEach(option => {
            console.log(option);
            returnInfo(option);
        });    
    } else {
        returnInfo(json);    
    }

}

function returnInfo(json) {
    // CREATION/SETUP
            // Make a container div
            let cont = document.createElement('div');
            cont.classList.add('card')
            // Make an image
            let img = document.createElement('img');
            img.classList.add('card-img-top');
            img.src = json.flickr_images[0];
            img.alt = json.rocket_name;
            // Text body
            let textBody = document.createElement('div');
            textBody.classList.add('card-body');
            // Make a name
            let name = document.createElement('h2');
            name.classList.add('card-title');
            name.innerText = json.rocket_name;
            // Make a description
            let desc = document.createElement('p');
            desc.innerText = json.description;
            // Specs div
            let specs = document.createElement('div');
            specs.classList.add('specs');
                // Sub head
                let sub = document.createElement('h4');
                sub.innerText = "Rocket Specs:"
                // First flight
                let ff = document.createElement('p');
                ff.innerText = `First flight: ${json.first_flight}`;
                // Height
                let h = document.createElement('p');
                h.innerText = `Height: ${json.height.feet}ft`;
                // Diameter
                let di = document.createElement('p');
                di.innerText = `Diameter: ${json.diameter.feet}ft`;
                // Mass
                let m = document.createElement('p');
                m.innerText = `Mass: ${json.mass.lb}lbs`;
                // Landing legs
                let leg = document.createElement('p');
                leg.innerText = `Landing legs: ${json.landing_legs.number}`;
                // Cost per launch
                let cost = document.createElement('p');
                cost.innerText = `Price to launch: $${json.cost_per_launch}`;
                // Success rate %
                let succ = document.createElement('p');
                succ.innerText = `Flight success rate: ${json.success_rate_pct}%`;
                // Further reading
                let read = document.createElement('p');
                let rl = document.createElement('a');
                read.innerText = `Read more about ${json.rocket_name} `;
                rl.innerText = `here`;
                rl.href = json.wikipedia;

        // APPENDING CHILDREN
            cont.appendChild(img);
            cont.appendChild(textBody);
            textBody.appendChild(name);
            textBody.appendChild(desc);
            textBody.appendChild(sub);
            specs.appendChild(ff);
            specs.appendChild(h);
            specs.appendChild(di);
            specs.appendChild(m);
            specs.appendChild(leg);
            specs.appendChild(cost);
            specs.appendChild(succ);
            read.appendChild(rl);
            specs.appendChild(read);
            textBody.appendChild(specs);
            results.appendChild(cont);
}