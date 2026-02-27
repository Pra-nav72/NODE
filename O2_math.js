function adds(a, b){
    return a+b;
}

function subs(a, b){
    return a-b;
}
 
// we need to make it public in order to use by 
// other classes
module.exports = {adds, subs}; 