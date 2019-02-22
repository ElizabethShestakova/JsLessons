const cartWrapper = document.querySelector('.cart__wrapper'),
      cart = document.querySelector('.cart'),
      close = document.querySelector('.cart__close'),
      open = document.querySelector('#cart'),
      goodsBtn = document.querySelectorAll('.goods__btn'),
      products = document.querySelectorAll('.goods__item'),
      confirm = document.querySelector('.confirm'),
      badge = document.querySelector('.nav__badge'),
      totalCost = document.querySelector('.cart__total > span'),//только первый span
      titles = document.querySelectorAll('.goods__title');

function openCart() {
    cart.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    cart.style.display = 'none';
    document.body.style.overflow = '';
}

open.addEventListener('click', openCart);
close.addEventListener('click', closeCart);

goodsBtn.forEach(function(btn, i) {
    btn.addEventListener('click', () => {
        let item = products[i].cloneNode(true),//клонировали узел, true - клонировать ли потомков или только сам узел
            trigger = item.querySelector('button'),//кнопка "Добавить в коризну"
            removeBtn = document.createElement('div'),//будет добавлять удаление из корзины
            empty = cartWrapper.querySelector('.empty');//надпись "корзина пуста"
        
        trigger.remove();

        showConfirm();
        

        removeBtn.classList.add('goods__item-remove');
        removeBtn.innerHTML = '&times';//крестик
        item.appendChild(removeBtn);

        cartWrapper.appendChild(item);
        caclGoods(); 
        calcTotal();       
        if (empty.style.display == 'block' || empty.style.display == '' ) {            
            empty.style.display = 'none';
            console.log(empty.style.display);
            // empty.remove();
        }
        removeFromCart();
    });

    //обрежем названия товаров
    function sliceTitles() {
        titles.forEach(function(item) {
            //trim() - убрат пробелмы в начале и в конце строки
            if (item.textContent.trim().length > 40) {
               let str = `${item.textContent.trim().slice(0, 40)}...`;
               item.textContent = str; 
            }            
        })
    }

    sliceTitles();

    function showConfirm() {
        confirm.style.display = 'block';
        let counter = 100;
        const id = setInterval(frame, 10);

        function frame() {
            if (counter == 10) {
                clearInterval(id);
                confirm.style.display = 'none';
            } else {
                counter--;
                confirm.style.transform = `translateY(-${counter}px)`;
                confirm.style.opacity = '.' + counter;
            }

        }
    }

    function caclGoods() {
        const items = cartWrapper.querySelectorAll('.goods__item');
        // console.log(items);
        badge.textContent = items.length;
        let empty = cartWrapper.querySelector('.empty');
        if (items.length == 0 && empty.style.display == 'none') {            
            empty.style.display = 'block';
        }
    }

    function calcTotal() {
        const prices = document.querySelectorAll('.cart__wrapper > .goods__item > .goods__price > span');
        let total = 0;
        prices.forEach(function(item) {
            total += +item.textContent;
        })
        totalCost.textContent = total;
    }

    function removeFromCart() {
       const removeBtn = cartWrapper.querySelectorAll('.goods__item-remove');//кнопки крестики
       removeBtn.forEach(function(btn) {
           btn.addEventListener('click', () => {
            btn.parentElement.remove();

            caclGoods(); 
            calcTotal();

           })
       });
    }

});