import _ from 'lodash';

const spin = document.getElementById('startSpinning');
spin.addEventListener('click', startSpinning);

function startSpinning() {
    const url = 'http://localhost:8080/api/play';
    const request = new Request(url, {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'text/plain'
        })
    });

    fetch(request)
        .then(
            response => {
                if (response.status !== 200) {
                    console.log(`Something went wrong. Status Code: ${response.status}`);
                    return;
                }
                response.json().then(data => {
                    clearDivContent('one');
                    clearDivContent('two');
                    clearDivContent('three');
                    clearDivContent('winnerText');

                    document.getElementById('one').appendChild(createImage(data.numbers[0]));
                    document.getElementById('two').appendChild(createImage(data.numbers[1]));
                    document.getElementById('three').appendChild(createImage(data.numbers[2]));
                    document.getElementById('winnerText').textContent = data.winnerText;

                    if (data.freeSpin) {
                        document.getElementById('startSpinning').style.pointerEvents  = 'none';
                        document.getElementById('startSpinning').style.opacity  = '.5';
                        document.getElementById('freeSpinText').style.visibility  = 'visible';
                        
                        setTimeout(() => {
                            startSpinning();
                        }, 2000);
                    } else {
                        document.getElementById('startSpinning').style.pointerEvents = 'auto';
                        document.getElementById('startSpinning').style.opacity  = '1';
                        document.getElementById('freeSpinText').style.visibility  = 'hidden';
                    }
                });
            }
        )
        .catch(err => {
            console.log(`Fetch Error ${err}`);
        });
}

function createImage(picNumber) {
    const img = document.createElement('img');
    img.src = `img/Sloth_${picNumber}.png`;
    return img;
}

function clearDivContent(id) {
    const div = document.getElementById(id);
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}