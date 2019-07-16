/*
Event Handling:
In this lesson we’ ll be learning how to listen
for DOM events that we can use to trigger methods.

Goal:
We want to have a button that increments the number of items in our cart.


Problem:
We need a button to listen
for click events on it, then trigger a method when that click happens, in order to increment our cart total.

First, we’ ll add a new data property
for our cart.
*/

var app = new Vue({
    el: '#app',

    data: {
        product: '絨毯',
        description: 'こちらは素晴らしい',
        image: './assets/images/japanese-carpets.jpg', // the default image after rendering.
        link: './assets/images/japanese-carpets.jpg',
        inStock: false,
        inventory: 8,
        onSale: true,
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        variants: [{
                variantID: 2234,
                variantColor: "yellow",
                variantImage: './assets/images/antique_tabriz_iran_carpet.jpg',
            },
            {
                variantID: 2235,
                variantColor: "red",
                variantImage: './assets/images/japanese-carpets.jpg',
            }
        ],
        sizes: [{
                sizeID: 1,
                size: 'XS',
            },
            {
                sizeID: 2,
                size: 'S',
            },
            {
                sizeID: 3,
                size: 'XM',
            },
            {
                sizeID: 4,
                size: 'M',
            },
            {
                sizeID: 5,
                size: 'XL',
            },
            {
                sizeID: 6,
                size: 'L',
            },
            {
                sizeID: 7,
                size: 'LL',
            },
        ],
        cart: 0, // 'this.cart' is refering to this data
    },


    // instance can also have properties of methods.
    methods: { //add the method property.
        addToCart: function () { //add method
            this.cart += 1 // this.data_name = do something
        },
        /* 
        We are passing the variant's image so we will make 'variantImage' as the parameter.

        Instead of writing our methods as announmous functions.
        We can use ES shorthand. Not all browsers support this feature.
            e.g.
            methodname(parameter){
                do this...
            }
        */
        updateProduct(variantImage) {
            this.image = variantImage // Switch image data with variantImage data
        },

        subtractFromCart() {
            this.cart -= 1
        },
    }
})
