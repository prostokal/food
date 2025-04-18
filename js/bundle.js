/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((module) => {

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
module.exports = calc;

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((module) => {

function forms() {
     // Forms

     const forms = document.querySelectorAll('form');
    
     const message = {
         loading: 'img/form/spinner.svg',
         success: 'Спасибо! Скоро мы с вами свяжемся',
         failure: 'Что то пошло не так'
     };
 
 
     forms.forEach(item => {
         bindPostData(item);
     });
 
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
             postData('http://localhost:3000/requests', json)
             .then(data => {
                     console.log(data);
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
         const modal = document.querySelector('[data-modal]');
         const prevModalDialog = document.querySelector('.modal__dialog');
         
         prevModalDialog.classList.add('hide');
         modal.classList.add('show')
         modal.classList.remove('hide')
         document.body.style.overflow = 'hidden'
 
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
             modal.classList.remove('show')
             modal.classList.add('hide')
             document.body.style.overflow = ''
         }, 4000)
     }
 
}
module.exports = forms;

/***/ }),

/***/ "./js/modules/menu.js":
/*!****************************!*\
  !*** ./js/modules/menu.js ***!
  \****************************/
/***/ ((module) => {

function menu() {

    // menu 

    async function getResourse(url) { 
        const res = await fetch(url)
        if (!res.ok) {
            throw new Error(`Some error code: ${res.status}, url: ${url}`)
        }

        return await res.json();
    };
    
    const menuWrapper = document.querySelector('.menu .container');

    class MenuItems {
        constructor(src, alt, title, descr, price, ...classes) {
            this.src = src;
            this.alt = alt
            this.title = title;
            this.descr = descr;
            this.price = price * 41;
            this.classes = classes
        }
        addItemToSite(wrapper) {
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
            wrapper.append(item)
            }
    }
    
    getResourse('http://localhost:3000/menu')
    .then(data => {
        console.log(data)
        data.forEach(({img, altimg, title, descr, price}) => {
            new MenuItems(img, altimg, title, descr, price).addItemToSite(menuWrapper);
        });
    })

}
module.exports = menu;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

function modal() {
    const modal = document.querySelector('[data-modal]'),
          modalBtn = document.querySelectorAll('[data-modalbtn]');

    function openModal() {
        modal.classList.add('show')
        modal.classList.remove('hide')
        document.body.style.overflow = 'hidden'
        clearInterval(modalTimer);
    }
     
    function closeModal() {
        modal.classList.remove('show')
        modal.classList.add('hide')
        document.body.style.overflow = ''
    }
    

    modalBtn.forEach(btn => {
        btn.addEventListener('click', openModal) 
    });
    
    modal.addEventListener('click', (e) => {
        if (modal.classList.contains('show') && e.target == modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });
    document.addEventListener('keydown', (e) => {
        if (modal.classList.contains('show') && e.code === 'Escape') {
            closeModal();
        }
    })
    const modalTimer = setTimeout(openModal, 50000);
    function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
        
    }
    window.addEventListener('scroll', showModalByScroll);

}
module.exports = modal;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

function slider() {

    // Slider

    let slideIndex = 1;
    let offset = 0;

    const slider = document.querySelector('.offer__slider'),
        slides = slider.querySelectorAll(".offer__slide"),
        prev = slider.querySelector(".offer__slider-prev"),
        next = slider.querySelector(".offer__slider-next"),
        total = slider.querySelector("#total"),
        current = slider.querySelector("#current"),
        slidesWrapper = slider.querySelector(".offer__slider-wrapper"),
        width = window.getComputedStyle(slidesWrapper).width,
        slidesField = slider.querySelector(".offer__slider-inner");

        
        
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
module.exports = slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

// Tabs
function tabs() {

    let tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsParent = document.querySelector('.tabheader__items');
    
    function hideTabContent() {
        tabsContent.forEach((item) => {
            item.style.display = 'none'
        });
        tabs.forEach((item) => {
            item.classList.remove('tabheader__item_active')
        });
    }
    
    function showTabContent(i = 0) {
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
    }
    
    tabsParent.addEventListener('click', (event) => {
        const target = event.target
        
        if (target && target.classList.contains('tabheader__item')) {
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
 
module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

function timer() {

    const deadline = '2025-06-1'
    
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
    
    getValueTimer('.timer', deadline);

}
module.exports = timer;

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
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
document.addEventListener('DOMContentLoaded', () => {
    const menu = __webpack_require__(/*! ./modules/menu */ "./js/modules/menu.js"),
        forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js"), 
        modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
        slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js"),
        tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
        calculator = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js"),
        timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");

    menu();
    forms();
    modal();
    slider();
    tabs();
    calculator();
    timer();
    
});
    
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map