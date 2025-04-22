/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
    // Calc
    
    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;
    
    
    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex')
    } else {
        sex = 'female'
        localStorage.setItem('sex', sex)
    }
    
    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio')
    } else {
        ratio = 1.375
        localStorage.setItem('ratio', ratio)
    }
    
    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            
            element.classList.remove(activeClass);
            
            
            if (element.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                element.classList.add(activeClass)
            }
            if (element.getAttribute('id') === localStorage.getItem('sex')) {
                element.classList.add(activeClass)
            }
            
        });
    }
    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcTotal() {
        if (!sex || !height || !weight ||  !age || !ratio) {
            result.textContent = '____';
            return;
        }

        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(`${selector}`);
        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                
                if (e.target.getAttribute('data-ratio')) {
                    
                    ratio = +e.target.getAttribute('data-ratio')
                    localStorage.setItem('ratio', ratio)

                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', sex)
                }
                
                
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
                
                e.target.classList.add(activeClass);
                calcTotal();
            });
        });
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');
    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red'
            } else {
                input.style.border = 'none'
            }

            switch(input.getAttribute('id')) {
                case 'height': 
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }

            calcTotal();
    
        });

    }
    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');

}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");

function cards() {
    // menu 

    class MenuCards {
        constructor(src, alt, title, descr, price,parentSelector, ...classes) {
            this.src = src;
            this.alt = alt
            this.title = title;
            this.descr = descr;
            this.parent = document.querySelector(parentSelector);
            this.price = price * 41;
            this.classes = classes
        }
        addItemToSite() {
            const item = document.createElement('div')
            if (this.classes.length === 0) {
                this.classes = "menu__item";
                item.classList.add(this.classes);
            } else {
                this.classes.forEach(element => item.classList.add(element))
            }
            item.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr} </div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                    `
            this.parent.append(item)
            }
    }
    
    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResourse)('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCards(img, altimg, title, descr, price, '.menu .container').addItemToSite();
        });
    })

}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector, modalTimerId) {
     // Forms
     const forms = document.querySelectorAll(formSelector);
     const message = {
         loading: 'img/form/spinner.svg',
         success: 'Спасибо! Скоро мы с вами свяжемся',
         failure: 'Что то пошло не так'
     };
 
 
     forms.forEach(item => {
         bindPostData(item);
     });
 
     
     
     function bindPostData(form) {
         form.addEventListener('submit', (e) => {
             e.preventDefault();
 
             const statusMessage = document.createElement('img');
             statusMessage.src = message.loading;
             statusMessage.style.cssText = `
                 display: block;
                 margin: 0 auto;
             `;
             form.insertAdjacentElement('afterend', statusMessage)
 
     
             const formData = new FormData(form);
             const json = JSON.stringify(Object.fromEntries(formData.entries()))
             // axios.post('http://localhost:3000/requests', json)
             ;(0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
             .then(data => {
                     showThanksModal(message.success);
                     statusMessage.remove()
             })
             .catch(()=> {
                 showThanksModal(message.failure);
             })
             .finally(() => {
                 form.reset();
             })
         })
     }
     
     function showThanksModal(message) {
         const prevModalDialog = document.querySelector('.modal__dialog');
         
         prevModalDialog.classList.add('hide');
         (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId);
 
         const thanksModal = document.createElement('div');
         thanksModal.classList.add('modal__dialog');
         thanksModal.innerHTML = 
         `
         <div class="modal__content"> 
             <div class="modal__close" data-close >×</div>
             <div class="modal__title">${message}</div>
         </div>
         `
 
         document.querySelector('.modal').append(thanksModal);
         setTimeout(() => {
             thanksModal.remove();
             prevModalDialog.classList.add('show');
             prevModalDialog.classList.remove('hide');
             (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
         }, 4000)
     }
 
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModal: () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   openModal: () => (/* binding */ openModal)
/* harmony export */ });
function openModal(modalSelector, modalTimer) {
    const modal = document.querySelector(modalSelector);
    
    modal.classList.add('show')
    modal.classList.remove('hide')
    document.body.style.overflow = 'hidden'
    console.log(modalTimer);
    if (modalTimer) {
        clearInterval(modalTimer);
    }
}
 
function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.remove('show')
    modal.classList.add('hide')
    document.body.style.overflow = 'none'
}
function modal(triggerSelector, modalSelector, modalTimer) {
    const modal = document.querySelector(modalSelector),
          modalBtn = document.querySelectorAll(triggerSelector);

    

    modalBtn.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimer)) 
    });
    
    modal.addEventListener('click', (e) => {
        if (modal.classList.contains('show') && e.target == modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });
    document.addEventListener('keydown', (e) => {
        if (modal.classList.contains('show') && e.code === 'Escape') {
            closeModal(modalSelector);
        }
    })
    function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal(modalSelector, modalTimer);
            window.removeEventListener('scroll', showModalByScroll);
        }
        
    }
    window.addEventListener('scroll', showModalByScroll);

}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container, slide, field,totalCounter,currentCounter,wrapper, nextArrow, prevArrow}) {

    // Slider

    let slideIndex = 1;
    let offset = 0;

    const slider = document.querySelector(slide),
        slides = slider.querySelectorAll(container),
        prev = slider.querySelector(prevArrow),
        next = slider.querySelector(nextArrow),
        total = slider.querySelector(totalCounter),
        current = slider.querySelector(currentCounter),
        slidesWrapper = slider.querySelector(wrapper),
        width = window.getComputedStyle(slidesWrapper).width,
        slidesField = slider.querySelector(field);

        
        
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
            total.textContent = `0${slides.length}`;
        } else {
            total.textContent = `${slides.length}`;
            current.textContent = `0${slideIndex}`;

        }

        slidesWrapper.style.overflow = 'hidden';
        
        slidesField.style.display = 'flex';
        slidesField.style.width = convertationStrToNum(width) * slides.length - 1  + 'px';
        slidesField.style.transition = '0.5s all'; 
        

        slides.forEach(slide => {
            slide.style.width = width
        });

    
    function convertationStrToNum(str) {
        return +str.replace(/\D/g, '')
    }

    function changeValueSlider() {
        slidesField.style.transform = `translateX(-${offset}px)`
        current.textContent = slideIndex < 10 ? `0${slideIndex}` : slideIndex;
    }    

    next.addEventListener('click', (e) => {
        slideIndex == slides.length ? slideIndex = 1: slideIndex++ ;
        
        offset == (convertationStrToNum(width) * (slides.length - 1)) ? offset = 0: offset += convertationStrToNum(width);


        changeValueSlider();
        changeActiveNavigation(slideIndex - 1);
    });
    
    prev.addEventListener('click', (e) => {
        slideIndex == 1 ? slideIndex = slides.length : slideIndex--;

        offset == 0 ? offset = (convertationStrToNum(width) * (slides.length - 1)) : offset -= convertationStrToNum(width);
        changeValueSlider();

        changeActiveNavigation(slideIndex - 1);
    });
    const navigation = document.createElement('ul');
    
    navigation.classList.add('offer__slider-navigation');
    
    slides.forEach((element, i) => {
        navigation.innerHTML += `<li class="offer__slider-li" id="navigation${i + 1}"> </li>`
    });
    slider.append(navigation);
    navigation.style.cssText = 'width: 30%; display: flex; margin: 0 auto; justify-content: space-between; align-items: center; margin-top: 20px';

    const list = document.querySelectorAll('.offer__slider-li');


    function changeActiveNavigation(i=0) {
        list.forEach(element => element.style.backgroundColor = '');
        
        list[i].style.backgroundColor = 'black';
    }

    changeActiveNavigation();
    
    navigation.addEventListener('click', (e) => {
        if (e.target.matches('.offer__slider-li')) {

            const index = convertationStrToNum(e.target.id)
            offset = convertationStrToNum(width) * (index - 1);
            
            changeActiveNavigation(index - 1);
            slideIndex = index;
            changeValueSlider();
        }
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Tabs
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {

    let tabs = document.querySelectorAll(tabsSelector),
    tabsContent = document.querySelectorAll(tabsContentSelector),
    tabsParent = document.querySelector(tabsParentSelector);
    
    function hideTabContent() {
        tabsContent.forEach((item) => {
            item.style.display = 'none'
        });
        tabs.forEach((item) => {
            item.classList.remove(activeClass)
        });
    }
    
    function showTabContent(i = 0) {
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add(activeClass);
    }
    
    tabsParent.addEventListener('click', (event) => {
        const target = event.target
        
        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (item == target) {
                    hideTabContent()
                    showTabContent(i)
                }
            })
        }
    })
    
    hideTabContent()    
    showTabContent()
}
 
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(timerSelector, deadline) {
    function calculationTime(endtime) {
        const total = Date.parse(endtime) - Date.parse(new Date());
        let days, hours, minutes, seconds;

        if (total <= 0) {
            days = 0,
            hours = 0,
            minutes = 0,
            seconds = 0;
        } else {   
            days = Math.floor(total / (1000 * 60 * 60 * 24)),
            hours = Math.floor((total / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((total / 1000 / 60) % 60),
            seconds = Math.floor((total / 1000) % 60);
        }
            
        return {total, days, hours, minutes, seconds}
    }
    
    function checkZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`
        }else {
            return num
        }
    }
    
    function getValueTimer(selector , endtime) {

        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              cycle = setInterval(changeValue, 1000);

        
        changeValue()
        
        function changeValue() {
            const t = calculationTime(endtime);
            
            days.textContent = checkZero(t.days);
            hours.textContent = checkZero(t.hours);
            minutes.textContent = checkZero(t.minutes);
            seconds.textContent = checkZero(t.seconds);
            
            if (t.total <= 0) {
                clearInterval(cycle);
            }
        }

    }
    
    getValueTimer(timerSelector, deadline);

}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getResourse: () => (/* binding */ getResourse),
/* harmony export */   postData: () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => { 
    const res = await fetch(url, {
        method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
    })
    return await res.json();
};

async function getResourse(url) { 
    const res = await fetch(url)
    if (!res.ok) {
        throw new Error(`Some error code: ${res.status}, url: ${url}`)
    }

    return await res.json();
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");

  

 





document.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__.openModal)('.modal', modalTimerId), 30000);
  
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_1__["default"])('form', modalTimerId);
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__["default"])('[data-modalbtn]', '.modal', modalTimerId);
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_4__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])('.timer', '2025-06-1');
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_3__["default"])({
        container: '.offer__slide',
        slide: '.offer__slider',
        field: '.offer__slider-inner',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
    });
    (0,_modules_calculator__WEBPACK_IMPORTED_MODULE_5__["default"])();
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_0__["default"])();
    
});
    
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map