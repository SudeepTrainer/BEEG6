//callback hell
// setTimeout(()=>{
//     //do something
//     const data = {user:"Bill"}
//     console.log(data);
//     setTimeout(()=>{
//         data.age = 12;
//         console.log(data);
//         setTimeout(()=>{
//             data.gender = "Male";
//             console.log(data);
//         },400)
//     },400)
// },500)

// getLocation(){
//     getLatLong(){
//         getWeather(){
//             getWeatherIcon()
//         }
//     }
// }

// pending, fulfilled, rejected
function getWeather(){
    return new Promise(function(resolve,reject){
       setTimeout( ()=>
       {
        resolve("Winter")
        // reject("There is error in fetching");
        }
    ,100)})
}

// getWeather().then((data)=>{
//     console.log(`Success ${data}`);
// },(err)=>{
//     console.log(`Error ${err}`);
// })


// const weather = getWeather();
// console.log(weather);
function onSuccess(data){
    console.log(`Success ${data}`);
}
function onError(err){
    console.log(`Error ${err}`);
}
getWeather().then(onSuccess,onError);
getWeather().then(onSuccess).catch(onError);

function getWeatherDetail(weather){
    return new Promise(function(resolve,reject){
        switch(weather){
            case "Summer": resolve("Hot winds");break;
            case "Winter": resolve("Cold winds");break;
            default: reject("Nothing Found");
        }
    });
}
getWeather()
.then(getWeatherDetail)
.then(onSuccess)
.catch(onError);

fetch('https://jsonplaceholder.typicode.com/users/')
.then(response=>{
    return response.json();
})
.then(data=>{
    console.log(data);
})