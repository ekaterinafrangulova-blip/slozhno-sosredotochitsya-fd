(function initTheme() {
  const theme = localStorage.getItem('theme');
  if (theme) {
    setTheme(theme);
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  const currentTheme = [...document.documentElement.classList]
    .find((cn) => cn.startsWith('theme-'))
    ?.replace('theme-', '');
  const themeButtons = [
    ...document.querySelectorAll('.header__theme-menu-button'),
  ];
  setActiveButton(themeButtons, currentTheme);

  themeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const chosenTheme = [...button.classList]
        .find((cn) => cn.includes('_type_'))
        .split('_type_')[1];
      setTheme(chosenTheme);
      setActiveButton(themeButtons, chosenTheme);
    });
  });

  initGalleryCarousel();
});

function setTheme(theme) {
  document.documentElement.className = '';
  document.documentElement.classList.add(`theme-${theme}`);
  localStorage.setItem('theme', theme);
}

function setActiveButton(buttonsArray, theme) {
  buttonsArray.forEach((button) => {
    button.classList.remove('header__theme-menu-button_active');
    button.removeAttribute('disabled');
  });
  const target = buttonsArray.find((button) =>
    button.classList.contains(`header__theme-menu-button_type_${theme}`)
  );
  if (target) {
    target.classList.add('header__theme-menu-button_active');
    target.setAttribute('disabled', true);
  } else {
    const autoButton = document.querySelector(
      '.header__theme-menu-button_type_auto'
    );
    autoButton.classList.add('header__theme-menu-button_active');
    autoButton.setAttribute('disabled', true);
  }
}

function initGalleryCarousel() {
  const track = document.querySelector('.section-gallery__track');
  const slides = [...document.querySelectorAll('.section-gallery__slide')];
  const prevButton = document.querySelector('.section-gallery__button_prev');
  const nextButton = document.querySelector('.section-gallery__button_next');
  const counter = document.querySelector('.section-gallery__counter');
  const slideCount = slides.length;
  let currentIndex = 0;

  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    counter.textContent = `${currentIndex + 1} / ${slideCount}`;
    slides.forEach((slide, index) => {
      const isCurrent = index === currentIndex;
      slide.toggleAttribute('inert', !isCurrent);
      slide.setAttribute('aria-hidden', String(!isCurrent));
    });
  }

  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slideCount) % slideCount;
    updateCarousel();
  });

  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slideCount;
    updateCarousel();
  });

  updateCarousel();
}
