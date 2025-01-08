import chick from '../img/chick.png'
import buildingIcon1 from '../img/buildings/building1.png'
import buildingIcon2 from '../img/buildings/building2.png'
import buildingIcon3 from '../img/buildings/building3.png'
import buildingIcon4 from '../img/buildings/building4.png'
import buildingIcon5 from '../img/buildings/building5.png'
import buildingIcon6 from '../img/buildings/building6.png'
import buildingIcon7 from '../img/buildings/building7.png'
import buildingIcon8 from '../img/buildings/building8.png'
import buildingIcon9 from '../img/buildings/building9.png'
import buildingIcon10 from '../img/buildings/building10.png'
import { Building, Player, Upgrade } from './player-context'

const building1 : Building = {
    index: 1,
    name: "Курочка",
    amount: 0,
    bonusPerSecond: 1,
    basePrice: 25,
    price: 25,
    iconPath: buildingIcon1,
}

const building2 : Building = {
    index: 2,
    name: "Автоклюв",
    amount: 0,
    bonusPerSecond: 5,
    basePrice: 260,
    price: 260,
    iconPath: buildingIcon2,
}

const building3 : Building = {
    index: 3,
    name: "Золотая несушка",
    amount: 0,
    bonusPerSecond: 39,
    unlocksAt: 3500,
    basePrice: 3807,
    price: 3807,
    iconPath: buildingIcon3,
}

const building4 : Building = {
    index: 4,
    name: "Улучшенные перья",
    amount: 0,
    bonusPerSecond: 397,
    visibleAt: 3500,
    unlocksAt: 70000,
    basePrice: 74655,
    price: 74655,
    iconPath: buildingIcon4,
}

const building5 : Building = {
    index: 5,
    name: "Куриный домик",
    amount: 0,
    bonusPerSecond: 5316,
    visibleAt: 70000,
    unlocksAt: 1800000,
    basePrice: 1883807,
    price: 1883807,
    iconPath: buildingIcon5,
}

const building6 : Building = {
    index: 6,
    name: "Корм DELUXE",
    amount: 0,
    bonusPerSecond: 90732,
    visibleAt: 1800000,
    unlocksAt: 50000000,
    basePrice: 59307925,
    price: 59307925,
    iconPath: buildingIcon6,
}

const building7 : Building = {
    index: 7,
    name: "Курица-аристократ",
    amount: 0,
    bonusPerSecond: 1923303,
    visibleAt: 50000000,
    unlocksAt: 2200000000,
    basePrice: 2272787748,
    price: 2272787748,
    iconPath: buildingIcon7,
}

const building8 : Building = {
    index: 8,
    name: "Турбо-Курятник",
    amount: 0,
    bonusPerSecond: 49624369,
    visibleAt: 2200000000,
    unlocksAt: 100000000000,
    basePrice: 103894502317,
    price: 103894502317,
    iconPath: buildingIcon8,
}

const building9 : Building = {
    index: 9,
    name: "Чудо-Гнездо",
    amount: 0,
    bonusPerSecond: 1532458415,
    visibleAt: 100000000000,
    unlocksAt: 5500000000000,
    basePrice: 5570559171411,
    price: 5570559171411,
    iconPath: buildingIcon9,
}

const building10 : Building = {
    index: 10,
    name: "Инкубатор 2000х",
    amount: 0,
    bonusPerSecond: 55840101669,
    visibleAt: 5500000000000,
    unlocksAt: 340000000000000,
    basePrice: 345378178644462,
    price: 345378178644462,
    iconPath: buildingIcon10,
}

const generateBaseBuildingUpgrades = (initialPrice: number, name: string, building: Building): Upgrade[] => {
    let list = [1, 5, 10, 25, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500];
    return list.map((value, index) => {
        const upgrade: Upgrade = {
            name: name + ' ' + (index + 1),
            price: calculatePriceForIndex(initialPrice, index),
            iconPath: building.iconPath,
            unlockCondition: (player: Player) => {
                return player.buildings.some((playerBuilding) => playerBuilding.index === building.index && 
                    playerBuilding.amount >= value);
            },
            description: "Увеличивает производительность " + building.name + " в 2 раза.",
            buildingId: building.index,
            perSecondModifier: 2,
        }
        return upgrade;
    })
}

const calculatePriceForIndex = (initialPrice: number, index: number) : number => {
    let result = initialPrice;
    switch (index) {
        case 0: 
            result = initialPrice;
            break;
        case 1: result = initialPrice * 5;
            break;
        case 2: 
        case 3:
        case 4: result = initialPrice * Math.pow(10, index);
            break;
        default:
            result = initialPrice * Math.pow(100, index);
    }
    return result;
}

export const upgradeList: Upgrade[] = [
    ...generateBaseBuildingUpgrades(500,'Сильные клювы', building1), 
    ...generateBaseBuildingUpgrades(5000,'Обновление прошивки', building2),
    ...generateBaseBuildingUpgrades(55000,'Вкусный корм', building3),
    ...generateBaseBuildingUpgrades(550000, 'Шампунь для куриц', building4),
    ...generateBaseBuildingUpgrades(60000000, 'План застройки', building5),
    ...generateBaseBuildingUpgrades(6250000000, 'Маркетинговый ход', building6),
    ...generateBaseBuildingUpgrades(650000000000, 'Изысканное блюдо', building7),
    ...generateBaseBuildingUpgrades(67500000000000, 'Температура турбин', building8),
    ...generateBaseBuildingUpgrades(7000000000000000, 'Курица или яйцо', building9),
    ...generateBaseBuildingUpgrades(750000000000000000, 'Мы здесь бессильны', building10)
];

export const defaultPlayer: Player = {
    name: "Герой жопы",
    score: 0,
    baseClickPower: 1,
    baseScorePerSecond: 0,
    totalScore: 0,
    maxScore: 0,
    buildings: [building1, building2, building3, building4, building5, building6, building7, building8, building9, building10],
    upgrades: [],
}