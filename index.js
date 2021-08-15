

function hasWhiteSpace(s) {
    return s.indexOf(' ') >= 0;
  }


async function getDataJson(city, units) {
    try{
        const apiKey="69bdc2ac61095411ccb96a5142abc4d9";
        const apiText = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
        const response = await fetch(apiText, {mode: 'cors'});
        const dataJson = await response.json();
        const lat = dataJson["coord"]["lat"];
        const long = dataJson["coord"]["lon"];
        console.log(lat);
        console.log(long);
        const newApiText = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;
        const newResponse = await fetch(newApiText, {mode: 'cors'});
        const newDataJson = await newResponse.json();
        //console.log(dataJson["main"]["temp"])
        return newDataJson;
    } catch(error){
        return error;
    }
}

async function getDataJsonCoords(lat,long, units) {
    try{
        const apiKey="69bdc2ac61095411ccb96a5142abc4d9";
        const newApiText = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;
        const newResponse = await fetch(newApiText, {mode: 'cors'});
        const newDataJson = await newResponse.json();
        //console.log(dataJson["main"]["temp"])
        return newDataJson;
    } catch(error){
        return error;
    }
}




function getTime(unix_timestamp, offset){
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    let date = new Date((unix_timestamp+offset-(60*60)) * 1000);
    // Hours part from the timestamp
    let hours = date.getHours();
    // Minutes part from the timestamp
    let minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    let seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime
}



let icon;
let description;
let temp;
let pressure;
let humidity;
let tempMin;
let tempMax;
let windsSpeed;
let unit = "metric";

function populate(data, unit){
    let unitSymb = (unit=="metric" ? "\u2103" : "\u2109" );
    //icon image of weather
    Promise.resolve(data)
    .then(function(value){
        icon = `http://openweathermap.org/img/wn/${value["current"]["weather"][0]["icon"]}@2x.png`;
        const iconEl = document.querySelector(".js-Weather-icon");
        iconEl.src=icon  
    });





    // weather description short
    Promise.resolve(data)
    .then(function(value){
        const div = document.querySelector(".js-short-desc");
        text = value["current"]["weather"][0]["description"] 
        div.textContent = text;
    });

    //temp now 
    Promise.resolve(data)
    .then(function(value){
        const div = document.querySelector(".js-temp-now");
        text = value["current"]["temp"] 
        div.textContent = text + unitSymb;

    });

    // high and low
    Promise.resolve(data)
    .then(function(value){
        const div = document.querySelector(".js-low-high");
        min = value["daily"][0]["temp"]["min"]
        max = value["daily"][0]["temp"]["max"] 
        div.textContent = `L:${Math.round(min)} ${unitSymb} H:${Math.round(max)} ${unitSymb}`;
    });

    /* ---- NOW DO CARDS ---- */


    //Sunrise 
    Promise.resolve(data)
    .then(function(value){
        const div = document.querySelector(".js-sunrise-text");
        text = value["current"]["sunrise"] 
        let offset = value["timezone_offset"]
        let time = getTime(text, offset)
        div.textContent = time;
    });


    // sunset
    Promise.resolve(data)
    .then(function(value){
        const div = document.querySelector(".js-sunset-text");
        text = value["current"]["sunset"] 
        let offset = value["timezone_offset"]
        let time = getTime(text, offset)
        div.textContent = time;
    });

    //chance of rain
    Promise.resolve(data)
    .then(function(value){
        const div = document.querySelector(".js-rain-text");
        try{
            text = value["daily"][0]["pop"] 
        }
        catch(error){
            console.log(error);
        }
        if(text){
            //div.textContent = round(parseFloat(text)*100)+"%";
            div.textContent = (text*100)+"%";
        }
        else if(!text){
            div.textContent = "N/A";
        }
        
    });
    // humidity

    Promise.resolve(data)
    .then(function(value){
        const div = document.querySelector(".js-humidity-text");
        text = value["current"]["humidity"] 
        div.textContent = text+"%";
    });

    // wind speed

    Promise.resolve(data)
    .then(function(value){
        const div = document.querySelector(".js-wind-text");
        text = value["current"]["wind_speed"] 
        div.textContent =  Math.round(parseFloat(text)*18/5)+" km/h";
    });


    // feels like temp

    Promise.resolve(data)
    .then(function(value){
        const div = document.querySelector(".js-feels-text");
        text = value["current"]["feels_like"] 
        div.textContent = text + unitSymb;
    });

    // precipitation

    Promise.resolve(data)
    .then(function(value){
        const div = document.querySelector(".js-precip-text");
        try{
            text = value["current"]["rain"] 
        }
        catch(error){
            console.log(error);
        }
        if(text){
            div.textContent = text;
        }
        else if(!text){
            div.textContent = "N/A";
        }
        
    });

    // pressure

    Promise.resolve(data)
    .then(function(value){
        const div = document.querySelector(".js-pressure-text");
        try{
            text = value["current"]["pressure"] 
        }
        catch(error){
            console.log(error);
        }
        if(text){
            div.textContent = text+" hPa" ;
        }
        else if(!text){
            div.textContent = "N/A";
        }
        
        
    });

    // visibility

    Promise.resolve(data)
    .then(function(value){
        const div = document.querySelector(".js-visib-text");
        try{
            text = value["current"]["visibility"] 
        }
        catch(error){
            console.log(error);
        }
        if(text){
            div.textContent = text+" m" ;
        }
        else if(!text){
            div.textContent = "N/A";
        }
        
    });


    // UV Index

    Promise.resolve(data)
    .then(function(value){
        const div = document.querySelector(".js-uv-text");
        try{
            text = value["current"]["uvi"] 
        }
        catch(error){
            console.log(error);
        }
        if(text){
            div.textContent = text;
        }
        else if(!text){
            div.textContent = "N/A";
        }
        
        
    });



}
//end of function

//console.log(parseJson(getDataJson("London", "metric")));
async function fetchGif(text){
    const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=WCgT3XCRmeUQnSPrNC7vIZdsNADkQZX7&s=${text}`, {mode: 'cors'});
    const gifdata = await response.json();
    //const img = document.querySelector(".gifImg")
    //img.src = gifdata.data.images.original.url;
    
    let urlStr = gifdata.data.images.original.url;
    Promise.resolve(urlStr)
        .then(function(value){
            console.log(value)
            const img = document.querySelector(".giphy");
            img.style.backgroundImage =  `url('${value}')`;
        });

    //img.style.backgroundRepeat = "repeat"
    

  }
const formSub = document.querySelector("form");
formSub.addEventListener("submit", (event)=>{
    //city text 
    const cityDiv = document.querySelector(".city");
    const inputText = document.querySelector(".search");
    let inText = inputText.value
    cityDiv.textContent = inText; 
    let compText = (hasWhiteSpace(inText) ? inText.replace(" ", "%20") : inText)
    let data = getDataJson(compText, unit);
    populate(data, unit);
    Promise.resolve(data)
    .then(function(value){
        text = value["current"]["weather"][0]["description"] 
        return text
    })
    .then(function(text){
        fetchGif(text)
    });

    

})


let city="London";
let data  = getDataJson(city, unit);
const metricBtn = document.querySelector(".celsius");
metricBtn.style.transform = "scale(1.1)";
metricBtn.style.fontWeight = "bold";
const cityDiv = document.querySelector(".city");
cityDiv.textContent = city; 
populate(data, unit);
Promise.resolve(data)
.then(function(value){
    text = value["current"]["weather"][0]["description"] 
    return text
})
.then(function(text){
    fetchGif(text)
});




const imperialBtn = document.querySelector(".fheight");
imperialBtn.addEventListener("click", ()=>{
    metricBtn.style.transform = "scale(1)";
    metricBtn.style.fontWeight = "normal";

    imperialBtn.style.transform = "scale(1.1)";
    imperialBtn.style.fontWeight = "bold";
    unit = "imperial";
    const cityDiv = document.querySelector(".city");
    let textFromDiv = cityDiv.textContent;
    textFromDiv.replace(" ", "%20");
    let data = getDataJson(textFromDiv, unit);
    populate(data, unit);
    Promise.resolve(data)
    .then(function(value){
        text = value["current"]["weather"][0]["description"] 
        return text
    })
    .then(function(text){
        fetchGif(text)
    });

})




metricBtn.addEventListener("click", ()=>{
    metricBtn.style.transform = "scale(1.1)";
    metricBtn.style.fontWeight = "bold";

    imperialBtn.style.transform = "scale(1)";
    imperialBtn.style.fontWeight = "normal";
    unit = "metric";
    let textFromDiv = cityDiv.textContent;
    textFromDiv.replace(" ", "%20");
    let data = getDataJson(textFromDiv, unit);
    populate(data, unit);
    Promise.resolve(data)
    .then(function(value){
        text = value["current"]["weather"][0]["description"] 
        return text
    })
    .then(function(text){
        fetchGif(text)
    });

})


/*
const currentLocEl = document.querySelector(".js-current-location");
currentLocEl.addEventListener("click", ()=>{
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
      
      function success(pos) {
        var crd = pos.coords;
      
        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
      }
      
      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }
      
      navigator.geolocation.getCurrentPosition(success, error, options);
    data = getDataJsonCoords(curLat, curLong, unit);
    populate(data, unit);
    Promise.resolve(data)
    .then(function(value){
        text = value["current"]["weather"][0]["description"] 
        return text
    })
    .then(function(text){
        fetchGif(text)
    });
})
*/