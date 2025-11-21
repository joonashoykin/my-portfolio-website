document.addEventListener('DOMContentLoaded', () => {

  const projects = document.querySelectorAll('.project');
  const toTop = document.getElementById('toTop');

  const loadingText = document.getElementById('loading-text');
  const loadingScreen = document.getElementById('loading-screen');

  let dots = 1;
  const loadingInterval = setInterval(() => {
    dots = (dots % 3) + 1;
    loadingText.textContent = "loading" + ".".repeat(dots);
  }, 500);

  setTimeout(() => {
    clearInterval(loadingInterval);
    loadingScreen.classList.add('fade-out');
    document.getElementById('site-content').style.visibility = 'visible';
  }, 2000);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.2 });

  projects.forEach(p => observer.observe(p));

  window.addEventListener('scroll', () => {
    toTop.style.display = window.scrollY > 400 ? 'block' : 'none';
  });

  toTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const welcomeText = document.getElementById('welcome-text');
  const projectSummaries = document.querySelectorAll('.project-summary');

  const langButtons = document.querySelectorAll('.lang-btn');
  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      if (!translations[lang]) return;

      welcomeText.textContent = translations[lang].welcome;

      projectSummaries.forEach((p, i) => {
        p.textContent = translations[lang].projects[i];
      });
    });
  });

});
