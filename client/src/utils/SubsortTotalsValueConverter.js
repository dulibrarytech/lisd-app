// export class SubsortTotalsValueConverter {
    
//     // Convert month key from month number to month name
//     toView(subsortTotalsObject, index) {

//         let total = 0;

//         for(var key in index) {
//             total = subsortTotalsObject[key];
//         }
        
//         return total;
//     }
// }

export class SubsortTotalsValueConverter {
    
    // Convert month key from month number to month name
    toView(subsortTotalsObject, index) {

        let total = 0;
        let totalsObj = {};

        for(var key in index) {
            totalsObj = subsortTotalsObject[key];
        }

        return totalsObj;
    }
}