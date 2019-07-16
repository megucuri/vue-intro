/*
Components:
Components are reusable blocks of code that can have both structure and functionality.They help create a more modular and maintainable codebase.

Goal:
Throughout the course of this lesson we’ ll create our first component and then learn how to share data with it.


Problem:
In a Vue application, we don’ t want all of our data, methods, computed properties, etc.living on the root instance.Over time, that would become unmanageable.Instead, we’ ll want to
break up our code into modular pieces so that it is easier and more flexible to work with.

Register the component like this:

e.g.
Vue.component('component_name',{})

The first argument is the name we choose
for the component, and the second is an options object, similar to how we created our initial Vue instance.

In the Vue instance, we used the el property to plug into an element in the DOM.For a component, we use the template property to specify its HTML.

e.g.
Vue.component('component_name', {
    template: `
        <div class="product">
            ...// our product HTML all goes here
        </div>
    `
})

There are several ways to create a template in Vue, but
for now we’ ll be using a template literal, with back ticks.

A component’ s template can only
return one element.

Vue.component('component_name', {
    template: `<h1>I'm a single eleemtn!<?h1>`
})

But this won’ t work, since it’ s two sibling elements:

e.g.
Vue.component('component_name', {
    template: `
        <h1>I'm a single element!<?h1>
        <h2>Second element!<?h2>
    `
})


So
if we have multiple sibling elements, like we have in our product template, they must be wrapped in an outer container element so that the template has exactly one root element:

e.g.
Vue.component('component_name', {
    template: `
        <div>
            <h1>I'm a single element!<?h1>
            <h2>Second element!<?h2>
        </div>
    `
})


Basic component structure:
Vue.component('component_name', {
    props: {
        // receive data from parent if any.
    },

    template: `
        <div class="product">
            <h1>I'm a single element!<?h1>
            <h2>Second element!<?h2>
        </div>
    `,

    data(){
        return{
            //data goes here
        }
    },
    
    method: {
        return {
            //method goes here
        }
    },
    
    computed: {
        return {
            //computed properties goes here
        }
    },
})

this component looks nearly identical in structure to our original instance.But did you notice that data is now a
function ? Why the change ?

If data weren’ t a function, each product component would be sharing the same data everywhere it was used, defeating the purpose of it being a reusable component.
*/

Vue.component('product', { //Inside that options object, we’ll add our template.
    props: {
        /*
               A custom attribute for passing data into our components. 
               Props are essentially variables that are waiting to be filled with the data its parent sends down into it. Imagine a funnel from parent to child.
               */
        premium: { // Declare data variable from parent.
            type: Boolean, // Object that specifies it's type.
            required: true // Recommended to specify requirements. Use Vue's built in prop validation.

        }
    },

    template: `
        <section class="product">
            <!-- <p v-if="onSale">On Sale!</p> -->
            <a :href="link" target="__blank" class="product-image">
                <img v-bind:src="image" alt="">
            </a>
            <div class="product-info">
                <h1>{{ showTitle }}</h1>
                <p>{{ description }}{{ product }}である。</p>
                <p v-if="inStock">In Stock</p>
                <p v-else :class="{ 'crossed-text': !inStock}">Out of Stock</p>
                <p>Shipping: {{ shipping }}</p>
                <div class="color-box"
                v-for="(variant, index) in variants" 
                :key="variant.variantID"
                :style="{ backgroundColor: variant.variantColor }" 
                @mouseover="updateProduct(index)"
                ></div>
                <ul>
                    <li v-for="size in sizes">{{ size.size }}</li>
                </ul>
                <button v-on:click="addToCart"
                :disabled="!inStock"
                :class="{ disabledButton: !inStock}">Add to Cart</button>
                <div class="cart">
                    <p>cart {{ cart }}</p>
                </div>
                <button v-if="cart > 0" @click="subtractFromCart">Take out form Cart</button>
            </div>
    </section>
    `,

    data() {
        /*
        transform data in to a function that returns the data object.

        Because we often want to reuse components.
        And if we had multiple product components, we’ d need to ensure a separate instance of our data was created for each component.
        Since data is now a
        function that returns a data object, each component will definitely have its own data.
        */
        return {
            brand: 'Chingen Sai', // new brand data
            product: '絨毯',
            description: 'こちらは素晴らしい',

            // details: ["80% cotton", "20% polyester", "Gender-neutral"],

            selectedVariant: 0,
            link: './assets/images/japanese-carpets.jpg',
            inventory: 8,
            onSale: true,
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
        }
    },

    methods: {
        addToCart: function () {
            this.cart += 1
        },
        updateProduct(index) {
            this.selectedVariant = index,
                console.log(index)

        },

        subtractFromCart() {
            this.cart -= 1
        },
    },

    computed: {
        title() { // method
            return this.brand + ' ' + this.product
        },

        showTitle(onSale) {
            if (this.onSale == true) {
                return this.title
            } else {
                return this.product
            }
        },

        image() {
            return this.variants[this.selectedVariant].variantImage
        },

        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },

        shipping() {
            if (this.premium) {
                return "Free"
            }
            return "¥" + 2.99
        }
    }
})


// challange
Vue.component('product_details', {
    // props: [details],
    props: {
        details: {
            type: Array,
            required: true,
        }
    },

    template: `
        <ul>
            <li v-for="detail in details">{{ detail }}</li>
        </ul>
    `,
})

/*
Problem:
Often in an application, a component will need to receive data from its parent.
In this case, the parent of our product component is the root instance itself.
*/
var app = new Vue({
    el: '#app',
    data: {
        premium: true,
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
    }
})
