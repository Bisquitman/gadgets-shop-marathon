export const serviceCounter = ({wrapper, number, selectorDec, selectorInc}) => {
  let wrapCounter;
  let numberElem;

  if (typeof wrapper === 'string') {
    wrapCounter = document.querySelector(wrapper);
    numberElem = wrapCounter.querySelector(number);
  } else {
    wrapCounter = wrapper;
    numberElem = number;
  }

  wrapCounter.addEventListener('click', ({target}) => {
    if (target.closest(selectorDec)) {
      numberElem.value = +numberElem.value === 0 ? 0 : +numberElem.value - 1;
    }

    if (target.closest(selectorInc)) {
      numberElem.value = +numberElem.value + 1;
    }
  });
};
