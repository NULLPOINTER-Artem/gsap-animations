const animateText = (element) => {
  let newText = "";
  const theElement = typeof element === 'string' ? document.querySelector(element) : element;
  const customEasing = CustomEase.create("custom", "M0,0 C0.168,0 0.216,0.515 0.32,0.734 0.454,1.017 0.743,1 1,1")

  for (let i = 0; i < theElement.innerText.length; i++) {
    let newEl = `<span class="chair">`;
    if (theElement.innerText[i] === " ") { newEl += "&nbsp;" }
    else { newEl += theElement.innerText[i]; }
    newEl += "</span>";

    newText += newEl;
  }

  theElement.innerHTML = newText;
  const newDiv = document.createElement('div');
  newDiv.className = 'background-word';
  newDiv.innerHTML = newText;
  theElement.appendChild(newDiv);

  const theFirstLvlChildren = theElement.querySelectorAll(':scope > span');

  theElement.addEventListener('mouseenter', () => {
    gsap.to(theFirstLvlChildren, {
      yPercent: -100,
      duration: 0.5,
      ease: customEasing,
      stagger: {
        each: 0.03,
        from: 'start'
      },
      overwrite: 'auto'
    });

    gsap.to(newDiv.children, {
      top: `0%`,
      duration: 0.5,
      ease: customEasing,
      stagger: {
        each: 0.03,
        from: 'start'
      },
      overwrite: 'auto'
    });
  });

  theElement.addEventListener('mouseleave', () => {
    gsap.to(theFirstLvlChildren, {
      yPercent: 0,
      duration: 0.4,
      ease: customEasing,
      stagger: {
        each: 0.03,
        from: 'end'
      },
      overwrite: 'auto'
    });

    gsap.to(newDiv.children, {
      top: `100%`,
      duration: 0.4,
      ease: customEasing,
      stagger: {
        each: 0.03,
        from: 'end'
      },
      overwrite: 'auto'
    });
  });
};

const animateProgress = (element) => {
  gsap.fromTo(
    element,
    {
      width: '0%'
    },
    {
      width: '100%',
      duration: 3.5,
      ease: 'slow(0.7,0.7,false)'
    }
  );

  gsap.from('.progress-bar__number', {
    textContent: 0,
    duration: 3.5,
    ease: 'slow(0.7,0.7,false)',
    snap: { textContent: 1 },
    stagger: {
      each: 1.0,
      onUpdate() {
        this.targets()[0].innerHTML = `${Math.ceil(this.targets()[0].textContent)} %`;
      },
    }
  });

};

export const init = () => {
  gsap.registerPlugin(CustomEase, EasePack.SlowMo);

  const navLinks = $('.the-header__nav-item');

  if (navLinks && navLinks.length) {
    navLinks.each((_, el) => {
      animateText(el);
    });
  }

  const progressBar = $('.progress-bar__wrap');

  if (progressBar && progressBar.length) {
    animateProgress(progressBar[0]);
  }
}
