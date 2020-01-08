
const getBaseArray = object => {
    return Object.entries(object).map(([_, value]) => value.base);
}

export default getBaseArray;