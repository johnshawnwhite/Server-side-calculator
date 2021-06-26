console.log('js loaded');


function onReady() {
    console.log('will recieve meets expectation or better')


    //click event for equal button, class will work bc only one possible target for class
    $(document).on('click', '#equal-Button', equal);
    //this is for all other both of these buttons behave similar to the delete button from salary calculator
    $(document).on('click', '.operator-Button', clickOperator);
}
// global

// give operator a name its global
let operator;


// as in from the server
function getOperation() {
  $.ajax({
    url: '/operations',
    method: 'GET'
  })
    .then(res => {
      console.log('GET /operations', res);
    })
    .catch(err => {
      console.log(' GET /operations', err);
    })
}

function clickOperator() {
    operator = $(this).text();//
    console.log('operator click', operator);// i will need this information for post
}



function equal() {
    console.log('equal');

    //gather input fields
    const firstNumber = $('#first-number').val();
    const secondNumber = $('#second-number').val();
    
    //post gathering from input fields
    //server will calculate

  $.ajax({
    url: '/operations',
    mehod: 'POST',
    data:  {
        firstNumber: firstNumber,
        secondNumber: secondNumber,
        operator: operator,
    }
  })
  .then(res => {
    console.log('POST /operations complete', res);
  })
.catch(err => {
    console.log('POST /operations fail', err);
  })
}
