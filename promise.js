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
        // resolve("Winter")
        reject("There is error in fetching");
        }
    ,100)})
}
// const weather = getWeather();
// console.log(weather);
function onSuccess(data){
    console.log(`Success ${data}`);
}
function onError(err){
    console.log(`Error ${err}`);
}
// getWeather().then(onSuccess,onError);
getWeather().then(onSuccess).catch(onError);