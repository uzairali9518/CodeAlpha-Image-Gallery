document.addEventListener('DOMContentLoaded', function() {
    // Image data - pointing to local assets
    const images = [
        { url: 'assests/image1.jpeg', title: 'Beautiful Nature' },
        { url: 'assests/image2.jpeg', title: 'City Skyline' },
        { url: 'assests/image3.jpeg', title: 'Wild Animal' },
        { url: 'assests/image4.jpeg', title: 'Modern Architecture' },
        { url: 'assests/image5.jpeg', title: 'Delicious Food' },
        { url: 'assests/image6.jpeg', title: 'Portrait' },
        { url: 'assests/image7.jpeg', title: 'Technology' },
        { url: 'assests/image8.jpeg', title: 'Travel Destination' }
    ];

    // DOM elements
    const mainImage = document.getElementById('main-image');
    const imageTitle = document.getElementById('image-title');
    const thumbnailsContainer = document.querySelector('.thumbnails');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const playButton = document.getElementById('play-slideshow');
    const fullscreenButton = document.getElementById('fullscreen');
    const imageCounter = document.querySelector('.image-counter');
    const galleryContainer = document.querySelector('.gallery-container');

    // State variables
    let currentIndex = 0;
    let slideshowInterval = null;
    const slideshowDelay = 3000; // 3 seconds
    let isPlaying = false;

    // Initialize the gallery
    function initGallery() {
        // Create thumbnails
        images.forEach((image, index) => {
            const thumbnail = document.createElement('img');
            thumbnail.src = image.url;
            thumbnail.alt = image.title;
            thumbnail.classList.add('thumbnail');
            if (index === 0) thumbnail.classList.add('active');
            
            thumbnail.addEventListener('click', () => {
                setCurrentImage(index);
                if (isPlaying) {
                    resetSlideshow();
                }
            });
            
            thumbnailsContainer.appendChild(thumbnail);
        });

        // Set the first image
        if (images.length > 0) {
            setCurrentImage(0);
        }
    }

    // Set the current image
    function setCurrentImage(index) {
        // Validate index
        if (index < 0) index = images.length - 1;
        if (index >= images.length) index = 0;
        
        currentIndex = index;
        const image = images[index];
        
        // Update main image with fade effect
        mainImage.style.opacity = 0;
        setTimeout(() => {
            mainImage.src = image.url;
            mainImage.alt = image.title;
            imageTitle.textContent = image.title;
            mainImage.style.opacity = 1;
        }, 200);
        
        // Update counter
        imageCounter.textContent = `${index + 1}/${images.length}`;
        
        // Update active thumbnail
        const thumbnails = document.querySelectorAll('.thumbnail');
        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
        
        // Scroll thumbnail into view
        if (thumbnails[index]) {
            thumbnails[index].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    }

    // Navigation functions
    function prevImage() {
        setCurrentImage(currentIndex - 1);
        if (isPlaying) {
            resetSlideshow();
        }
    }

    function nextImage() {
        setCurrentImage(currentIndex + 1);
        if (isPlaying) {
            resetSlideshow();
        }
    }

    // Slideshow functions
    function startSlideshow() {
        if (slideshowInterval) return;
        
        isPlaying = true;
        playButton.innerHTML = '<i class="fas fa-pause"></i> Pause';
        slideshowInterval = setInterval(nextImage, slideshowDelay);
    }

    function stopSlideshow() {
        clearInterval(slideshowInterval);
        slideshowInterval = null;
        isPlaying = false;
        playButton.innerHTML = '<i class="fas fa-play"></i> Slideshow';
    }

    function resetSlideshow() {
        stopSlideshow();
        startSlideshow();
    }

    function toggleSlideshow() {
        if (isPlaying) {
            stopSlideshow();
        } else {
            startSlideshow();
        }
    }

    // Fullscreen functions
    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            galleryContainer.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`);
            });
            fullscreenButton.innerHTML = '<i class="fas fa-compress"></i> Exit';
        } else {
            document.exitFullscreen();
            fullscreenButton.innerHTML = '<i class="fas fa-expand"></i> Fullscreen';
        }
    }

    // Event listeners
    prevButton.addEventListener('click', prevImage);
    nextButton.addEventListener('click', nextImage);
    playButton.addEventListener('click', toggleSlideshow);
    fullscreenButton.addEventListener('click', toggleFullscreen);

    // Handle fullscreen change
    document.addEventListener('fullscreenchange', () => {
        if (!document.fullscreenElement) {
            fullscreenButton.innerHTML = '<i class="fas fa-expand"></i> Fullscreen';
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevImage();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        } else if (e.key === 'Escape' && document.fullscreenElement) {
            document.exitFullscreen();
        } else if (e.key === ' ' || e.key === 'Spacebar') {
            toggleSlideshow();
            e.preventDefault();
        }
    });

    // Initialize the gallery
    initGallery();
});
