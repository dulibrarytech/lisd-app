

export class SubsortTotalsValueConverter {
    
    toView(subsortTotalsObject, index) {

        let total = 0;
        let totalsObj = {};

        for(var key in index) {
            totalsObj = subsortTotalsObject[key];
        }

        return totalsObj;
    }
}