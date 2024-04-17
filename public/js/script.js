document.addEventListener('DOMContentLoaded', function(){

  const allButtons = document.querySelectorAll('.searchBtn');
  const searchBar = document.querySelector('.searchBar');
  const searchInput = document.getElementById('searchInput');
  const searchClose = document.getElementById('searchClose');

  for (var i = 0; i < allButtons.length; i++) {
    allButtons[i].addEventListener('click', function() {
      searchBar.style.visibility = 'visible';
      searchBar.classList.add('open');
      this.setAttribute('aria-expanded', 'true');
      searchInput.focus();
    });
  }

  searchClose.addEventListener('click', function() {
    searchBar.style.visibility = 'hidden';
    searchBar.classList.remove('open');
    this.setAttribute('aria-expanded', 'false');
  });


});

//youtube video 
// Get all video containers
const videoContainers = document.querySelectorAll('.video-container');

// Add event listeners for mouse enter and leave
videoContainers.forEach(container => {
    container.addEventListener('mouseenter', () => {
        // Get the video element inside the container
        const video = container.querySelector('.video');
        // Play the video on hover
        video.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    });

    container.addEventListener('mouseleave', () => {
        // Get the video element inside the container
        const video = container.querySelector('.video');
        // Pause the video when mouse leaves
        video.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    });
});
