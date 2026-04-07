// ── VIDEO LAZY LOADING ──
(function () {
  window.addEventListener("load", function () {
    const lazyVideos = document.querySelectorAll('video[id]');
    lazyVideos.forEach(video => {
      const source = video.querySelector('source[data-src]');
      if (source) {
        source.src = source.dataset.src;
        video.load();
        
        // Ensure autoplay works after manual load
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            // Auto-play was prevented
            console.log("Autoplay prevented:", error);
          });
        }
      }
    });
  });
})();
