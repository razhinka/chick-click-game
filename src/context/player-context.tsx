export interface Player {
    name: string,
    score: number,
    baseClickPower: number,
    baseScorePerSecond: number,
    stats: Stats,
    gameTick: number,
    buildings: Array<Building>,
    upgrades: Array<Upgrade>,
    settings: Settings,
}

export interface Settings {
    surroundingVolume: number,
    surroundingVolumeMuted: boolean,
}

export interface Stats {
    timesClicked: number,
    maxScore: number,
    totalScore: number,
    startedAt: Date,
    endedAt: Date,
    bonusEggsGathered: number,
}

export interface Building {
    index: number,
    name: string,
    amount: number,
    bonusPerSecond: number,
    currentMultiplier: number,
    dynamicDescriptionPart?: (player: Player) => React.JSX.Element,
    visibleAt?: number,
    unlocksAt?: number,
    basePrice: number,
    price: number,
    iconPath: string,
}

export interface Upgrade {
    name: string,
    price: number,
    type: string,
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

export const click = (player: Player, setPlayer: (player : Player) => void) : void => {
    let newScore = player.score + player.baseClickPower;
    setPlayer({...player, 
        score: newScore,
        stats: {
            ...player.stats,
            totalScore: player.stats.totalScore + player.baseClickPower,
            maxScore: Math.max(player.stats.maxScore, newScore),
            timesClicked: player.stats.timesClicked + 1,
        }
    });
}