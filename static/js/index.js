window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/interpolation/stacked";
var NUM_INTERP_FRAMES = 240;

var interp_images = [];
function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper').empty().append(image);
}


$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");
    });

    // Initialize carousel
    function initCarousel() {
      const slides = document.querySelectorAll('.carousel-slide');
      const wrapper = document.querySelector('.carousel-wrapper');
      const carouselContainer = document.querySelector('.carousel-container');
      
      if (!slides.length || !wrapper || !carouselContainer) {
        console.error('Carousel elements not found');
        return;
      }

      let currentSlide = 0;
      const totalSlides = slides.length;
      let autoPlayInterval;

      // Move slide function
      function moveSlide(direction) {
        currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
        wrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
      }

      // Auto play function
      function startAutoPlay() {
        if (autoPlayInterval) {
          clearInterval(autoPlayInterval);
        }
        autoPlayInterval = setInterval(() => {
          moveSlide(1);
        }, 3000);
      }

      // Stop auto play when hovering over the carousel
      carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
      });

      // Resume auto play when mouse leaves the carousel
      carouselContainer.addEventListener('mouseleave', () => {
        startAutoPlay();
      });

      // Add click handlers for navigation buttons
      document.querySelector('.carousel-button.prev').addEventListener('click', () => moveSlide(-1));
      document.querySelector('.carousel-button.next').addEventListener('click', () => moveSlide(1));

      // Start auto play
      startAutoPlay();
    }

    // Initialize carousel after a short delay to ensure DOM is ready
    setTimeout(initCarousel, 100);

    // Remove the old carousel code
    /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/
    preloadInterpolationImages();

    $('#interpolation-slider').on('input', function(event) {
      setInterpolationImage(this.value);
    });
    setInterpolationImage(0);
    $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

    bulmaSlider.attach();
});
