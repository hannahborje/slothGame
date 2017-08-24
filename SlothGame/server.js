// PACKAGES
var express = require('express');
var app     = express();
var Game    = require('./app/models/game');
var cors    = require('cors');

app.use(cors());

const port = process.env.PORT || 8080;

// ROUTES
const router = express.Router();

let freeSpinCount = 1;

// test route to make sure everything is working (GET http://localhost:8080/api)
router.get('/', (req, res) => {
    res.json({
        message: 'API route is working fine.'
    });
});

router.route('/play')

    // get the numbers and winner text (GET http://localhost:8080/api/play)
    .get((req, res) => {
        freeSpinCount = freeSpinCount + 1;

        const newGame = new Game();
        const randomNumbers = newGame.createSpin();
        const winnerText = newGame.winnerText(randomNumbers);
        res.json({
            numbers: randomNumbers,
            winnerText,
            freeSpin: isFreeSpin(freeSpinCount)
        });

    });


// all routes prefixed with /api
app.use('/api', router);

if (!module.parent) {
    app.listen(port);
}
module.exports = app

console.log(`Port ${port}`);

function isFreeSpin(freeSpinCount) {

    if (freeSpinCount !== 0 && freeSpinCount % 4 === 0) {
        return true;
    }
    return false;
}