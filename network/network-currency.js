import { DEFAULT_HEADERS, PRIMARY_URL } from "../constants/api";

const getCurrencyPairs = () => new Promise((resolve, reject) =>
    fetch(PRIMARY_URL,
        {
            method: "GET",
            headers: DEFAULT_HEADERS,
        })
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err)));


export {
    getCurrencyPairs,
};