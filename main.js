// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!

document.addEventListener('DOMContentLoaded', () => {
  // Get all heart elements and error modal
  const hearts = document.querySelectorAll('.like-glyph');
  const errorModal = document.getElementById('modal');
  
  // Add click event listener to each heart
  hearts.forEach(heart => {
    heart.addEventListener('click', handleLike);
  });
  
  function handleLike(event) {
    const heart = event.target;
    
    if (heart.textContent === FULL_HEART) {
      // If heart is full, change back to empty
      heart.textContent = EMPTY_HEART;
      heart.classList.remove('activated-heart');
    } else {
      // If heart is empty, mimic server call
      mimicServerCall()
        .then(() => {
          // On success, make heart full and red
          heart.textContent = FULL_HEART;
          heart.classList.add('activated-heart');
        })
        .catch(error => {
          // On failure, show error modal
          errorModal.classList.remove('hidden');
          document.getElementById('modal-message').textContent = error;
          
          // Hide modal after 3 seconds
          setTimeout(() => {
            errorModal.classList.add('hidden');
          }, 3000);
        });
    }
  }
});





//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
