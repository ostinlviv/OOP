class Item {
    constructor (name, place, price, weight) {
        this.name = name;
        this.place = place;
        this.weight = weight;
        this.price = price;
    };

    add(name, weight) {
        console.log('You add ' + weight + ' kg of ' + this.name + ' to cart');
        document.querySelector('.empty').style.display = 'none';
        document.querySelector('.buy').style.display = 'block';

        let price = this.price * weight;
        this.weight = this.weight - weight;
        cart.push(new Item(this.name, this.place, price, weight));
        const cartLi = document.createElement('li');
        cartLi.setAttribute("class", this.name);
        const inputRemove = document.createElement('input');
        inputRemove.setAttribute("type", "button");
        inputRemove.setAttribute("value", "Remove");
        inputRemove.addEventListener('click', function () {
            eval(name.toLowerCase()).remove();
        });
        cartLi.innerHTML = this.name + ' (' + weight + ' kg)   -   ' + price + ' UAH' + '    ';
        cartList.appendChild(cartLi);
        cartLi.appendChild(inputRemove);

    };

    remove() {
        console.log('You remove ' + this.name + ' from cart');
        for (let i = 0; i < cart.length; i++) {
            if(cart[i].name === this.name) {
                cart.splice(i, 1);
            }
        }
        let elem = document.querySelector('li.' + this.name);
        elem.remove();
        if (cart.length === 0) {
            document.querySelector('.empty').style.display = 'block';
            document.querySelector('.buy').style.display = 'none';
        }
    };
}

const cart = [];
const apples = new Item('Apples', 'Fruits section', 25, 100);
const bananas = new Item('Bananas', 'Fruits section', 30, 100);
const lemons = new Item('Lemons', 'Fruits section', 40, 100);
const pineapples = new Item('Pineapples', 'Fruits section', 60, 100);
const strawberries = new Item('Strawberries', 'Fruits section', 70, 100);
const peaches = new Item('Peaches', 'Fruits section', 54, 100);
const melons = new Item('Melons', 'Fruits section', 28, 100);
const potatoes = new Item('Potatoes', 'Vegetable section', 10, 100);
const carrot = new Item('Carrot', 'Vegetable section', 14, 100);
const tomatoes = new Item('Tomatoes', 'Vegetable section', 48, 100);
const lettuce = new Item('Lettuce', 'Vegetable section', 9, 100);
const garlic = new Item('Garlic', 'Vegetable section', 20, 100);
const onion = new Item('Onion', 'Vegetable section', 32, 100);
const cucumber = new Item('Cucumber', 'Vegetable section', 41, 100);

const shop = [apples, bananas, lemons, pineapples, strawberries, peaches, melons, potatoes, carrot, tomatoes, lettuce, garlic, onion, cucumber];

const fruits = document.querySelector('ul.fruits');
const vegetables = document.querySelector('ul.vegetables');
const cartList = document.querySelector('ul.cart');
for(let i = 0; i < shop.length; i++) {
    if (shop[i].place === 'Fruits section') {
        const li = document.createElement('li');
        const inputWeight = document.createElement('input');
        const inputAdd = document.createElement('input');
        inputWeight.setAttribute("type", "number");
        inputWeight.setAttribute("placeholder", "Input weight in kg");
        inputWeight.setAttribute("min", "0");
        inputAdd.setAttribute("type", "button");
        inputAdd.setAttribute("value", "Add");
        inputAdd.addEventListener('click',function(){
            eval(shop[i].name.toLowerCase()).add(shop[i].name, inputWeight.value);
        });
        li.innerHTML = shop[i].name + ' (' + shop[i].price + ' UAH/kg)';
        fruits.appendChild(li);
        fruits.appendChild(inputWeight);
        fruits.appendChild(inputAdd);
    }
}

for(let i = 0; i < shop.length; i++) {
    if (shop[i].place === 'Vegetable section') {
        const li = document.createElement('li');
        const inputWeight = document.createElement('input');
        const inputAdd = document.createElement('input');
        inputWeight.setAttribute("type", "number");
        inputWeight.setAttribute("placeholder", "Input weight in kg");
        inputAdd.setAttribute("type", "button");
        inputAdd.setAttribute("value", "Add");
        inputAdd.addEventListener('click',function(){
            eval(shop[i].name.toLowerCase()).add(shop[i].name, inputWeight.value);
        });
        li.innerHTML = shop[i].name + ' (' + shop[i].price + ' UAH/kg)';
        vegetables.appendChild(li);
        vegetables.appendChild(inputWeight);
        vegetables.appendChild(inputAdd);
    }
}

const buy = document.querySelector('#buybutton');
buy.addEventListener('click', function() {
    const checkout = document.querySelector('#checkout');
    checkout.style.display = 'block';
    document.querySelector('#cart').style.display = 'none';
    document.querySelector('#items').style.display = 'none';
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const check = document.querySelector('.checkout');
        const li = document.createElement('li');
        li.innerHTML = cart[i].name + ' (' + cart[i].price / cart[i].weight + ' UAH/kg)   -   ' + cart[i].weight + ' kg   -->   ' + cart[i].price + ' UAH';
        check.appendChild(li);
        total += cart[i].price;
        if (i === cart.length-1) {
            const totalPrice = document.createElement('div');
            totalPrice.style.color = 'red';
            totalPrice.innerHTML = 'Total Price: ' + total + ' UAH';
            document.querySelector('.checkout').appendChild(totalPrice);
        }
    }


});
