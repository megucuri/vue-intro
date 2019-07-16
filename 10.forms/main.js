/*
Forms:
In this lesson we’ ll be learning how to work with forms in Vue in order to collect user input, and also learn how to do some custom form validation.


Goal
We’ ll be creating a form that allows users to submit a review of a product, but only
if they have filled out the required fields.


Problem
We want our users to be able to review our product, but we don’ t yet have a way to collect user input.We’ ll need to create a form
for that.

*/

Vue.component('product', {
    props: {
        premium: { // Declare data variable from parent.
            type: Boolean,
            required: true
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
                <!-- 
                nest component Review 
                Listen for review-submitted, then run addReview

                Add a section so we can display the reviews
                -->
                <h2>Reviews</h2>
                <p v-if="!reviews.length">There are no reviews yet.</p>
                <ul>
                    <li v-for="review in reviews">
                        <!-- 
                        This will only display 'review' as an object
                        e.g.
                        {{review}} 

                        use the '.' dot notation.
                        -->
                        <p>{{ review.name }}</p>
                        <p>Rating: {{ review.rating }}</p>
                        <p>{{ review.review }}</p>
                        <h3>Recommendation Status</h3>
                        <p>{{ review.recommend }}</p>
                    </li>
                </ul>

                <product-review @review-submitted="addReview"></product-review>
            </div>
    </section>
    `,

    data() {
        return {
            brand: 'Chingen Sai',
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
            reviews: [], // add reviews aray
        }
    },

    methods: {
        addToCart() {
            // this.cart += 1
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantID)
            /*
            target the variant ID.
            when addToCart is run, emit an event by the name of “add-to-cart”.
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
        addReview(productReview) {
            /*
            This
            function takes in the productReview object emitted from our onSubmit method, then pushes that object into the reviews array on our product component’ s data.
            */
            this.reviews.push(productReview)
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
        },
    }
})

Vue.component('product-review', { // parent is 'product' component.
    template: `
        <!-- 
        Vue’s v-model directive gives us this two-way binding.
        That way, whenever something new is entered into the input, the data changes.And whenever the data changes, anywhere using that data will update.

        Use this for testing. Open Vue console and check it out.
        <input v-model="name"> 
        
        
        What is that '.prevent' doing on the form tag?
        That is an event modifier, which is used to prevent the submit event from reloading our page.
         -->
        <form class="review-form" @submit.prevent="onSubmit">
            <!-- display the custom validation errors -->
            <p v-if="errors.length"> <!-- check if errors is not empty -->
                <b>Please correct the following error(s)</b>
                <ul>
                    <li v-for="error in errors">{{ error }}</li>
                </ul>
            </p>
            <p>
                <label for="name">Name:</label>
                <input id="name" v-model="name" placeholder="name">
            </p>
            <p>
                <label for="review">Review:</label>
                <textarea id="review" v-model="review"></textarea>
            </p>
            <p>
                <label for="rating">Rating:</label>
                <!-- 
                Note on the select we’ ve used the '.number' modifier.
                This ensures that the data will be converted into an integer versus a string. -->
                <select id="rating" v-model.number="rating">
                    <option>5</option>
                    <option>4</option>
                    <option>3</option>
                    <option>2</option>
                    <option>1</option>
                </select>
            </p>
            <h3>Would you recommend this product?</h3>
            <p>
                <!--  don't forget the v-model!!! ->
                <input type="radio" id="yes" value="yes" checked v-model="recommend"> 
                <label for="yes">yes</label>
            </p>
            <p>
                <input type="radio" id="no" value="no" v-model="recommend"> 
                <label for="no">no</label>
            </p>
            <p>
                <input type="radio" id="maybe" value="maybe" v-model="recommend"> 
                <label for="maybe">maybe</label>
            </p>
            <p>
                <!-- 
                listen to the emit 
                Below translates to: when the “review-submitted” event happens, run product's addReview method.
                -->
                <input type="submit" value="Submit">
            </p>
        </form>
    `,
    data() {
        return {
            // add custom form validation (required, etc)
            name: null,
            review: null,
            rating: null,
            recommend: null,
            errors: [] // error array to collect the errors
        }
    },
    methods: {
        onSubmit() {
            /*
            Catch the erros here
            If it has name, review, & rating validate.
            */
            if (this.name && this.review && this.rating) {
                /*
                onSubmit is creating an object of our user - inputted data, stored within a variable called productReview. 
                We need to send this productReview somewhere.Where do we want to send it ?
                */
                let productReview = { //is being sent up to product when the form is submitted. Using emit:
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommend: this.recommend, // data name in parent: this.data from child
                }
                // //We’re also resetting the values of name, review and rating to be null. Everytime this form is submited
                this.$emit('review-submitted', productReview) //'emit-name', value that will be sent up with it.
                this.name = null
                this.review = null
                this.rating = null
                this.recommend = null
            } else { // if not add the errors to the error array (in data)
                if (!this.name) this.errors.push("Name required.")
                if (!this.review) this.errors.push("Review required.")
                if (!this.rating) this.errors.push("Rating required.")
            }
        }
    }
})


var app = new Vue({
    el: '#app',
    data: {
        premium: true,
        // cart: 0,
        cart: [], // make an array so we can put items in it. So we can know exactly what is in the cart.
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
