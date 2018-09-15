
/**
 * Generates a random number ranging from "from" to "to".
 */
function generateRandomNumberSpecifiedRange(from, to){
    var retVal = generateRandomNumberSpecifiedLen(to.toString().length);
    while (retVal < from || retVal > to){
        retVal = generateRandomNumberSpecifiedLen(to.toString().length);
    }
    return retVal;
}
    
/**
 * Generates a random number having specified length. Ranging from "0" to "(10*len)-1" in the other words.
 */
function generateRandomNumberSpecifiedLen(len){
    var rand = Math.floor((Math.random()*(10*len)));
    return rand;
}
    
/**
 * Generates a multidimentional array.
 */
function makeArray(a, b){
    var retArr = new Array(a);
    var i;
    for (i=0; i < a; i++){
        retArr[i] = new Array(b);
    }
    return retArr;
}