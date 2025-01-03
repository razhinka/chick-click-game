export interface Player {
    name: String,
    score: number,
    totalScore: number,
    buildings: Array<Building>
}

export const defaultPlayer: Player = {
    name: "Hero of chicken",
    score: 0,
    totalScore: 0,
    buildings: [],
}

export interface Building {
    name: String,
    amount: number,
    basePrice: number,
    price: number,
}
