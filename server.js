const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

app.get('/download/', async (req, res) => {
    if (!req.query.url || req.query.url == null) {
        return res.send('enter a url parameter.')
    }
    if (!req.query.url.includes('https') || !req.query.url.includes('youtube') || !req.query.url.includes('youtu.be')) {
        if (req.query.url.includes('youtube') || req.query.url.includes('youtu.be')) {
            const fs = require('fs');
            // TypeScript: import ytdl from 'ytdl-core'; with --esModuleInterop
            // TypeScript: import * as ytdl from 'ytdl-core'; with --allowSyntheticDefaultImports
            // TypeScript: import ytdl = require('ytdl-core'); with neither of the above
            const {
                Youtube
            } = require('ytdownloader.js')
            let thing;
            if (req.query.type == "mp3") {
                thing = await new Youtube().ytmp3(req.query.url)
            } else {
                if (req.query.type == "mp4") {
                    thing = await new Youtube().ytmp4(req.query.url)
                } else {
                    return res.send('INVALID PARAMETERS!!! <a href="/">go back</a>')
                }
            }
            let url;
            console.log(thing)
            if (req.query.type == "mp4") {
                url = thing.dl_link
            } else {
                url = thing.dl_link
            }
            if (url !== undefined) {
                if (req.query.type == "mp3") {
                    res.send(`
      <html>
  <head>
  <link rel="icon" type="image/png" href="https://i.ibb.co/h9DLdSZ/image.png">
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <title>down - a mp3/mp4 converter for most services</title>
    <meta property="og:title" content="down - a mp3/mp4 converter for most services">
<meta property="og:description" content="A simple mp3/mp4 converter. No ads, no bullsh!t.">
<meta property="og:image" content="https://i.ibb.co/C1Y7hNK/image.png">
<meta property="og:url" content="https://antica.secretgunner.repl.co">
<meta name="twitter:card" content="summary_large_image">
    <style>
         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap');

html {
  font-family: 'Syne', 'Arial', sans-serif;
  display:flex;
  justify-content:center;
  margin:50px;
}

body {
  background:#1e1e1e;
  color:white;
  text-align:center;
} 

#upbo {
  border-radius: 12px;
   border-width:1px;
   border-style:solid;
  width: 30vw;
  padding: 10px;
  -webkit-transition: width 1s ease-in-out;
    -moz-transition: width 1s ease-in-out;
    -o-transition: width 1s ease-in-out;
    transition: width 1s ease-in-out;
}

#upbo:focus {
  -webkit-transition: width 1s ease-in-out;
    -moz-transition: width 1s ease-in-out;
    -o-transition: width 1s ease-in-out;
    transition: width 1s ease-in-out;
  width: 80vw;
}

.radios {
  font-size:20px;
  gap:20px;
}

.radios > .radio > input {
  display:none;
}

.radios > label {
  background-color: #9d9d9d;
  color:black;
}

select {

  /* styling */
  background-color: white;
  border: thin solid blue;
  border-radius: 4px;
  display: inline-block;
  font: inherit;
  line-height: 1.5em;
  padding: 0.5em 3.5em 0.5em 1em;

  /* reset */

  margin: 0;      
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
}


/* arrows */

select.classic {
  background-image:
    linear-gradient(45deg, transparent 50%, blue 50%),
    linear-gradient(135deg, blue 50%, transparent 50%),
    linear-gradient(to right, skyblue, skyblue);
  background-position:
    calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px),
    100% 0;
  background-size:
    5px 5px,
    5px 5px,
    2.5em 2.5em;
  background-repeat: no-repeat;
}

select.classic:focus {
  background-image:
    linear-gradient(45deg, white 50%, transparent 50%),
    linear-gradient(135deg, transparent 50%, white 50%),
    linear-gradient(to right, gray, gray);
  background-position:
    calc(100% - 15px) 1em,
    calc(100% - 20px) 1em,
    100% 0;
  background-size:
    5px 5px,
    5px 5px,
    2.5em 2.5em;
  background-repeat: no-repeat;
  border-color: grey;
  outline: 0;
}




select.round {
  background-image:
    linear-gradient(45deg, transparent 50%, gray 50%),
    linear-gradient(135deg, gray 50%, transparent 50%),
    radial-gradient(#ddd 70%, transparent 72%);
  background-position:
    calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px),
    calc(100% - .5em) .5em;
  background-size:
    5px 5px,
    5px 5px,
    1.5em 1.5em;
  background-repeat: no-repeat;
}

select.round:focus {
  background-image:
    linear-gradient(45deg, white 50%, transparent 50%),
    linear-gradient(135deg, transparent 50%, white 50%),
    radial-gradient(gray 70%, transparent 72%);
  background-position:
    calc(100% - 15px) 1em,
    calc(100% - 20px) 1em,
    calc(100% - .5em) .5em;
  background-size:
    5px 5px,
    5px 5px,
    1.5em 1.5em;
  background-repeat: no-repeat;
  border-color: green;
  outline: 0;
}





select.minimal {
  background-image:
    linear-gradient(45deg, transparent 50%, gray 50%),
    linear-gradient(135deg, gray 50%, transparent 50%),
    linear-gradient(to right, #ccc, #ccc);
  background-position:
    calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px),
    calc(100% - 2.5em) 0.5em;
  background-size:
    5px 5px,
    5px 5px,
    1px 1.5em;
  background-repeat: no-repeat;
}

select.minimal:focus {
  background-image:
    linear-gradient(45deg, green 50%, transparent 50%),
    linear-gradient(135deg, transparent 50%, green 50%),
    linear-gradient(to right, #ccc, #ccc);
  background-position:
    calc(100% - 15px) 1em,
    calc(100% - 20px) 1em,
    calc(100% - 2.5em) 0.5em;
  background-size:
    5px 5px,
    5px 5px,
    1px 1.5em;
  background-repeat: no-repeat;
  border-color: green;
  outline: 0;
}


select:-moz-focusring {
  color: transparent;
  text-shadow: 0 0 0 #000;
}

button {
  padding:10px;
  border-radius:30px;
  border: 2px white solid;
  background-color: #000;
  color:white;
  font-family: Syne, Arial, sans-serif;
}
    </style>
  </head>
  <body>
    <h1 style="font-size:40px;">↓ down</h1>
    <p>Enter a link below and choose between .mp3 and .mp4 downloads</p>
    <form>
    <input placeholder="Enter a URL" id="upbo" type="url" value="${req.query.url}">
      <br><br>
      <h3>Choose a download type</h3>
      <select class="minimal">
           <option value="mp3">AUTO</option>
    <option value="mp3">.mp3</option>
    <option value="mp4">.mp4</option>
      </select>
      <br><br><br>
      <button type="submit">
        Convert
      </button>
    </form><br><h3>finished!</h3>
    <div style="display:flex; align-items:center; justify-content:center; width: auto; gap:20px;"><audio src="${url}" controls controlsList="nodownload noplaybackrate"></audio>
    <button onclick="window.location.assign('${url}')">
    Download
    </button></div>
    
    <script>
      const URL = document.getElementById('upbo')
const select = document.querySelector('select')
const form = document.querySelector('form')

form.addEventListener("submit", function(event){
  event.preventDefault()
  
  window.location.assign('/download/?url=' + URL.value + '&type=' + select.options[select.selectedIndex].value)
}); 
    </script>
  </body>
</html>
`)
                } else if (req.query.type == "mp4") {
                    return res.send(`
      <html>
  <head>
  <link rel="icon" type="image/png" href="https://i.ibb.co/h9DLdSZ/image.png">
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <title>down - a mp3/mp4 converter for most services</title>
    <meta property="og:title" content="down - a mp3/mp4 converter for most services">
<meta property="og:description" content="A simple mp3/mp4 converter. No ads, no bullsh!t.">
<meta property="og:image" content="https://i.ibb.co/C1Y7hNK/image.png">
<meta property="og:url" content="https://antica.secretgunner.repl.co">
<meta name="twitter:card" content="summary_large_image">
    <style>
         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap');

html {
  font-family: 'Syne', 'Arial', sans-serif;
  display:flex;
  justify-content:center;
  margin:50px;
}

body {
  background:#1e1e1e;
  color:white;
  text-align:center;
} 

#upbo {
  border-radius: 12px;
   border-width:1px;
   border-style:solid;
  width: 30vw;
  padding: 10px;
  -webkit-transition: width 1s ease-in-out;
    -moz-transition: width 1s ease-in-out;
    -o-transition: width 1s ease-in-out;
    transition: width 1s ease-in-out;
}

#upbo:focus {
  -webkit-transition: width 1s ease-in-out;
    -moz-transition: width 1s ease-in-out;
    -o-transition: width 1s ease-in-out;
    transition: width 1s ease-in-out;
  width: 80vw;
}

.radios {
  font-size:20px;
  gap:20px;
}

.radios > .radio > input {
  display:none;
}

.radios > label {
  background-color: #9d9d9d;
  color:black;
}

select {

  /* styling */
  background-color: white;
  border: thin solid blue;
  border-radius: 4px;
  display: inline-block;
  font: inherit;
  line-height: 1.5em;
  padding: 0.5em 3.5em 0.5em 1em;

  /* reset */

  margin: 0;      
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
}


/* arrows */

select.classic {
  background-image:
    linear-gradient(45deg, transparent 50%, blue 50%),
    linear-gradient(135deg, blue 50%, transparent 50%),
    linear-gradient(to right, skyblue, skyblue);
  background-position:
    calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px),
    100% 0;
  background-size:
    5px 5px,
    5px 5px,
    2.5em 2.5em;
  background-repeat: no-repeat;
}

select.classic:focus {
  background-image:
    linear-gradient(45deg, white 50%, transparent 50%),
    linear-gradient(135deg, transparent 50%, white 50%),
    linear-gradient(to right, gray, gray);
  background-position:
    calc(100% - 15px) 1em,
    calc(100% - 20px) 1em,
    100% 0;
  background-size:
    5px 5px,
    5px 5px,
    2.5em 2.5em;
  background-repeat: no-repeat;
  border-color: grey;
  outline: 0;
}




select.round {
  background-image:
    linear-gradient(45deg, transparent 50%, gray 50%),
    linear-gradient(135deg, gray 50%, transparent 50%),
    radial-gradient(#ddd 70%, transparent 72%);
  background-position:
    calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px),
    calc(100% - .5em) .5em;
  background-size:
    5px 5px,
    5px 5px,
    1.5em 1.5em;
  background-repeat: no-repeat;
}

select.round:focus {
  background-image:
    linear-gradient(45deg, white 50%, transparent 50%),
    linear-gradient(135deg, transparent 50%, white 50%),
    radial-gradient(gray 70%, transparent 72%);
  background-position:
    calc(100% - 15px) 1em,
    calc(100% - 20px) 1em,
    calc(100% - .5em) .5em;
  background-size:
    5px 5px,
    5px 5px,
    1.5em 1.5em;
  background-repeat: no-repeat;
  border-color: green;
  outline: 0;
}





select.minimal {
  background-image:
    linear-gradient(45deg, transparent 50%, gray 50%),
    linear-gradient(135deg, gray 50%, transparent 50%),
    linear-gradient(to right, #ccc, #ccc);
  background-position:
    calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px),
    calc(100% - 2.5em) 0.5em;
  background-size:
    5px 5px,
    5px 5px,
    1px 1.5em;
  background-repeat: no-repeat;
}

select.minimal:focus {
  background-image:
    linear-gradient(45deg, green 50%, transparent 50%),
    linear-gradient(135deg, transparent 50%, green 50%),
    linear-gradient(to right, #ccc, #ccc);
  background-position:
    calc(100% - 15px) 1em,
    calc(100% - 20px) 1em,
    calc(100% - 2.5em) 0.5em;
  background-size:
    5px 5px,
    5px 5px,
    1px 1.5em;
  background-repeat: no-repeat;
  border-color: green;
  outline: 0;
}


select:-moz-focusring {
  color: transparent;
  text-shadow: 0 0 0 #000;
}

button {
  padding:10px;
  border-radius:30px;
  border: 2px white solid;
  background-color: #000;
  color:white;
  font-family: Syne, Arial, sans-serif;
}
    </style>
  </head>
  <body>
    <h1 style="font-size:40px;">↓ down</h1>
    <p>Enter a link below and choose between .mp3 and .mp4 downloads</p>
    <form>
    <input placeholder="Enter a URL" id="upbo" type="url" value="${req.query.url}">
      <br><br>
      <h3>Choose a download type</h3>
      <select class="minimal">
           <option value="mp3">AUTO</option>
    <option value="mp3">.mp3</option>
    <option value="mp4">.mp4</option>
      </select>
      <br><br><br>
      <button type="submit">
        Convert
      </button>
    </form><br>
    <h3>finished!</h3>

    <video src="${url}" controls width="600" height="400"></video><br><br>
         <button onclick="window.location.assign('${url}')">
    Download
    </button>
   <br> <br> <br>
    
    <script>
      const URL = document.getElementById('upbo')
const select = document.querySelector('select')
const form = document.querySelector('form')

form.addEventListener("submit", function(event){
  event.preventDefault()
  
  window.location.assign('/download/?url=' + URL.value + '&type=' + select.options[select.selectedIndex].value)
}); 
    </script>
  </body>
</html>
`)
                }
            }

            if (req.query.url.includes('open.spotify.com')) {
                const fs = require('fs');
                const spdl = require('spdl-core').default;
                // Typescript: import spdl from 'spdl-core';

                spdl.getInfo(req.query.url).then(infos => {
                    spdl(infos.url).then(stream => {
                        stream.on('end', () => console.log('Done!'));
                        stream.pipe(fs.createWriteStream(`${infos.title}.mp3`)).then(() => {
                            res.sendFile(__dirname + `/${infos.title}.mp3`)
                        });
                    });
                });



            }
        }
        if (req.query.url.includes('soundcloud')) {
            const SoundCloud = require("soundcloud-scraper");
            const client = new SoundCloud.Client();
            const fs = require("fs");

            client.getSongInfo(req.query.url)
                .then(async song => {
                    const stream = await song.downloadProgressive();
                    const writer = stream.pipe(fs.createWriteStream(`./${song.title}.mp3`));
                    writer.on("finish", () => {
                        res.sendFile(__dirname + '/' + song.title + '.mp3')
                        fs.unlink('/' + song.title + '.mp3', () => {
                            console.log('deleted' + __dirname + '/' + song.title + '.mp3')
                        })
                    });
                })
                .catch(console.error);

        }

        if (req.query.url.includes('instagram')) {
            const igdown = require('igdown-scrapper');

            const link = req.query.url;
            let url;
            igdown(link)
                .then((res) => {
                    console.log(res.url[0].url);
                    url = res.url[0].url
                })
                .catch((err) => {
                    console.error(err);
                });
            if (req.query.type == "mp3") {
                res.redirect(url)
            }
        }
        if (req.query.url.includes('roblox') && req.query.url.includes('asset')) {
            let id = req.query.url.replace('https://create.roblox.com/marketplace/asset/', '')

            id = id.split('/')[0]

            res.redirect('https://api.hyra.io/audio/' + id)
        }

    }
})


app.listen(3000, () => {
    console.log('server started');
});
