document.addEventListener('DOMContentLoaded', () => {
    const menu = require('./modules/menu'),
        forms = require('./modules/forms'), 
        modal = require('./modules/modal'),
        slider = require('./modules/slider'),
        tabs = require('./modules/tabs'),
        calculator = require('./modules/calculator'),
        timer = require('./modules/timer');

    menu();
    forms();
    modal();
    slider();
    tabs();
    calculator();
    timer();
    
});
    