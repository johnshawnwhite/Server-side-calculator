$(document).ready(onReady);

console.log('js loaded');


function onReady() {
    console.log('will recieve meets expectation or better')

    //click event for equal button, class will work bc only one possible target for class
    $('#submit').on('click', equal);
    // console.log('clicked equal')
    //this is for all other both of these buttons behave similar to the delete button from salary calculator
    $('.operator').on('click', clickOperator);
    console.log('clicked an operator')
    $('#reset').on('click', clearInputs);
    getOperation();
    


}
// global

// give operator a name its global
let operator;


// as in from the server
function getOperation() {
  $.ajax({
    method: 'GET',
    url: '/calculations',
  })
    .then(result => {
      console.log('GET /calculations', result);

        // send calculations list to the dom
      $('#calculations').empty();
        for (let operation of result) {
          $('#calculations').append(`
          <li>${operation.firstNumber} ${operation.operator} ${operation.secondNumber} = ${operation.result}</li>
          `);
      }


    })
    .catch(err => {
      console.log(' GET /calculations', err);


      
      
    })
}

function clearInputs() {
  $('#firstNumber').val('');
  $('#secondNumber').val('');
  operator = undefined;
  console.log('inputs clear')
}

function clickOperator() {
    operator = $(this).text();// captures the value of the operator chosen
    console.log('operator click', operator);// i will need this information for post
}



function equal() {
    console.log('equal button has been clicked');

    
    //post gathering from input fields
    //server will calculate

  $.ajax({
    method: 'POST',
    url: '/calculations',
    data:  {
        firstNumber: $('#firstNumber').val(),
        secondNumber: $('#secondNumber').val(),
        operator: operator,
    }
  })
  .then(result => {
    console.log('POST /calculations complete', result);
    getOperation();
  })
  .catch(err => {
    console.log('POST /calculations fail', err);
  })
}
