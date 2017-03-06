// A ValueConverter for iterating an Object's properties inside of a repeat.for in Aurelia
export class SubObjectValuesValueConverter {
    toView(obj) {
        // Create a temporary array to populate with object keys
        let temp = [];
        let subObj = {};
        
        // A basic for..in loop to get object properties
        // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/for...in
        for (let prop in obj) {
            if (obj.hasOwnProperty(prop)) {

                subObj = obj[prop];
                for (let subprop in subObj) {
                    temp.push(subObj[subprop]);
                }
            }
        }
        
        return temp;
    }
}