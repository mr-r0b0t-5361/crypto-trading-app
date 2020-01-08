const getRandomElementFromArray = array => {
    return array[Math.floor(Math.random()*array.length)];
}

export default getRandomElementFromArray;