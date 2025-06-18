interface NumberFormat {
    digits: number,
    suffix: string,
    shortSuffix: string,
}

const numberFormars : NumberFormat[] = [
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

export const formatNumber = (num: number, precision?: number) => {
    if(num === undefined){
        return "";
    }
    if(num.toFixed(0).length - 1 < 6){
        return num.toFixed(precision === undefined ? 0 : precision);
    }
    const numLength = num.toFixed(0).length;
    const format = numberFormars.find(format => format.digits === Math.floor(numLength / 3) * 3);
    if(format !== undefined){
        return (num / Math.pow(10, format.digits)).toFixed(3) + " " + format.suffix;
    }else{
        return num.toExponential(3);
    }
}