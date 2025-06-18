import { Suffix } from "../context/player-context.tsx";

interface NumberFormat {
    digits: number;
    suffix: string;
    shortSuffix: string;
}

const numberFormats: NumberFormat[] = [
    {
        digits: 6,
        suffix: "Миллионов",
        shortSuffix: "M"
    },
    {
        digits: 9,
        suffix: "Миллиардов",
        shortSuffix: "B"
    },
    {
        digits: 12,
        suffix: "Триллионов",
        shortSuffix: "T"
    },
    {
        digits: 15,
        suffix: "Квадралионов",
        shortSuffix: "Qa"
    },
    {
        digits: 18,
        suffix: "Квинтилионов",
        shortSuffix: "Qi"
    },
    {
        digits: 21,
        suffix: "Секстилионов",
        shortSuffix: "Sx"
    },
    {
        digits: 24,
        suffix: "Септилионов",
        shortSuffix: "Sp"
    },
]

export const formatNumber = (num: number, suffix: Suffix, precision?: number) => {
    if (num === 0) {
        return "0";
    }
    const absNum = Math.abs(num);
    if (absNum < 1e6) {
        return num.toFixed(precision === undefined ? 0 : precision);
    }
    
    const exponent = Math.floor(Math.log10(absNum));
    let selectedFormat : NumberFormat | null = null;
    for (let i = numberFormats.length - 1; i >= 0; i--) {
        if (numberFormats[i].digits <= exponent) {
            selectedFormat = numberFormats[i];
            break;
        }
    }

    if (selectedFormat !== null) {
        const value = num / Math.pow(10, selectedFormat.digits);
        return value.toFixed(3) + " " + (suffix === Suffix.LONG ? selectedFormat.suffix : selectedFormat.shortSuffix);
    } else {
        return num.toExponential(3);
    }
}