
function isEquivalent(a, b) {
    // Create arrays of property names
    let aProps = Object.getOwnPropertyNames(a);
    let bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length != bProps.length) {
        return false;
    }

    for (let i = 0; i < aProps.length; i++) {
        let propName = aProps[i];

        // If values of same property are not equal,
        // objects are not equivalent
        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
}

function findMostReaptedWord(str){
    let obj = [];
    let count = 0;

    let words = str.match(/\w+/g);
    let cleanWords = words.filter(el => el.length > 2 && el != 'jer');

    for (let i = 0; i < cleanWords.length; i++){
        count = 0;
        for (let j = 0; j < cleanWords.length; j++){
            if (cleanWords[i] === cleanWords[j]){
                count++;
            }
        }
        let find = obj.find(el => el.word === cleanWords[i]);
        if(!find){
            obj.push({word: cleanWords[i], count});
        }
    }

    obj.sort(function(a,b) {return (a.count < b.count) ? 1 : ((b.count < a.count) ? -1 : 0);} );
    return obj.slice(0, 10);
}


module.exports = {
    isEquivalent: isEquivalent,
    findMostReaptedWord: findMostReaptedWord,
};