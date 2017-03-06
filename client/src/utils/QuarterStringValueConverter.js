export class QuarterStringValueConverter {
    
    // Convert month key from month number to month name
    toView(str) {

        let prop = "";
                
        switch(str) {
            case "1":
                prop = "Fall";
                break;
            case "2":
                prop = "Winter";
                break;
            case "3":
                prop = "Spring";
                break;
            case "4":
                prop = "Summer";
                break;
            default:
                // No conversion, use prop value as is
        }
        
        return prop;
    }
}