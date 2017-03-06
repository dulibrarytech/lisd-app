// A ValueConverter for iterating an Object's properties inside of a repeat.for in Aurelia
export class ObjectValuesValueConverter {
    toView(obj) {
        // Create a temporary array to populate with object keys
        let temp = [];
        
        // A basic for..in loop to get object properties
        // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/for...in
        for (let prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                temp.push(obj[prop]);
            }
        }
        
        return temp;
    }
}