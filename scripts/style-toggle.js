document.addEventListener('DOMContentLoaded', function() {
  console.log('Style toggle script loaded');
  
  // Get the current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const mainStylesheet = document.getElementById('main-style');
  
  // Get the toggle container and switch
  const toggleContainer = document.querySelector('.theme-switch-container');
  const themeSwitch = document.getElementById('theme-toggle-switch');
  
  // Handle GenAI page - hide toggle
  if (currentPage === 'genai.html' && toggleContainer) {
    toggleContainer.style.display = 'none';
    return;
  }
  
  // Exit if elements not found
  if (!themeSwitch || !mainStylesheet) {
    console.error('Required elements not found');
    return;
  }
  
  // Check if current theme is light
  let isLightTheme = mainStylesheet.getAttribute('href').includes('alt.css');
  
  // Set the initial state of the toggle
  themeSwitch.checked = isLightTheme;
  
  // Function to switch themes
  function switchTheme(toLightTheme) {
    console.log('Switching to', toLightTheme ? 'light' : 'dark', 'theme');
    
    // Add cache-busting parameter
    const timestamp = '?v=' + Date.now();
    
    // Set the stylesheet
    if (toLightTheme) {
      mainStylesheet.href = 'styles/alt.css' + timestamp;
    } else {
      mainStylesheet.href = 'styles/main.css' + timestamp;
    }
    
    // Force browser to re-paint to ensure styles apply
    document.body.style.display = 'none';
    setTimeout(function() {
      document.body.style.display = '';
    }, 5);
    
    // Save preference
    localStorage.setItem('theme', toLightTheme ? 'light' : 'dark');
    
    // Update state variable
    isLightTheme = toLightTheme;
  }
  
  // Set initial state based on localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light' && !isLightTheme) {
    switchTheme(true);
    themeSwitch.checked = true;
  } else if (savedTheme === 'dark' && isLightTheme) {
    switchTheme(false);
    themeSwitch.checked = false;
  }
  
  // Add change event listener
  themeSwitch.addEventListener('change', function() {
    switchTheme(this.checked);
  });
  
  // Apply page-specific classes based on the current page
  const bodyElement = document.body;
  
  // Remove any existing page classes
  bodyElement.classList.remove('portfolio-page', 'service-page', 'qualifications-page');
  
  // Add the appropriate class based on current page
  if (currentPage === 'portfolio.html') {
    bodyElement.classList.add('portfolio-page');
  } else if (currentPage === 'service.html') {
    bodyElement.classList.add('service-page');
  } else if (currentPage === 'qualifications.html') {
    bodyElement.classList.add('qualifications-page');
  }
  
  console.log('Theme toggle setup complete');
});