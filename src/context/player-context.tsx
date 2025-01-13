export interface Player {
    name: string,
    score: number,
    baseClickPower: number,
    baseScorePerSecond: number,
    maxScore: number,
    totalScore: number,
    startedAt: Date,
    endedAt: Date,
    gameTick: number,
    bonusEggsGathered: number,
    buildings: Array<Building>,
    upgrades: Array<Upgrade>,
    settings: Settings,
}

export interface Settings {
    surroundingVolume: number,
    surroundingVolumeMuted: boolean,
}

export interface Building {
    index: number,
    name: string,
    amount: number,
    bonusPerSecond: number,
    currentMultiplier: number,
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
    dinamicDescriptionPart?: (player: Player) => React.JSX.Element,
    unlockCondition?: (player: Player) => boolean,
    clickModifier?: number,
    buildingId?: number,
    perSecondModifier?: number,
    iconPath: string
}

export interface Buff {
    name: string,
    description: string,
    ttl: number,
    clickModifier?: number,
    perSecondModifier?: number,
    unlockCondition?: (player: Player) => boolean,
    iconPath: string,
}

export interface OnUpdateUpgrade {
    name: string,
    price: number,
    unlockCondition?: (player: Player) => boolean,
    onUpdate: (player: Player, setPlayer: (player: Player) => void) => void
}