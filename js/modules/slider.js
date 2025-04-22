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
export default slider;