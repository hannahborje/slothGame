class Game {

    createSpin() {
        const spinRules = {
            minNumber: 0,
            maxNumber: 4,
            total:     3
        };

        const randomNumbers = [];
        for (let i = 0; i < spinRules.total; i++) {
            randomNumbers.push(getRandomNumber(spinRules.minNumber, spinRules.maxNumber));
        }
        return randomNumbers;
    }

    winnerText(randomNumbers) {
        return checkForWin(randomNumbers);
    }
}

function getRandomNumber(minNumber, maxNumber) {
    return Math.floor((Math.random() * maxNumber) + minNumber);
}

function checkForWin(randomNumbers) {
    let theSameNumber;
    let numberToCheck;
    const winnerText = {
        big:    'BIG WIN',
        small:  'SMALL WIN',
        no:     'NO WIN'
    };

    for (let i = 0; i < randomNumbers.length; i++) {
        theSameNumber = 0;
        numberToCheck = randomNumbers[i];
        for (let j = 0; j < randomNumbers.length; j++) {
            if (numberToCheck === randomNumbers[j]) {
                theSameNumber += 1;
            }
        }
        if (theSameNumber === randomNumbers.length) {
            return winnerText.big;
        } else if (theSameNumber === randomNumbers.length - 1) {
            return winnerText.small;
        }
    }
    return winnerText.no;
}

module.exports = Game;