const setWidth = (elements, heightPx) => {
  elements.forEach(el => {
    newHeight = heightPx || `${el.offsetHeight}px`;
    el.style.width = newHeight;
  });
};

const setHeight = (elements, widthPx) => {
  elements.forEach(el => {
    newWidth = widthPx || `${el.offsetWidth}px`;
    el.style.height = newWidth;
  });
};

const resizeWidth = (elArrays) => {
  elArrays.forEach(elArr => {
    setWidth(elArr);
  });
};

const resizeHeight = (elArrays) => {
  elArrays.forEach(elArr => {
    setHeight(elArr);
  })
};

const setDuration = (durationFloat, ...elArrays) => {
  elArrays.forEach(elArray => {
    elArray.forEach(el => el.style.transitionDuration = `${durationFloat}s`)
  })
};

const enableAndClear = (input, time) => {
  setTimeout(() => {
    input.disabled = false;
    input.value = "";
  }, time);
};

const submitAnimation = (success = true) => {
  const iconClass = success ? '.fa-check' : '.fa-times';
  const tempClass = success ? 'success' : 'error';
  const setterInput = document.querySelector('.setter-input');
  const icon = document.querySelector(iconClass);

  setterInput.disabled = true;
  setterInput.classList.add(tempClass);
  icon.classList.remove('hidden-icon');

  setTimeout(() => {
    setterInput.classList.remove(tempClass);
    icon.classList.add('hidden-icon');
    enableAndClear(setterInput, 380);
  }, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
  const outerCircles = Array.from(document.getElementById('circles').children);
  setHeight(outerCircles);
  
  const outerSquares = Array.from(document.getElementById('squares').children);
  setHeight(outerSquares);

  // const morphContainers = Array.from(document.getElementById('morphers').children);
  // setHeight(morphContainers);

  const morphers = Array.from(document.getElementsByClassName('morpher'));
  setWidth(morphers);

  window.onresize = () => {
    resizeWidth([morphers]);
    resizeHeight([outerCircles, outerSquares]);
  };

  const durationSetterForm = document.querySelector('.duration-setter-form');
  durationSetterForm.onsubmit = event => {
    event.preventDefault();

    const input = event.currentTarget.querySelector('.setter-input');
    const newDuration = parseFloat(input.value);
    const innerCircles = outerCircles.map(outerCircle => outerCircle.firstElementChild);
    const innerSquares = outerSquares.map(outerSquare => outerSquare.firstElementChild);

    if (newDuration) {
      setDuration(newDuration, innerCircles, innerSquares, morphers);
      submitAnimation(true);
    } else {
      submitAnimation(false);
    }
  }
});
