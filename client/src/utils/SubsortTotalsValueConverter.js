

export class SubsortTotalsValueConverter {
    
    toView(subsortTotalsObject, index, subField) {

        // Kludge to release the undefined
        if(typeof subsortTotalsObject == 'undefined') {
            return {};
        }

        var total, totalsObj;

        if(typeof subField == 'undefined') {
            total = 0;
            totalsObj = {};

            for(var key in index) {
                totalsObj = subsortTotalsObject[key];
            }
        }
        else {
            total = 0;
            for(var key in index) {
                totalsObj = subsortTotalsObject[key][subField];
            }
        }

        return totalsObj;
    }
}