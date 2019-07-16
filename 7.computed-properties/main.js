/*
Computed Properties
In this lesson, we’ ll be covering Computed Properties.These are properties on the Vue instance that calculate a value rather than store a value.

Goal:
Our first goal in this lesson is to display our brand and our product as one string.


Problem:
We want brand and product to be combined into one string.In other words, we want to display“ Vue Mastery Socks” in our h1 instead of just“ Socks.How can we concatenate two values from our data ?
*/

var app = new Vue({
    el: '#app',

    data: {
        brand: 'Chingen Sai', // new brand data
        product: '絨毯',
        description: 'こちらは素晴らしい',
        /* 
        if we want to change more than just the image 
        based on which variant is hovered on, we need to refractor the code
        */
        // image: './assets/images/japanese-carpets.jpg', 
        // replace image with selectedVariant
        selectedVariant: 0, // Why 0? Because we’ll be setting this based on the index that we hover on
        link: './assets/images/japanese-carpets.jpg',
        // inStock: true, // made this to computed property
        inventory: 8,
        onSale: true,
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        variants: [{
                variantID: 2234,
                variantColor: "yellow",
                variantImage: './assets/images/antique_tabriz_iran_carpet.jpg',
                variantQuantity: 10
            },
            {
                variantID: 2235,
                variantColor: "red",
                variantImage: './assets/images/japanese-carpets.jpg',
                variantQuantity: 0
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
        cart: 0,

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

    methods: {
        addToCart: function () {
            this.cart += 1
        },


        /*
        In our updateProduct method, we’ ll pass in the index,
        we’ ll update this.selectedVariant with the index of
        whichever variant is currently hovered on.

        Code before...
        updateProduct(variantImage) {
            this.image = variantImage
        },

        */

        updateProduct(index) {
            this.selectedVariant = index,
                console.log(index)

        },

        subtractFromCart() {
            this.cart -= 1
        },
    },



    /*
    Computed Properties:
    computed properties calculate a value rather than store a value.

    Just like the methods we can add objects of computer properties.

    Imagin the computer property as a caculator.
    Computed data is cached and save the result unitll dependencies change.
    
    If it's something you don't want to rerun everytime it's accesed.
    use computed property over methods propery.
    */
    computed: {
        title() { // method
            return this.brand + ' ' + this.product //brand and product are dependecies of title()
        },

        showTitle(onSale) {
            if (this.onSale == true) {
                return this.title
            } else {
                return this.product
            }
        },

        image() {
            /*
            Inside, we are returning this.variants, 
            which is our array of variants, and we are using 
            our selectedVariant, which is either 0 or 1, 
            to target the first or second element in that array, 
            then we’ re using dot notation to target its image
            */
            return this.variants[this.selectedVariant].variantImage
        },
        /*
        Now since we can access varaintQuantity we can access that to check
        if we have stock or not by numbers rather than boolean.

        use[this.selectedVariant] to grab the image we hovered on,
        then target on the quantity

        The binded style class will still be triggered.
        */
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        }
    }
})
