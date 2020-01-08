const getUniqueCurrency = array => {
    return array.filter((v, i, a) => a.indexOf(v) === i); 
}

export default getUniqueCurrency;