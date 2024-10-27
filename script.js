let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');
let carouselDom = document.querySelector('.carousel');
let sliderDom = carouselDom.querySelector('.list');
let thumbnailBorderDom = carouselDom.querySelector('.thumbnail');
let timeDom = carouselDom.querySelector('.time');
thumbnailBorderDom.appendChild(thumbnailBorderDom.querySelectorAll('.item')[0]);

let timeRunning = 3000;
let runTimeOut;
let runNextAuto;

// Event listeners for next and previous buttons
nextDom.onclick = function() {
    showSlider('next');
};

prevDom.onclick = function() {
    showSlider('prev');
};

function startAutoSlide() {
    let timeAutoNext = isMouseOverCarousel() ? 4000 : 3000; // Change time based on hover
    runNextAuto = setTimeout(() => {
        nextDom.click(); // Trigger next
    }, timeAutoNext);
}

// Function to stop auto sliding
function stopAutoSlide() {
    clearTimeout(runNextAuto);
}

// Event listeners to pause and resume the carousel on hover
carouselDom.addEventListener('mouseenter', stopAutoSlide);
carouselDom.addEventListener('mouseleave', startAutoSlide);

// Initial start of auto sliding
startAutoSlide();

function showSlider(type) {
    // Get updated slider and thumbnail items
    let sliderItemsDom = sliderDom.querySelectorAll('.item');
    let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');

    if (type === 'next') {
        // Move the first item to the end
        sliderDom.appendChild(sliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    } else {
        // Move the last item to the start
        sliderDom.prepend(sliderItemsDom[sliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }

    // Clear previous timeout for animations
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);

    // Reset auto slide
    stopAutoSlide();
    startAutoSlide();
}
document.addEventListener('DOMContentLoaded', () => {
    const sliderInner = document.querySelector('.tranding-slider-inner');
    const slides = document.querySelectorAll('.tranding-slide');

    const slideCount = slides.length;
    let currentIndex = 0;
    const slideWidth = slides[0].clientWidth; // Width of a single slide
    const animationDuration = 20000; // Total duration of the animation (in milliseconds)
    
    // Clone the first slide to create an infinite loop effect
    const firstSlide = slides[0].cloneNode(true);
    sliderInner.appendChild(firstSlide); // Append a clone at the end

    // Set the total width of the inner slider
    sliderInner.style.width = `${(slideCount + 1) * slideWidth}px`;

    // Function to move to the next slide
    function nextSlide() {
        currentIndex++;
        sliderInner.style.transition = `transform 1s linear`;
        sliderInner.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

        // Reset to the first slide after the last one
        if (currentIndex === slideCount) {
            setTimeout(() => {
                sliderInner.style.transition = 'none'; // Remove transition for immediate snap
                sliderInner.style.transform = `translateX(0)`; // Reset to the first slide
                currentIndex = 0; // Reset index
            }, 1000); // Match this timeout with your transition duration
        }
    }

    // Automatic sliding
    let slideInterval = setInterval(nextSlide, animationDuration / slideCount);

    // Pause on hover
    const trandingSlider = document.querySelector('.tranding-slider');

    trandingSlider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval); // Stop sliding
    });

    trandingSlider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, animationDuration / slideCount); // Restart sliding
    });
});
