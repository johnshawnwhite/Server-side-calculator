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
    url: '/calculations',
    method: 'GET'
  })
    .then(res => {
      console.log('GET /calculations', res);
    })
    .catch(err => {
      console.log(' GET /calculations', err);


      // send calculations list to the dom
      $('#calculations-list').empty();
      for (let operation of res) {
        $('#calculations-list').append(`
        ${operation.firstNumber} ${operation.operator} ${operation.secondNumber} = ${operations.result}`);
      }
    })
}

function clickOperator() {
    operator = $(this).text();//
    console.log('operator click', operator);// i will need this information for post
}



function equal() {
    console.log('equal');

    //gather input fields
    const firstNumber = $('#firstNumber').val();
    const operator = $('#operator').val();
    const secondNumber = $('#secondNumber').val();
    
    //post gathering from input fields
    //server will calculate

  $.ajax({
    url: '/calculations',
    mehod: 'POST',
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
