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

        removeBtn.classList.add('goods__item-remove');
        removeBtn.innerHTML = '&times';//крестик
        item.appendChild(removeBtn);

        cartWrapper.appendChild(item);

        if (empty) {
            empty.remove();
        }
    });
});