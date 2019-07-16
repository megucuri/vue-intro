/*
Goal:
We want to display text that says
if our product is in stock or not, based on our data.

Problem:
Often in a web application, we want elements to appear on the page depending on
if a condition is met or not.For instance,
if our product is not in stock, our page should display the fact that it’ s out of stock.

So how could we conditionally render these elements, depending on whether our product is in stock or not ?
*/

var app = new Vue({
    el: '#app',

    data: {
        product: '絨毯',
        description: 'こちらは素晴らしい',
        image: './assets/images/japanese-carpets.jpg',
        link: './assets/images/japanese-carpets.jpg',
        inStock: false, // data used for conditioning
        inventory: 8, // data can be an integer 
        onSale: true,
    }
})
