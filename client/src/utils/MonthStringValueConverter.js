export class MonthStringValueConverter {
    
    // Convert month key from month number to month name
    toView(monthObj) {

        let prop = "";
        let mString = "";

        for (let prop in monthObj) {

            if (monthObj.hasOwnProperty(prop)) {
                switch(prop) {
                    case "1":
                        mString = "January";
                        break;
                    case "2":
                        mString = "February";
                        break;
                    case "3":
                        mString = "March";
                        break;
                    case "4":
                        mString = "April";
                        break;
                    case "5":
                        mString = "May";
                        break;
                    case "6":
                        mString = "June";
                        break;
                    case "7":
                        mString = "July";
                        break;
                    case "8":
                        mString = "August";
                        break;
                    case "9":
                        mString = "September";
                        break;
                    case "10":
                        mString = "October";
                        break;
                    case "11":
                        mString = "November";
                        break;
                    case "12":
                        mString = "December";
                        break;
                    default:
                        // No conversion, use prop value as is
                }
            }
        }
        
        return mString;
    }
}