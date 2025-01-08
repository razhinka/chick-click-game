export interface Player {
    name: string,
    score: number,
    baseClickPower: number,
    baseScorePerSecond: number,
    maxScore: number,
    totalScore: number,
    buildings: Array<Building>,
    upgrades: Array<Upgrade>,
}

export interface Building {
    index: number,
    name: string,
    amount: number,
    bonusPerClick?: number,
    bonusPerSecond?: number,
    visibleAt?: number,
    unlocksAt?: number,
    basePrice: number,
    price: number,
    iconPath: string,
}

export interface Upgrade {
    name: string,
    price: number,
    description?: string,
    unlockCondition?: (player: Player) => boolean,
    clickModifier?: number,
    buildingId?: number,
    perSecondModifier?: number,
    iconPath: string,
}

export interface OnUpdateUpgrade {
    name: string,
    price: number,
    unlockCondition?: (player: Player) => boolean,
    onUpdate: (player: Player, setPlayer: (player: Player) => void) => void
}