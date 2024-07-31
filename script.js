//http://api.weatherapi.com/v1/current.json?key=c5c0a8021c45426c85243019242604&q=Kolkata&aqi=no

const form = document.getElementById('locationForm'); 
const tempDiv = document.querySelector(".temparature");
const placeDiv = document.querySelector(".place_time p");
const dateSpan = document.querySelector(".place_time span");
const infoImg = document.querySelector(".info");
const condDiv = document.querySelector(".info p");

form.addEventListener('submit', function(event){
    event.preventDefault();

    const locationInput = document.getElementById("locationName").value;

    weatherDetail(locationInput);
});


const weatherDetail = async (locationname) => {
    let url = `http://api.weatherapi.com/v1/current.json?key=c5c0a8021c45426c85243019242604&q=${locationname}&aqi=no`

    const data = await fetch(url)

    const res = await data.json()

    console.log(res)

    let temparature = res.current.temp_c;
    let place = res.location.name;
    let timeToday = res.location.localtime;
    let nowIcon = res.current.condition.icon;
    let cond = res.current.condition.text;
    
    updateDetails(temparature,place,timeToday,nowIcon,cond);
};

function updateDetails(temparature, place, timeToday, nowIcon, cond){
    tempDiv.innerText = temparature;
    placeDiv.innerText = place;

    // Create a Date object using the localtime string
    const localDate = new Date(timeToday);
    const day = getName(localDate.getDay());

    // Format the timeToday string as you want it
    const formattedDate = localDate.toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' });
    const formattedTime = localDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

    dateSpan.innerText = `${formattedDate} ${day} ${formattedTime}`;

    // Check if there's already an image present
    const existingImage = infoImg.querySelector('img');
    if (existingImage) {
        // If an image exists, remove it
        existingImage.remove();
    }

    // Create a new image element
    const image = document.createElement('img');
    image.src = nowIcon;
    infoImg.appendChild(image);
    
    condDiv.innerText = cond;
}

function getName(num){
    if(num == 0){
        return 'Sunday';
    }
    else if(num == 1){
        return 'Monday';
    }
    else if(num == 2){
        return 'Tuesday';
    }
    else if(num == 3){
        return 'Wednesday';
    }
    else if(num == 4){
        return 'Thursday';
    }
    else if(num == 5){
        return 'Friday';
    }
    else{
        return 'Saturday';
    }
}



