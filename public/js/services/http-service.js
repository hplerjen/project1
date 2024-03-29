/* eslint-disable no-return-await */
export class HttpService {
    
    async ajax(method, url, data, headers) {
        const fetchHeaders = new Headers({'content-type': 'application/json', ...(headers || {})});
        const x = await fetch(url, {
            method,
            headers: fetchHeaders, body: JSON.stringify(data)
        });
        return await x.json();
    }
}

export const httpService = new HttpService();