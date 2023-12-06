console.log("First Statement");
setTimeout(()=>{
    console.log("Second Statement");
},0);
console.log("Third statement");

function a(){
    console.log("A called");
    // throw new Error("just an error");
}
function b(){
    a();
}
function c(){
    b();
}
c();

//stack overflow
function d(){
    d();
}
d();