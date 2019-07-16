/*
Communicating Events
In our previous lesson, we learned how to create components and pass data down into them via props.But what about when we need to pass information back up ? In this lesson we’ ll learn how to communicate from a child component up to its parent.

Goal
By the end of this lesson, our product component will be able to tell its parent, the root instance, that an event has occurred, and send data along with that event notification.

Problem
Now that product is its own component, it doesn’ t make sense
for our cart to live within product.It would get very messy
if every single product had its own cart that we had to keep track of .Instead, we’ ll want the cart to live on the root instance, and have product communicate up to that cart when its“ Add to Cart” button is pressed.
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
                <ul>
                    <li v-for="detail in details">{{ detail }}</li>
                </ul>
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
                <button @click="subtractFromCart">Take out form Cart</button>
            </div>
    </section>
    `,

    data() {
        /*
        transform data in to a function that returns the data object.
        */
        return {
            brand: 'Chingen Sai', // new brand data
            product: '絨毯',
            description: 'こちらは素晴らしい',
            details: ["80% cotton", "20% polyester", "Gender-neutral"],
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
                    variantQuantity: 1
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
        }
    },

    methods: {
        addToCart() {
            // this.cart += 1
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantID) //target the variant ID.
            /*
            when addToCart is run, emit an event by the name of “add-to-cart”.
            In other words, when the“ Add to Cart” button is clicked, this method fires, announcing that the click event just happened.
            */
        },
        updateProduct(index) {
            this.selectedVariant = index,
                console.log(index)

        },

        subtractFromCart() { // create $emmit function with emmi 'name'
            // this.cart -= 1
            this.$emit('remove-from-cart') //target the variant ID.

        },
    },

    computed: {
        title() {
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


/*
Often in an application, a component will need to receive data from its parent.
In this case, the parent of our product component is the root instance itself.
*/
var app = new Vue({
    el: '#app',
    data: {
        premium: true,
        // cart: 0,
        cart: [] // make an array so we can put items in it. So we can know exactly what is in the cart
    },

    methods: {
        updateCart(id) { // pass id to the updateCarte method. Send up the id value to 'add-to-cart' emmit.
            // this.cart += 1
            this.cart.push(id) // pushes id to data 'cart'
        },

        removeItemFromCart(id) { // When emmit is heard run this code.
            this.cart.splice(id, 1) // remove id by 1
        },
    }
})
