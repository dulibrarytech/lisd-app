// 
export class SubObjectValuesValueConverter {
    toView(obj, key) {
        // Create a temporary array to populate with object keys
        let temp = [];
        let subObj = {};
        
        // A basic for..in loop to get object properties
        // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/for...in
        for (let prop in obj) {
            if (obj.hasOwnProperty(prop)) {

                subObj = obj[prop];
                if(typeof key != 'undefined') {
                    if(typeof subObj[key] == 'object') {
                        for (let subkey in subObj[key]) {
                            temp.push(subObj[key][subkey]);
                        }
                    }
                    else {
                        temp.push(subObj[key]);
                    }
                }
                else {
                    for (let subprop in subObj) {
                        temp.push(subObj[subprop]);
                    }
                }
            }
        }
        
        return temp;
    }
}