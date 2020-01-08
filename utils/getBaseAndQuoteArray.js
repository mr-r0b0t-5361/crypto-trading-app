
const getBaseAndQuoteArray = object => {
    return Object.entries(object).map(([_, { base, quote }]) => ({ base, quote }));
}

export default getBaseAndQuoteArray;