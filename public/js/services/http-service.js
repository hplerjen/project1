class HttpService {
    
    async ajax(method, url, data, headers) {
        const fetchHeaders = new Headers({'content-type': 'application/json', ...(headers || {})});
        const x = await fetch(url, {
            method,
            headers: fetchHeaders, body: JSON.stringify(data)
        });
        // eslint-disable-next-line no-return-await
        return await x.json();
    }
}

// eslint-disable-next-line import/prefer-default-export
export const httpService = new HttpService();