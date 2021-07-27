const prelaunchInfo = document.querySelectorAll(".prelaunchInfo");
const displayLauncher = document.getElementById("launcherName");
const displayPayload = document.getElementById("payloadName");
const displayLaunchsite = document.getElementById("launchsiteName");
const launcherArray = [];
const launchMessageArrLauncher =[];
const payloadArray = [];
const launchMessageArrPayload = [];
const launchsiteArray = [];
const launchMessageArrLaunchsite = [];


document.getElementById("launcherBtn").onclick = function () {
    launcherInfo.style.visibility = 'visible'
    axios
        .get('https://api.spacexdata.com/v3/rockets')
        .then((res) => {
            let launcher = res.data
            for (let i in launcher){
                let launcherName = {
                   name: launcher[i].rocket_name,
                   description: launcher[i].description
                }
                launcherArray.push(launcherName)
            }
            let randomIndex = Math.floor(Math.random() * launcherArray.length);
            let randomLauncherName = launcherArray[randomIndex].name
            let randomLauncherDesc = launcherArray[randomIndex].description
            displayLauncher.innerHTML = `<h2>${randomLauncherName}</h2><br><h4>${randomLauncherDesc}</h4>`
            launchMessageArrLauncher.unshift(randomLauncherName)
        });
};

document.getElementById("payloadBtn").onclick = function () {
    payloadInfo.style.visibility = 'visible'
    axios
        .get('https://api.spacexdata.com/v3/payloads')
        .then((res) => {
            let payload = res.data
            for (let i in payload){
                let payloadName = {
                    name: payload[i].payload_id,
                    type: payload[i].payload_type,
                    nationality: payload[i].nationality,
                    orbit: payload[i].orbit
                }
                payloadArray.push(payloadName)
            }
            let randomIndex2 = Math.floor(Math.random() * payloadArray.length);
            let randomPayloadName = payloadArray[randomIndex2].name
            let randomPayloadType = payloadArray[randomIndex2].type
            let randomPayloadNationality = payloadArray[randomIndex2].nationality
            let randomPayloadOrbit = payloadArray[randomIndex2].orbit
            displayPayload.innerHTML = `<h2>${randomPayloadName}</h2><br><h3>Type:</h3><br><h4>${randomPayloadType}</h4><br><h3>Origin:</h3><br><h4>${randomPayloadNationality}</h4><br><h3>Orbit:</h3><br><h4>${randomPayloadOrbit}</h4>`
            launchMessageArrPayload.unshift(randomPayloadName)
        })
};

document.getElementById("launchsiteBtn").onclick = function () {
    launchsiteInfo.style.visibility = 'visible'
    axios
        .get('https://api.spacexdata.com/v3/launchpads')
        .then((res) => {
            let launchsite = res.data
            for (let i in launchsite){
                let launchsiteName = {
                    name: launchsite[i].name,
                    locationName: launchsite[i].location.name,
                    locationRegion: launchsite[i].location.region,
                    details: launchsite[i].details
                } 
                launchsiteArray.push(launchsiteName)
            }
            let randomIndex3 = Math.floor(Math.random() * launchsiteArray.length);
            let randomLaunchsiteName = launchsiteArray[randomIndex3].name
            let randomLaunchsiteLocationName = launchsiteArray[randomIndex3].locationName
            let randomLaunchsiteLocationRegion = launchsiteArray[randomIndex3].locationRegion
            let randomLaunchsiteDetails = launchsiteArray[randomIndex3].details
            displayLaunchsite.innerHTML = `<h2>${randomLaunchsiteName}</h2><br><h3>Location:</h3><br><h4>${randomLaunchsiteLocationName}</h4><br><h3>Region:</h3><br><h4>${randomLaunchsiteLocationRegion}</h4><br><h3>Details:</h3><br><h4>${randomLaunchsiteDetails}</h4>`
            launchMessageArrLaunchsite.push(randomLaunchsiteName)
        })
};

document.getElementById("launchBtn").onclick = function () {
    if (displayLauncher.textContent === "") {
        Swal.fire({
            title: 'Uh oh!',
            text: 'Unable to launch, no Launcher detected!',
            icon: 'warning',
            confirmButtonText: 'Try Again'
          });
    } else if (displayPayload.textContent === ""){
        Swal.fire({
            title: 'Uh oh!',
            text: 'Failed to launch, no Payload detected!',
            icon: 'warning',
            confirmButtonText: 'Try Again'
          });
    } else if (displayLaunchsite.textContent === ""){
        Swal.fire({
            title: 'Uh oh!',
            text: 'Failed to launch, no Launchsite detected!',
            icon: 'error',
            confirmButtonText: 'Try Again'
          });
    } else {

    for (let i = 0; i < prelaunchInfo.length; i++){
    prelaunchInfo[i].style.display = 'none'
}
    launchMessage.style.display = 'block'
    launchMessage.innerHTML = `<h2>${launchMessageArrLauncher[0]} successfully launched ${launchMessageArrPayload[0]} from ${launchMessageArrLaunchsite[0]}! </h2>`

    setTimeout(() => {
        launchMessage.style.display = 'none'
        for (let i = 0; i < prelaunchInfo.length; i++){
            prelaunchInfo[i].style.display = 'block'
        }
        launchsiteInfo.style.visibility = 'hidden'
        payloadInfo.style.visibility = 'hidden'
        launcherInfo.style.visibility = 'hidden'
        displayLaunchsite.innerHTML = ""
        displayPayload.innerHTML = ""
        displayLauncher.innerHTML = ""
    }, 5000)
}
};