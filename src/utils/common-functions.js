export const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

export const getOrdinalSuffix = (rank) => {
    if (rank % 10 === 1 && rank % 100 !== 11) return `${rank}st`;
    if (rank % 10 === 2 && rank % 100 !== 12) return `${rank}nd`;
    if (rank % 10 === 3 && rank % 100 !== 13) return `${rank}rd`;
    return `${rank}th`;
};