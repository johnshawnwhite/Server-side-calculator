console.log('js loaded');


function onReady() {
    console.log('will recieve meets expectation or better')


    //click event for equal button, class will work bc only one possible target for class
    $(document).on('click', '#submit', equal);
    //this is for all other both of these buttons behave similar to the delete button from salary calculator
    $(document).on('click', '#operator', clickOperator);
}
// global

// give operator a name its global
let operator;


// as in from the server
function getOperation() {
  $.ajax({
    url: '/calculations',
    method: 'GET'
  })
    .then(res => {
      console.log('GET /calculations', res);

        // send calculations list to the dom
      $('#calculations').empty();
        for (let operation of res) {
          $('#calculations').append(`
          ${operation.firstNumber} ${operation.operator} ${operation.secondNumber} = ${operations.result}
          `);
      }


    })
    .catch(err => {
      console.log(' GET /calculations', err);


      
      
    })
}

function clickOperator() {
    operator = $(this).text();// captures the value of the operator chosen
    console.log('operator click', operator);// i will need this information for post
}



function equal() {
    console.log('equal');

    //gather input fields
    const firstNumber = $('#firstNumber');
    const operator = $('#operator');
    const secondNumber = $('#secondNumber');
    
    //post gathering from input fields
    //server will calculate

  $.ajax({
    url: '/calculations',
    method: 'POST',
    data:  {
        firstNumber: firstNumber,
        secondNumber: secondNumber,
        operator: operator,
    }
  })
  .then(res => {
    console.log('POST /calculations complete', res);
  })
.catch(err => {
    console.log('POST /calculations fail', err);
  })
}
