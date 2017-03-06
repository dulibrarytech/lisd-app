export class MonthStringValueConverter {
    
    // Convert month key from month number to month name
    toView(str) {

        let prop = "";
                
        switch(str) {
            case "1":
                prop = "January";
                break;
            case "2":
                prop = "February";
                break;
            case "3":
                prop = "March";
                break;
            case "4":
                prop = "April";
                break;
            case "5":
                prop = "May";
                break;
            case "6":
                prop = "June";
                break;
            case "7":
                prop = "July";
                break;
            case "8":
                prop = "August";
                break;
            case "9":
                prop = "September";
                break;
            case "10":
                prop = "October";
                break;
            case "11":
                prop = "November";
                break;
            case "12":
                prop = "December";
                break;
            default:
                // No conversion, use prop value as is
        }
        
        return prop;
    }
}