const lerp = (start, end, factor) => start * (1 - factor) + end * factor;

export function smoothScroll(targetPosition, duration = 1000) {
  return new Promise(resolve => {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const startTime = performance.now();

    function animation(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic function for smooth deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      const currentPosition = lerp(startPosition, targetPosition, easeOut);
      window.scrollTo(0, currentPosition);

      if (progress < 1) {
        requestAnimationFrame(animation);
      } else {
        resolve();
      }
    }

    requestAnimationFrame(animation);
  });
} 