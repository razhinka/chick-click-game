import egg from '../assets/img/egg.png'
import buildingIcon1 from '../assets/img/buildings/building1.png'
import buildingIcon2 from '../assets/img/buildings/building2.png'
import buildingIcon3 from '../assets/img/buildings/building3.png'
import buildingIcon4 from '../assets/img/buildings/building4.png'
import buildingIcon5 from '../assets/img/buildings/building5.png'
import buildingIcon6 from '../assets/img/buildings/building6.png'
import buildingIcon7 from '../assets/img/buildings/building7.png'
import buildingIcon8 from '../assets/img/buildings/building8.png'
import buildingIcon9 from '../assets/img/buildings/building9.png'
import buildingIcon10 from '../assets/img/buildings/building10.png'
import buildingIcon11 from '../assets/img/buildings/building11.png'
import buildingIcon12 from '../assets/img/buildings/building12.png'
import clickUpgradeIcon1 from '../assets/img/upgrades/click/click1.png'
import clickUpgradeIcon2 from '../assets/img/upgrades/click/click2.png'
import clickUpgradeIcon3 from '../assets/img/upgrades/click/click3.png'
import clickUpgradeIcon4 from '../assets/img/upgrades/click/click4.png'
import clickUpgradeIcon5 from '../assets/img/upgrades/click/click5.png'
import clickUpgradeIcon6 from '../assets/img/upgrades/click/click6.png'
import clickUpgradeIcon7 from '../assets/img/upgrades/click/click7.png'
import clickUpgradeIcon8 from '../assets/img/upgrades/click/click8.png'
import clickUpgradeIcon9 from '../assets/img/upgrades/click/click9.png'
import clickUpgradeIcon10 from '../assets/img/upgrades/click/click10.png'
import { Building, Player, Suffix, Upgrade } from './player-context.tsx'
import React from 'react'
import { formatNumber } from '../util/number-formatter.tsx'


const getBuildingDynamicDescription = (buildingIndex: number) => {
    return (player: Player) => {
        let currentBuildingState = player.buildings.find((playerBuilding) => playerBuilding.index === buildingIndex);
        if (currentBuildingState === undefined) {
            return (<></>)
        }
        let currentOneBuildingProductivity = currentBuildingState.bonusPerSecond * currentBuildingState.currentMultiplier;
        let currentTotalBuildingProductivity = currentOneBuildingProductivity * currentBuildingState.amount;
        let efficiency = currentBuildingState.price / (currentOneBuildingProductivity);
        return (
            <div className='dinamic-base-building-upgrade-description'>
                <p>Производство всех зданий:
                    {' ' + formatNumber(currentTotalBuildingProductivity, player.settings.suffix)}
                    {' => '}{formatNumber(currentTotalBuildingProductivity + currentOneBuildingProductivity, player.settings.suffix)}
                </p>
                <p>Доля от общего производства: {formatNumber(
                    currentTotalBuildingProductivity * 100 /
                    player.baseScorePerSecond, player.settings.suffix, 2)}%{' => '}{formatNumber(
                        (currentTotalBuildingProductivity + currentOneBuildingProductivity) * 100 /
                        player.baseScorePerSecond, player.settings.suffix, 2)}%</p> 
                <p>Стоимость одного яйца в секунду: {formatNumber(efficiency, player.settings.suffix, 1)}</p>
            </div>)
    }
}

const building1: Building = {
    index: 1,
    name: "Курочка",
    amount: 0,
    dynamicDescriptionPart: getBuildingDynamicDescription(1),
    currentMultiplier: 1,
    bonusPerSecond: 1,
    basePrice: 25,
    price: 25,
    iconPath: buildingIcon1,
}

const building2: Building = {
    index: 2,
    name: "Автоклюв",
    amount: 0,
    dynamicDescriptionPart: getBuildingDynamicDescription(2),
    currentMultiplier: 1,
    bonusPerSecond: 5,
    basePrice: 260,
    price: 260,
    iconPath: buildingIcon2,
}

const building3: Building = {
    index: 3,
    name: "Золотая несушка",
    amount: 0,
    dynamicDescriptionPart: getBuildingDynamicDescription(3),
    currentMultiplier: 1,
    bonusPerSecond: 39,
    unlocksAt: 3500,
    basePrice: 3807,
    price: 3807,
    iconPath: buildingIcon3,
}

const building4: Building = {
    index: 4,
    name: "Улучшенные перья",
    amount: 0,
    dynamicDescriptionPart: getBuildingDynamicDescription(4),
    currentMultiplier: 1,
    bonusPerSecond: 397,
    visibleAt: 3500,
    unlocksAt: 70000,
    basePrice: 74655,
    price: 74655,
    iconPath: buildingIcon4,
}

const building5: Building = {
    index: 5,
    name: "Куриный домик",
    amount: 0,
    dynamicDescriptionPart: getBuildingDynamicDescription(5),
    currentMultiplier: 1,
    bonusPerSecond: 5316,
    visibleAt: 70000,
    unlocksAt: 1800000,
    basePrice: 1883807,
    price: 1883807,
    iconPath: buildingIcon5,
}

const building6: Building = {
    index: 6,
    name: "Корм DELUXE",
    amount: 0,
    dynamicDescriptionPart: getBuildingDynamicDescription(6),
    currentMultiplier: 1,
    bonusPerSecond: 90732,
    visibleAt: 1800000,
    unlocksAt: 50000000,
    basePrice: 59307925,
    price: 59307925,
    iconPath: buildingIcon6,
}

const building7: Building = {
    index: 7,
    name: "Курица-аристократ",
    amount: 0,
    dynamicDescriptionPart: getBuildingDynamicDescription(7),
    currentMultiplier: 1,
    bonusPerSecond: 1923303,
    visibleAt: 50000000,
    unlocksAt: 2200000000,
    basePrice: 2272787748,
    price: 2272787748,
    iconPath: buildingIcon7,
}

const building8: Building = {
    index: 8,
    name: "Турбо-Курятник",
    amount: 0,
    dynamicDescriptionPart: getBuildingDynamicDescription(8),
    currentMultiplier: 1,
    bonusPerSecond: 49624369,
    visibleAt: 2200000000,
    unlocksAt: 100000000000,
    basePrice: 103894502317,
    price: 103894502317,
    iconPath: buildingIcon8,
}

const building9: Building = {
    index: 9,
    name: "Чудо-Гнездо",
    amount: 0,
    dynamicDescriptionPart: getBuildingDynamicDescription(9),
    currentMultiplier: 1,
    bonusPerSecond: 1532458415,
    visibleAt: 100000000000,
    unlocksAt: 5500000000000,
    basePrice: 5570559171411,
    price: 5570559171411,
    iconPath: buildingIcon9,
}

const building10: Building = {
    index: 10,
    name: "Инкубатор 2000х",
    amount: 0,
    dynamicDescriptionPart: getBuildingDynamicDescription(10),
    currentMultiplier: 1,
    bonusPerSecond: 55840101669,
    visibleAt: 5500000000000,
    unlocksAt: 340000000000000,
    basePrice: 345378178644462,
    price: 345378178644462,
    iconPath: buildingIcon10,
}

const building11: Building = {
    index: 11,
    name: "Куриный вулкан",
    amount: 0,
    dynamicDescriptionPart: getBuildingDynamicDescription(11),
    currentMultiplier: 1,
    bonusPerSecond: 2371789305994,
    visibleAt: 340000000000000,
    unlocksAt: 20000000000000000,
    basePrice: 24461860098701900,
    price: 24461860098701900,
    iconPath: buildingIcon11
}

const building12: Building = {
    index: 12,
    currentMultiplier: 1,
    name: "Лазерный защитник",
    amount: 0,
    dynamicDescriptionPart: getBuildingDynamicDescription(12),
    bonusPerSecond: 116198507454535,
    visibleAt: 20000000000000000,
    unlocksAt: 1900000000000000000,
    basePrice: 1958414760465240000,
    price: 1958414760465240000,
    iconPath: buildingIcon12
}


const clickUpgrade1: Upgrade = {
    name: 'Сила клика 1',
    type: "click",
    price: 5000,
    description: "Увеличивает количество яиц за клик на 1%",
    unlockCondition: (player: Player) => {
        return player.buildings.reduce((a, v) => a + v.amount, 0) > 0;
    },
    dinamicDescriptionPart: (player: Player) => {
        return (<div className='dinamic-base-click-upgrade-description'>
            <p>Количество яиц за клик: {formatNumber(player.baseClickPower, player.settings.suffix, 1)}
                {' => '} {formatNumber(player.baseClickPower * 1.01, player.settings.suffix, 1)}
            </p>
        </div>)
    },
    clickModifier: 1.01,
    iconPath: clickUpgradeIcon1
}

const clickUpgrade2: Upgrade = {
    name: 'Сила клика 2',
    type: "click",
    price: 50000,
    description: "Увеличивает количество яиц за клик на 2%",
    unlockCondition: (player: Player) => {
        return player.stats.totalScore > 10000;
    },
    dinamicDescriptionPart: (player: Player) => {
        return (<div className='dinamic-base-click-upgrade-description'>
            <p>Количество яиц за клик: {formatNumber(player.baseClickPower, player.settings.suffix, 1)}
                {' => '} {formatNumber(player.baseClickPower * 1.02, player.settings.suffix, 1)}
            </p>
        </div>)
    },
    clickModifier: 1.02,
    iconPath: clickUpgradeIcon2
}

const clickUpgrade3: Upgrade = {
    name: 'Сила клика 3',
    type: "click",
    price: 500000,
    description: "Увеличивает количество яиц за клик на 2%",
    unlockCondition: (player: Player) => {
        return player.stats.totalScore > 100000;
    },
    dinamicDescriptionPart: (player: Player) => {
        return (<div className='dinamic-base-click-upgrade-description'>
            <p>Количество яиц за клик: {formatNumber(player.baseClickPower, player.settings.suffix, 1)}
                {' => '} {formatNumber(player.baseClickPower * 1.02, player.settings.suffix, 1)}
            </p>
        </div>)
    },
    clickModifier: 1.02,
    iconPath: clickUpgradeIcon3
}

const clickUpgrade4: Upgrade = {
    name: 'Сила клика 4',
    type: "click",
    price: 50000000,
    description: "Увеличивает количество яиц за клик на 3%",
    unlockCondition: (player: Player) => {
        return player.stats.totalScore > 10000000;
    },
    dinamicDescriptionPart: (player: Player) => {
        return (<div className='dinamic-base-click-upgrade-description'>
            <p>Количество яиц за клик: {formatNumber(player.baseClickPower, player.settings.suffix, 1)}
                {' => '} {formatNumber(player.baseClickPower * 1.03, player.settings.suffix, 1)}
            </p>
        </div>)
    },
    clickModifier: 1.03,
    iconPath: clickUpgradeIcon4
}

const clickUpgrade5: Upgrade = {
    name: 'Сила клика 5',
    type: "click",
    price: 5000000000,
    description: "Увеличивает количество яиц за клик на 3%",
    unlockCondition: (player: Player) => {
        return player.stats.totalScore > 1000000000;
    },
    dinamicDescriptionPart: (player: Player) => {
        return (<div className='dinamic-base-click-upgrade-description'>
            <p>Количество яиц за клик: {formatNumber(player.baseClickPower, player.settings.suffix, 1)}
                {' => '} {formatNumber(player.baseClickPower * 1.03, player.settings.suffix, 1)}
            </p>
        </div>)
    },
    clickModifier: 1.03,
    iconPath: clickUpgradeIcon5
}

const clickUpgrade6: Upgrade = {
    name: 'Сила клика 6',
    type: "click",
    price: 500000000000,
    description: "Увеличивает количество яиц за клик на 3%",
    unlockCondition: (player: Player) => {
        return player.stats.totalScore > 100000000000;
    },
    dinamicDescriptionPart: (player: Player) => {
        return (<div className='dinamic-base-click-upgrade-description'>
            <p>Количество яиц за клик: {formatNumber(player.baseClickPower, player.settings.suffix, 1)}
                {' => '} {formatNumber(player.baseClickPower * 1.03, player.settings.suffix, 1)}
            </p>
        </div>)
    },
    clickModifier: 1.03,
    iconPath: clickUpgradeIcon6
}

const clickUpgrade7: Upgrade = {
    name: 'Сила клика 7',
    type: "click",
    price: 50000000000000,
    description: "Увеличивает количество яиц за клик на 5%",
    unlockCondition: (player: Player) => {
        return player.stats.totalScore > 10000000000000;
    },
    dinamicDescriptionPart: (player: Player) => {
        return (<div className='dinamic-base-click-upgrade-description'>
            <p>Количество яиц за клик: {formatNumber(player.baseClickPower, player.settings.suffix, 1)}
                {' => '} {formatNumber(player.baseClickPower * 1.05, player.settings.suffix, 1)}
            </p>
        </div>)
    },
    clickModifier: 1.05,
    iconPath: clickUpgradeIcon7
}

const clickUpgrade8: Upgrade = {
    name: 'Сила клика 8',
    type: "click",
    price: 5000000000000000,
    description: "Увеличивает количество яиц за клик на 5%",
    unlockCondition: (player: Player) => {
        return player.stats.totalScore > 100000000000000000;
    },
    dinamicDescriptionPart: (player: Player) => {
        return (<div className='dinamic-base-click-upgrade-description'>
            <p>Количество яиц за клик: {formatNumber(player.baseClickPower, player.settings.suffix, 1)}
                {' => '} {formatNumber(player.baseClickPower * 1.05, player.settings.suffix, 1)}
            </p>
        </div>)
    },
    clickModifier: 1.05,
    iconPath: clickUpgradeIcon8
}

const clickUpgrade9: Upgrade = {
    name: 'Сила клика 9',
    type: "click",
    price: 500000000000000000,
    description: "Увеличивает количество яиц за клик на 5%",
    unlockCondition: (player: Player) => {
        return player.stats.totalScore > 100000000000000000;
    },
    dinamicDescriptionPart: (player: Player) => {
        return (<div className='dinamic-base-click-upgrade-description'>
            <p>Количество яиц за клик: {formatNumber(player.baseClickPower, player.settings.suffix, 1)}
                {' => '} {formatNumber(player.baseClickPower * 1.05, player.settings.suffix, 1)}
            </p>
        </div>)
    },
    clickModifier: 1.05,
    iconPath: clickUpgradeIcon9
}

const clickUpgrade10: Upgrade = {
    name: 'Сила клика 10',
    type: "click",
    price: 50000000000000000000,
    description: "Увеличивает количество яиц за клик на 5%",
    unlockCondition: (player: Player) => {
        return player.stats.totalScore > 10000000000000000000;
    },
    dinamicDescriptionPart: (player: Player) => {
        return (<div className='dinamic-base-click-upgrade-description'>
            <p>Количество яиц за клик: {formatNumber(player.baseClickPower, player.settings.suffix, 1)}
                {' => '} {formatNumber(player.baseClickPower * 1.05, player.settings.suffix, 1)}
            </p>
        </div>)
    },
    clickModifier: 1.05,
    iconPath: clickUpgradeIcon10
}

export const bonusEggUpgrade: Upgrade = {
    name: 'Золотые яйца',
    type: "bonuseggfrequency",
    price: 6666666,
    description: "Золотые яйца появляются в 2 раза чаще",
    unlockCondition: (player: Player) => {
        return player.stats.bonusEggsGathered > 0;
    },
    iconPath: egg
}

const generateBaseBuildingUpgrades = (initialPrice: number, name: string, building: Building): Upgrade[] => {
    let list = [1, 5, 10, 25, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500];
    return list.map((value, index) => {
        const upgrade: Upgrade = {
            name: name + ' ' + (index + 1),
            price: calculatePriceForIndex(initialPrice, index),
            type: "building",
            iconPath: building.iconPath,
            unlockCondition: (player: Player) => {
                return player.buildings.some((playerBuilding) => playerBuilding.index === building.index &&
                    playerBuilding.amount >= value);
            },
            dinamicDescriptionPart: (player: Player) => {
                let currentBuildingState = player.buildings.find((playerBuilding) => playerBuilding.index === building.index);
                if (currentBuildingState === undefined) {
                    return (<></>)
                }
                let currentOneBuildingProductivity = currentBuildingState.bonusPerSecond * currentBuildingState.currentMultiplier;
                let currentTotalBuildingProductivity = currentOneBuildingProductivity * currentBuildingState.amount;
                let efficiency = calculatePriceForIndex(initialPrice, index) / currentTotalBuildingProductivity;
                return (
                    <div className='dinamic-base-building-upgrade-description'>
                        <p>Производство одного здания:
                            {' ' + formatNumber(currentOneBuildingProductivity, player.settings.suffix)}
                            {' => '}{formatNumber(currentOneBuildingProductivity * 2, player.settings.suffix)}
                        </p>
                        <p>Производство всех зданий:
                            {' ' + formatNumber(currentTotalBuildingProductivity, player.settings.suffix)}
                            {' => '}{formatNumber(currentTotalBuildingProductivity * 2, player.settings.suffix)}
                        </p>
                        <p>Стоимость одного яйца в секунду: {formatNumber(efficiency, player.settings.suffix, 1)}</p>
                    </div>)
            },
            description: "Увеличивает производительность " + building.name + " в 2 раза.",
            buildingId: building.index,
            perSecondModifier: 2,
        }
        return upgrade;
    })
}


const calculatePriceForIndex = (initialPrice: number, index: number): number => {
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
    ...generateBaseBuildingUpgrades(500, 'Сильные клювы', building1),
    ...generateBaseBuildingUpgrades(5000, 'Обновление прошивки', building2),
    ...generateBaseBuildingUpgrades(55000, 'Вкусный корм', building3),
    ...generateBaseBuildingUpgrades(550000, 'Шампунь для куриц', building4),
    ...generateBaseBuildingUpgrades(60000000, 'План застройки', building5),
    ...generateBaseBuildingUpgrades(6250000000, 'Маркетинговый ход', building6),
    ...generateBaseBuildingUpgrades(650000000000, 'Изысканное блюдо', building7),
    ...generateBaseBuildingUpgrades(67500000000000, 'Температура турбин', building8),
    ...generateBaseBuildingUpgrades(7000000000000000, 'Курица или яйцо', building9),
    ...generateBaseBuildingUpgrades(750000000000000000, 'Мы здесь бессильны', building10),
    ...generateBaseBuildingUpgrades(77500000000000000000, 'Горячая лава', building11),
    ...generateBaseBuildingUpgrades(8000000000000000000000, 'Лазерные технологии', building12),
    clickUpgrade1, clickUpgrade2, clickUpgrade3, clickUpgrade4, clickUpgrade5, clickUpgrade6, clickUpgrade7, clickUpgrade8, clickUpgrade9, clickUpgrade10,
    bonusEggUpgrade
];

export const defaultPlayer: Player = {
    name: "",
    score: 0,
    baseClickPower: 1,
    baseScorePerSecond: 0,
    gameTick: 0,
    stats: {
        bonusEggsGathered: 0,
        totalScore: 0,
        maxScore: 0,
        startedAt: new Date(),
        endedAt: new Date(),
        timesClicked: 0
    },
    buildings: [
        building1, building2, building3,
        building4, building5, building6,
        building7, building8, building9,
        building10, building11, building12],
    settings: {
        suffix: Suffix.SHORT,
        surroundingVolume: 50,
        surroundingVolumeMuted: false
    },
    upgrades: [],
}