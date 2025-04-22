import cards from './modules/cards';
import forms from './modules/forms';  
import modal from './modules/modal';
import slider from './modules/slider'; 
import tabs from './modules/tabs';
import calculator from './modules/calculator';
import timer from './modules/timer';
import { openModal } from './modules/modal';

document.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 30000);
  
    forms('form', modalTimerId);
    modal('[data-modalbtn]', '.modal', modalTimerId);
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    timer('.timer', '2025-06-1');
    slider({
        container: '.offer__slide',
        slide: '.offer__slider',
        field: '.offer__slider-inner',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
    });
    calculator();
    cards();
    
});
    