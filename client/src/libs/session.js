export const Session = (() => {

    function create(data={}, token=null) {
        sessionStorage.setItem('token', token)

        let value;
        for(let key in data) {
            value = typeof data[key] == 'object' ? JSON.stringify(data[key]) : data[key];
            sessionStorage.setItem(key, value);
        }
    }

    function destroy() {
        sessionStorage.clear();
    }

    function isSession() {
        return sessionStorage.getItem('token') ? true : false;
    }

    function getData(key) {
        let data = null;

        if(sessionStorage.getItem('token')) {
            let value = sessionStorage.getItem(key);
            data = (value && value[0] == '{') ? JSON.parse(value) : value;
        }
        
        return data;
    }

    function getToken() {
        return sessionStorage.getItem('token');
    }

    return {
        create,
        destroy,
        isSession,
        getData,
        getToken
    }
 })()