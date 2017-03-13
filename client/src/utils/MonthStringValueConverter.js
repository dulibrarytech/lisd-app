export class MonthStringValueConverter {
    
    // Convert month key from month number to month name
    toView(monthObj) {

        let prop = "";
        let mString = "";

        for (let prop in monthObj) {

            if (monthObj.hasOwnProperty(prop)) {
                switch(prop) {
                    case "1":
                        mString = "Jan";
                        break;
                    case "2":
                        mString = "Feb";
                        break;
                    case "3":
                        mString = "Mar";
                        break;
                    case "4":
                        mString = "Apr";
                        break;
                    case "5":
                        mString = "May";
                        break;
                    case "6":
                        mString = "Jun";
                        break;
                    case "7":
                        mString = "Jul";
                        break;
                    case "8":
                        mString = "Aug";
                        break;
                    case "9":
                        mString = "Sep";
                        break;
                    case "10":
                        mString = "Oct";
                        break;
                    case "11":
                        mString = "Nov";
                        break;
                    case "12":
                        mString = "Dec";
                        break;
                    default:
                        // No conversion, use prop value as is
                }
            }
        }
        
        return mString;
    }
}