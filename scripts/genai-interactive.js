// Initialize when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Particles.js configuration for the header
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: '#9cc6e9' },
        shape: { type: 'circle' },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: '#4a6b8c', opacity: 0.4, width: 1 },
        move: { enable: true, speed: 2, direction: 'none', random: true, out_mode: 'out' }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: true, mode: 'grab' },
          onclick: { enable: true, mode: 'push' }
        },
        modes: {
          grab: { distance: 140, line_linked: { opacity: 1 } },
          push: { particles_nb: 4 }
        }
      }
    });
  }

  // Set up the canvas visualization
  setupCanvas();
  
  // Add scroll animations
  setupScrollAnimations();
});

// Canvas visualization
function setupCanvas() {
  const canvas = document.getElementById('ai-visualizer');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let width = canvas.width = canvas.offsetWidth;
  let height = canvas.height = canvas.offsetHeight;
  
  // Visualization settings
  let complexity = 50;
  let speed = 50;
  let colorTheme = 'blue';
  
  // Color themes
  const colors = {
    blue: ['#172a45', '#3a506b', '#4a6b8c', '#9cc6e9'],
    purple: ['#4a0e6d', '#7b1fa2', '#9c27b0', '#e1bee7'],
    green: ['#004d40', '#00796b', '#009688', '#b2dfdb'],
    orange: ['#e65100', '#ef6c00', '#ff9800', '#ffe0b2']
  };
  
  // Particles array
  let particles = [];
  
  // Create particles
  function createParticles() {
    particles = [];
    const particleCount = Math.floor(complexity * 1.5);
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 3 + 1,
        color: colors[colorTheme][Math.floor(Math.random() * 4)],
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 2 - 1,
        directionChangeTime: Math.random() * 100
      });
    }
  }
  
  // Update canvas size on window resize
  window.addEventListener('resize', () => {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
    createParticles();
  });
  
  // Animation function
  function animate() {
    ctx.clearRect(0, 0, width, height);
    
    // Draw connection lines
    ctx.globalAlpha = 0.2;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i];
        const p2 = particles[j];
        const dist = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
        
        if (dist < 100) {
          ctx.beginPath();
          ctx.strokeStyle = p1.color;
          ctx.lineWidth = 0.5;
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }
    
    // Update and draw particles
    ctx.globalAlpha = 1;
    particles.forEach(p => {
      p.directionChangeTime--;
      
      if (p.directionChangeTime <= 0) {
        p.speedX = Math.random() * 2 - 1;
        p.speedY = Math.random() * 2 - 1;
        p.directionChangeTime = Math.random() * 100;
      }
      
      p.x += p.speedX * (speed / 25);
      p.y += p.speedY * (speed / 25);
      
      // Bounce off edges
      if (p.x < 0 || p.x > width) p.speedX = -p.speedX;
      if (p.y < 0 || p.y > height) p.speedY = -p.speedY;
      
      // Draw particle
      ctx.beginPath();
      ctx.fillStyle = p.color;
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    });
    
    requestAnimationFrame(animate);
  }
  
  // Set up controls
  const complexitySlider = document.getElementById('complexity');
  const speedSlider = document.getElementById('speed');
  const colorOptions = document.querySelectorAll('.color-option');
  
  if (complexitySlider) {
    complexitySlider.addEventListener('input', (e) => {
      complexity = parseInt(e.target.value);
      createParticles();
    });
  }
  
  if (speedSlider) {
    speedSlider.addEventListener('input', (e) => {
      speed = parseInt(e.target.value);
    });
  }
  
  if (colorOptions.length) {
    colorOptions.forEach(option => {
      option.style.backgroundColor = colors[option.dataset.color][2];
      
      option.addEventListener('click', () => {
        colorTheme = option.dataset.color;
        createParticles();
      });
    });
  }
  
  // Initialize and start animation
  createParticles();
  animate();
}

// Scroll animations for hobby cards
function setupScrollAnimations() {
  const hobbyCards = document.querySelectorAll('.hobby-card');
  
  // Simple animation on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });
  
  // Set initial style and observe
  hobbyCards.forEach(card => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
}