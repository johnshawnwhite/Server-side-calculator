
const express = require('express');
// had to add above line, i installed parser as well. thought i needed it. assuming i was wrong at this point.
// but had have the bodyparser const, because of the installed package
const app = express();
const PORT = 5000;
//global, all endpoints must connect

//history 
let calculations = [];


// provide static files for client side
app.use(express.static('server/public'));
// will not run, lots of errors, without this
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// let bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log('listening on port', 5000)
});


app.get('/calculations', (req, res) => {
    res.send(calculations);
});
// request body will look likethe operations model almost

//   {
//     number1: 10
//     number2: 10
//     operator: +-*/
//   }
//   Respond with OK (201)
// **********************

app.post('/calculations', (req, res) => {
    console.log('POST /calculations', req.body);

    //gather information from inputs here
    const firstNumber = Number(req.body.firstNumber);
    const secondNumber = Number(req.body.secondNumber);
    const operator = req.body.operator;


    let result;
    if (operator === '/') {
        result = firstNumber / secondNumber;
    }
    else if (operator === '*') {
        result = firstNumber * secondNumber;
    }
    else if (operator === '+') {
        result = firstNumber + secondNumber;
    }
    else if (operator === '-') {
        result = firstNumber - secondNumber;
    }
    else {
        res.sendStatus(400).send('Try again');
        return;
    }
    console.log('result', result);
// get endpoint needs to use the post
// you are pushing this object into the array to display on history
calculations.push({
        firstNumber: firstNumber,
        secondNumber: secondNumber,
        operator: operator,
        result: result
});
    res.sendStatus(201);

});


