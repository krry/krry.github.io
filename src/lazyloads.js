// Run after the HTML document has finished loading
const lazyloads = function() {
    // Get our lazy-loaded images
    let lazyImages = [].slice.call(document.querySelectorAll(".lazy"));
    // Do this only if IntersectionObserver is supported
    if ("IntersectionObserver" in window) {
        // Create new observer object
        let lazyImageObserver = new IntersectionObserver(function(entries) {
            // Loop through IntersectionObserverEntry objects
            entries.forEach(function(entry) {
                // Do these if the target intersects with the root
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove("lazy");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        // Loop through and observe each image
        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    } else {
      // `document.querySelectorAll` does not work in Opera Mini
      lazyImages = document.getElementsByClassName("lazy");
      // https://stackoverflow.com/questions/3871547/js-iterating-over-result-of-getelementsbyclassname-using-array-foreach
      [].forEach.call(lazyImages, function (lazyImage) {
        lazyImage.src = lazyImage.dataset.src;
        lazyImage.classList.remove("lazy");
        lazyImage.height = 'auto';
      });
    }
};

export default lazyloads;
