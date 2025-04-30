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

    var options = {
			slidesToScroll: 1,
			slidesToShow: 3,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }

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

    // Carousel functionality
    document.addEventListener('DOMContentLoaded', function() {
      const carouselTrack = document.querySelector('.carousel-track');
      const slides = document.querySelectorAll('.carousel-slide');
      const prevButton = document.querySelector('.carousel-control.prev');
      const nextButton = document.querySelector('.carousel-control.next');
      
      if (!carouselTrack || !slides.length) return;
      
      let currentIndex = 0;
      let slideCount = slides.length;
      let autoScrollInterval;
      
      // Clone first and last slides for infinite scrolling
      const firstClone = slides[0].cloneNode(true);
      const lastClone = slides[slideCount - 1].cloneNode(true);
      
      carouselTrack.appendChild(firstClone);
      carouselTrack.insertBefore(lastClone, slides[0]);
      
      // Update slide count
      slideCount += 2;
      
      // Set initial position
      currentIndex = 1;
      updateCarousel();
      
      // Auto-scroll functionality
      function startAutoScroll() {
        if (autoScrollInterval) clearInterval(autoScrollInterval);
        autoScrollInterval = setInterval(() => {
          nextSlide();
        }, 1000); // Change slide every 1 second
      }
      
      function stopAutoScroll() {
        if (autoScrollInterval) {
          clearInterval(autoScrollInterval);
          autoScrollInterval = null;
        }
      }
      
      function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateCarousel();
      }
      
      function prevSlide() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateCarousel();
      }
      
      function updateCarousel() {
        const offset = -currentIndex * 100;
        carouselTrack.style.transform = `translateX(${offset}%)`;
        
        // Reset position for infinite scrolling
        if (currentIndex === slideCount - 1) {
          setTimeout(() => {
            carouselTrack.style.transition = 'none';
            currentIndex = 1;
            carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
            setTimeout(() => {
              carouselTrack.style.transition = 'transform 0.5s ease-in-out';
            }, 50);
          }, 500);
        } else if (currentIndex === 0) {
          setTimeout(() => {
            carouselTrack.style.transition = 'none';
            currentIndex = slideCount - 2;
            carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
            setTimeout(() => {
              carouselTrack.style.transition = 'transform 0.5s ease-in-out';
            }, 50);
          }, 500);
        }
      }
      
      // Event listeners
      if (prevButton) {
        prevButton.addEventListener('click', () => {
          stopAutoScroll();
          prevSlide();
          startAutoScroll();
        });
      }
      
      if (nextButton) {
        nextButton.addEventListener('click', () => {
          stopAutoScroll();
          nextSlide();
          startAutoScroll();
        });
      }
      
      // Start auto-scroll
      startAutoScroll();
      
      // Pause auto-scroll on hover
      carouselTrack.addEventListener('mouseenter', stopAutoScroll);
      carouselTrack.addEventListener('mouseleave', startAutoScroll);
    });

})
