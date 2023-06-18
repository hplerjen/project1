/* eslint-disable no-debugger */
/* eslint-disable no-return-await */
/* eslint-disable object-shorthand */
/* eslint-disable class-methods-use-this */
class HttpService {
    
    async ajax(method, url, data, headers) {
        const fetchHeaders = new Headers({'content-type': 'application/json', ...(headers || {})});
        
        const x = await fetch(url, {
            method: method,
            headers: fetchHeaders, body: JSON.stringify(data)
        });
        debugger;
        return await x.json();
    }

}

// eslint-disable-next-line import/prefer-default-export
export const httpService = new HttpService();