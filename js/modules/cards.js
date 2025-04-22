import { getResourse } from "../services/services";
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
    
    getResourse('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCards(img, altimg, title, descr, price, '.menu .container').addItemToSite();
        });
    })

}
export default cards;