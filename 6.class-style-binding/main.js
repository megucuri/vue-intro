/*
Event Handling:
In this lesson we’ ll be learning how to dynamically style our HTML by binding data to an element’ s style attribute, as well as its class.

Goal:
Our first goal in this lesson is to use our variant colors to style the background - color of divs.Since our variant colors are“ green” and“ blue”, we want a div with a green background - color and a div with a blue background - color


Problem:
In the previous lesson, we created an event handler that updates the product’ s image based on which p tag was hovered on.Instead of printing out the variant’ s color into a p tag, we want to use that color to set the style of a div’ s background - color.That way, instead of hovering over text in a p tag, we can hover over colored squares, which would update the product’ s image to match the color that was hovered on.
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
                size: 'S',
            },
            {
                sizeID: 2,
                size: 'M',
            },
            {
                sizeID: 3,
                size: 'L',
            },
        ],
        cart: 0, // 'this.cart' is refering to this data

        // Testing
        color: 'blue',
        testingStyle: {
            // To use hyphen use '' qutation marks
            'text-transform': 'uppercase',
            background: 'green',
        },

        testingStyle2: {
            // Camel case
            textDecoration: 'line-through',
        },

        booleanClass: true,

        testClass: {
            testClass1: false,
            testClass2: true,
        },
        testClass2: {
            testClass3: false,
            testClass4: true,
        },

        trueClass: 'is-true',
    },


    // instance can also have properties of methods.
    methods: { //add the method property.
        addToCart: function () { //add method
            this.cart += 1 // this.data_name = do something
        },
        /* 
        We are passing the variant's image so we will make 'variantImage' as the parameter.
        Instead of writing our methods as announmous functions.
        We can use method shorthand. Not all browsers support this feature.
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
