$(document).ready(function(){
  $('#scienceForma').submit(function(e){
    e.preventDefault();
    let valid = true;
    $('#bravo').text('');
    $('input, textarea').removeClass('error');
    $('.poruka').remove();

    // Regex
    const nameRegex = /^[A-Za-zÀ-ž\s]{2,30}$/; // kukice
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const unitRegex = /^\d+(\.\d+)?\s?(cm|m|kg|g|mm)?$/i;

    // Name
    const name = $('#name').val().trim();
    if(!nameRegex.test(name)) {
      $('#name').addClass('error');
      $('<div class="poruka">Please enter a valid name (letters and spaces only).</div>').insertAfter('#name');
      valid = false;
    }

    // Email
    const email = $('#email').val().trim();
    if(!emailRegex.test(email)) {
      $('#email').addClass('error');
      $('<div class="poruka">Please enter a valid email address.</div>').insertAfter('#email');
      valid = false;
    }

// Date
const date = $('#date').val();
const today = new Date().toISOString().split('T')[0]; // today's date in yyyy-mm-dd
if(!date || date > today) {
  $('#date').addClass('error');
  $('<div class="poruka">Please select a valid date (not in the future, unless your experiment is time travel :D).</div>').insertAfter('#date');
  valid = false;
}


    // Unit
    const value = $('#value').val().trim();
    if(!unitRegex.test(value) || parseFloat(value) < 0) {
      $('#value').addClass('error');
      $('<div class="poruka">Please enter a valid positive measurement (e.g., 23.5 cm).</div>').insertAfter('#value');
      valid = false;
    }

    if(valid){
      $('#bravo').text('Form submitted successfully!');
    } else {
      $('#bravo').text('Please fix the highlighted fields.');
    }
  });
});

