export class StringCapitalFirstValueConverter {
    
    // Convert month key from month number to month name
    toView(string) {
        var capString = "";
        if(typeof string != 'undefined') {
            capString = string.charAt(0).toUpperCase() + string.slice(1);
        }
        return capString;
    }
}
