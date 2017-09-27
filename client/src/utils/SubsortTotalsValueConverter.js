

export class SubsortTotalsValueConverter {
    
    toView(subsortTotalsObject, index, subField) {

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