
export class ObjectValuesValueConverter {
    toView(obj) {
        // Create a temporary array to populate with object keys
        let temp = [];

        for (let prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                temp.push(obj[prop]);
            }
        }
        
        return temp;
    }
}