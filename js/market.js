class Goods {
    constructor (name, place, price, weight) {
        this.name = name;
        this.place = place;
        this.weight = weight;
        this.price = price;
    };
}

class Shop extends Goods{
    constructor() {
        super();
        this.shop = [];
        this.cart = new Cart()
    }
    create() {
        const apples = new Goods('Apples', 'Fruits section', 25, 100);
        const bananas = new Goods('Bananas', 'Fruits section', 30, 100);
        const lemons = new Goods('Lemons', 'Fruits section', 40, 100);
        const pineapples = new Goods('Pineapples', 'Fruits section', 60, 100);
        const strawberries = new Goods('Strawberries', 'Fruits section', 70, 100);
        const peaches = new Goods('Peaches', 'Fruits section', 54, 100);
        const melons = new Goods('Melons', 'Fruits section', 28, 100);
        const potatoes = new Goods('Potatoes', 'Vegetable section', 10, 100);
        const carrot = new Goods('Carrot', 'Vegetable section', 14, 100);
        const tomatoes = new Goods('Tomatoes', 'Vegetable section', 48, 100);
        const lettuce = new Goods('Lettuce', 'Vegetable section', 9, 100);
        const garlic = new Goods('Garlic', 'Vegetable section', 20, 100);
        const onion = new Goods('Onion', 'Vegetable section', 32, 100);
        const cucumber = new Goods('Cucumber', 'Vegetable section', 41, 100);
        this.shop.push(apples, bananas, lemons, pineapples, strawberries, peaches, melons, potatoes, carrot, tomatoes, lettuce, garlic, onion, cucumber);


    }

    addProduct(product, weight) {
        this.cart.add(product, weight);
        console.log(this.cart);
    }

    find() {
        const fruits = document.querySelector('ul.fruits');
        const vegetables = document.querySelector('ul.vegetables');
        for(let i = 0; i <  this.shop.length; i++) {
            if (this.shop[i].place === 'Fruits section') {
                const li = document.createElement('li');
                const inputWeight = document.createElement('input');
                const inputAdd = document.createElement('input');
                inputWeight.setAttribute("type", "number");
                inputWeight.setAttribute("placeholder", "Input weight in kg");
                inputWeight.setAttribute("min", "1");
                inputAdd.setAttribute("type", "button");
                inputAdd.setAttribute("value", "Add");
                inputAdd.classList.add(this.shop[i].name.toLowerCase());
                inputAdd.addEventListener('click', () => {
                    this.addProduct(this.shop[i], inputWeight.value)});
                li.innerHTML =  this.shop[i].name + ' (' +  this.shop[i].price + ' UAH/kg)';
                fruits.appendChild(li);
                fruits.appendChild(inputWeight);
                fruits.appendChild(inputAdd);
            }
        }
        for(let i = 0; i <  this.shop.length; i++) {
            if (this.shop[i].place === 'Vegetable section') {
                const li = document.createElement('li');
                const inputWeight = document.createElement('input');
                const inputAdd = document.createElement('input');
                inputWeight.setAttribute("type", "number");
                inputWeight.setAttribute("placeholder", "Input weight in kg");
                inputWeight.setAttribute("min", "1");
                inputAdd.setAttribute("type", "button");
                inputAdd.setAttribute("value", "Add");
                inputAdd.classList.add(this.shop[i].name.toLowerCase());
                inputAdd.addEventListener('click', () => {
                    this.addProduct(this.shop[i], inputWeight.value)});
                li.innerHTML =  this.shop[i].name + ' (' +  this.shop[i].price + ' UAH/kg)';
                vegetables.appendChild(li);
                vegetables.appendChild(inputWeight);
                vegetables.appendChild(inputAdd);
            }
        }
    }
}

class Cart {
    constructor() {
        this.products = [];
    }
    add(product, weight) {
        console.log('You add ' + weight + ' kg of ' + product.name + ' to cart');
        document.querySelector('.empty').style.display = 'none';
        document.querySelector('.buy').style.display = 'block';
        const cartList = document.querySelector('ul.cart');
        let price = product.price * weight;
        shop.weight = shop.weight - weight;
        this.products.push(new Goods(product.name, product.place, price, weight));
        const cartLi = document.createElement('li');
        cartLi.dataset.name = product.name;
        const inputRemove = document.createElement('input');
        inputRemove.setAttribute("type", "button");
        inputRemove.setAttribute("value", "Remove");
        inputRemove.addEventListener('click', () => this.remove(product.name));
        cartLi.innerHTML = product.name + ' (' + weight + ' kg)   -   ' + price + ' UAH' + '    ';
        cartList.appendChild(cartLi);
        cartLi.appendChild(inputRemove);
        const buyBtn = document.querySelector('#buybutton');
        buyBtn.addEventListener('click', () => this.buy());
    };

    remove(name) {
        console.log('You remove ' + name + ' from cart');
        for (let i = 0; i < this.products.length; i++) {
            if(this.products[i].name === name) {
                this.products.splice(i, 1);
            }
        }
        let elem = document.querySelector('[data-name=' + name);
        elem.remove();
        if (this.products.length === 0) {
            document.querySelector('.empty').style.display = 'block';
            document.querySelector('.buy').style.display = 'none';
        }
    };

    buy() {
        const checkout = document.querySelector('#checkoutPage');
        checkout.style.display = 'block';
        document.querySelector('#cart').style.display = 'none';
        document.querySelector('#items').style.display = 'none';
        let total = 0;
        const check = document.querySelector('#checkout');
        check.innerHTML = '';
        for (let i = 0; i < this.products.length; i++) {
            const li = document.createElement('li');
            li.innerHTML = this.products[i].name + ' (' + this.products[i].price / this.products[i].weight + ' UAH/kg)   -   ' + this.products[i].weight + ' kg   -->   ' + this.products[i].price + ' UAH';
            check.appendChild(li);
            total += this.products[i].price;
        }
        const totalPrice = document.createElement('div');
        totalPrice.style.color = 'red';
        totalPrice.innerHTML = 'Total Price: ' + total + ' UAH';
        check.appendChild(totalPrice);
         const back = document.querySelector('#backbutton');
         back.addEventListener('click', () => {
             checkout.style.display = 'none';
             document.querySelector('#cart').style.display = 'block';
             document.querySelector('#items').style.display = 'flex';
         });
    };
}
let shop = new Shop();
shop.create();
shop.find();