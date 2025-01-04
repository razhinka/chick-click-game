import chick from '../img/chick.png'
import upgrade1 from '../img/upgrade1.png'
import upgrade2 from '../img/upgrade2.png'

export interface Player {
    name: String,
    score: number,
    baseClickPower: number,
    baseScorePerSecond: number,
    totalScore: number,
    buildings: Array<Building>
}

export interface Building {
    name: String,
    amount: number,
    bonusPerClick?: number,
    bonusPerSecond?: number,
    basePrice: number,
    price: number,
    iconPath: string,
}

export const defaultBuilding : Building = {
    name: "Курочка",
    amount: 0,
    bonusPerClick: 1,
    bonusPerSecond: 1,
    basePrice: 100,
    price: 100,
    iconPath: upgrade1,
}

export const defaultBuilding2 : Building = {
    name: "Автоклюв",
    amount: 0,
    bonusPerSecond: 10,
    basePrice: 200,
    price: 200,
    iconPath: upgrade2,
}

export const defaultPlayer: Player = {
    name: "Герой жопы",
    score: 0,
    baseClickPower: 1,
    baseScorePerSecond: 0,
    totalScore: 0,
    buildings: [defaultBuilding, defaultBuilding2],
}