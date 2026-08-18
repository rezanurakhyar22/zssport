(function () {
  const canvas = document.getElementById('scale-canvas');
  if (!canvas) return;

  function applyScale() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    
    // Base resolution 1920x1080 for the scoreboard
    const baseWidth = 1920;
    const baseHeight = 1080;
    
    // Calculate scale to fit within the window
    const scaleX = vw / baseWidth;
    const scaleY = vh / baseHeight;
    const scale = Math.min(scaleX, scaleY);
    
    // Apply fixed dimensions and scale
    canvas.style.width = baseWidth + 'px';
    canvas.style.height = baseHeight + 'px';
    canvas.style.transformOrigin = 'top left';
    canvas.style.transform = 'scale(' + scale + ')';
    
    // Center it in the viewport
    canvas.style.position = 'absolute';
    canvas.style.left = ((vw - (baseWidth * scale)) / 2) + 'px';
    canvas.style.top = ((vh - (baseHeight * scale)) / 2) + 'px';
  }

  applyScale();
  window.addEventListener('resize', applyScale);
  window.addEventListener('orientationchange', function () {
    setTimeout(applyScale, 200);
  });
})();
