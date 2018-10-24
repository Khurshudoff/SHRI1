import _ from 'lodash';
import './style.css';
import './style.sass';
import 'hamburgers/dist/hamburgers.css'
const events = require('./events.json').events;


const hamb = document.getElementsByClassName('hamburger')[0];
hamb.addEventListener('click', function(){
    hamb.classList.toggle('is-active');
    if(hamb.classList.contains('is-active')){
        document.getElementsByClassName('menu')[0].style.display = 'block'
    } else {
        document.getElementsByClassName('menu')[0].style.display = 'none'
    }
});


function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}

const images = importAll(require.context('./images', false, /\.(pdf|png|jpe?g|svg)$/));

function parser() {
    const card_wrapper = document.getElementsByClassName('card_wrapper')[0];
    events.forEach(function(event, index, array){
        let card = document.createElement('div');

        card.classList.add('card');
        card.classList.add(event.size);
        if(event.type === 'critical')
            card.classList.add('critical');

        card.innerHTML += '<a class="card_close_img" href="#">' +
            '<img src="images/close_img.svg" alt="close_img">' +
            '</a>\n';

        // card_top

        let card_top = document.createElement('div');

        card_top.classList.add('card_top-info');

        card_top.innerHTML += '<img src="images/' +
            event.icon +
            '.svg" alt="card_logo" class="card_logo">';

        card_top.innerHTML += '<h3 class="card_title"><span>' +
            event.title +
            '</span></h3>';

        card_top.innerHTML += '<span class="card_source">' +
            event.source +
            '</span>';

        card_top.innerHTML += '<span class="card_time">' +
            event.time +
            '</span>\n';

        card.appendChild(card_top);

        // card_data

        let card_data = document.createElement('div');
        card_data.classList.add('card_data');

        if(event.description != null){
            card_data.innerHTML += '<span class="card_desription">' +
                event.description +
                '</span>'
        }
        if(event.data != null){
            // first image
            if(event.data.type != null){
                if(event.data.type === 'graph'){
                    card_data.innerHTML += '<img class="card_img" src="images/grafik.png" alt="grafik">\n'
                }
            }

            // temp and wetness
            if(event.data.temperature != null) {
                card_data.innerHTML += '<div><span class="card_data_temp">\n' +
                    'Температура: <span class="bold">' +
                    event.data.temperature +
                    'C</span>\n' +
                    '</span>' +
                    '<span class="card_data_wetness">\n' +
                    'Влажность: <span class="bold">' +
                    event.data.humidity +
                    '%</span>\n' +
                    '</span></div>'
            }

            // image
            if(event.data.image != null){
                card_data.innerHTML += '<img class="card_img" src="images/image.jpg" alt="pylesos">' +
                    '<span class="zoom">Приближение: 78%</span><span class="brightness">Яркость: 58%</span>'
            }

            //buttons
            if(event.data.buttons != null){
                card_data.innerHTML += '<div class="card_data_button-block">\n' +
                    '                    <button class="card_data_button">\n' +
                    event.data.buttons[0] +
                    '                    </button>\n' +
                    '                    <button class="card_data_button">\n' +
                    event.data.buttons[1] +
                    '                    </button>\n' +
                    '                </div>'
            }

            //music
            if(event.data.albumcover != null){

                const card_data_music = document.createElement('div');
                card_data_music.classList.add('card_data_music');

                card_data_music.innerHTML += '<img class="card_data_albumcover" src="' +
                    event.data.albumcover +
                    '" alt="asd">\n';

                card_data_music.innerHTML += '<span class="card_data_artist">\n' +
                    event.data.artist +
                    ' -\n <span class="card_data_track_name">' +
                    event.data.track.name +
                    '</span>\n </span>';

                card_data_music.innerHTML += '<input class="card_data_track_input" type="range" name="length" min="0" max="' +
                    (parseInt(event.data.track.length[0]) + parseInt(event.data.track.length[2]+event.data.track.length[3])) +
                    '">\n <span class="card_data_track_time">' +
                    event.data.track.length +
                    '</span>';

                card_data_music.innerHTML += '<div class="card_data_controls">\n' +
                    '                        <span class="prev"><img src="images/Prev.svg" alt="prev_button"></span>\n' +
                    '                        <span class="next"><img src="images/Prev.svg" alt="next_button"></span>\n' +
                    '                    </div>';

                card_data_music.innerHTML += '<input class="card_data_volume" type="range" name="length" min="0" max="100">\n' +
                    '                    <span class="card_data_volume-perc">' +
                    event.data.volume +
                    '%</span>'

                card_data.appendChild(card_data_music);
            }
        }

        if(card_data.innerHTML !== ''){
            card.appendChild(card_data);
        }

        card.innerHTML += '<a class="card_open_img" href="#"><img src="images/right_arrow.svg" alt="open_img"></a>\n';

        card_wrapper.appendChild(card)
    })
}

parser();