export interface Player {
    name: String,
    score: Number,
    totalScore: Number,
    buildings: Array<Building>
}

export interface Building {
    name: String,
    amount: Number,
    basePrice: Number,
    price: Number,
}