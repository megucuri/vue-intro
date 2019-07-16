/*
Tabs
In this lesson, we’ ll learn how to add tabs to our application and implement a simple solution
for global event communication.


Goal
We’ ll learn how to create tabs to display our reviews and our review form separately.



Problem
Currently in our project, we’ re displaying our reviews and the form that is used to submit a review on top of each other.This works
for now, but
if our page needs to display more and more content, we’ ll want the option to conditionally display content, based on user behavior.


*/
/*
We create a global channel(new instrance) so grandchild can talk to parent.
If it helps, just imagine this as a literal bus, and its passengers are whatever you’ re sending at the time.In our
case, we want to send an event emission.
*/
var eventBus = new Vue()


Vue.component('product', {
    props: {
        premium: {
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

                <!-- add the propFromChild="parentData" to pass the data from parent to the child-->
                <info-tabs :shipping="shipping" :details="details"></info-tabs>

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

                Reviews is in 'product' component so we pass the review to 'product-tabs' by binding reviews props
                -->
                <product-tabs :reviews="reviews"></product-tabs>
                
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
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantID)
        },
        updateProduct(index) {
            this.selectedVariant = index,
                console.log(index)

        },

        subtractFromCart() { // create $emmit function with emmi 'name'
            this.$emit('remove-from-cart')
        },
        /*
        Replace this code with the one below in at the bottom of 'product' component.
        
        addReview(productReview) {
            this.reviews.push(productReview)
        },
       */
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
    },


    mounted() {
        /*
        What’ s mounted ? That’ s a lifecycle hook, which is a
        function that is called once the component has mounted to the DOM.

        code:
        eventBus.$on('review-submitted', productReview => {
            this.reviews.push(productReview)
        })

        This essentially says: when the eventBus emits the review - submitted event, take its payload(the productReview) and push it into product 's reviews array. This is very similar to what we were doing before with our addReview method.

        Function is bound to its parent’ s context.
        In other words, when we say 'this'
        inside the

        function, it refers to 'this'
        component / instance.
        
        */
        eventBus.$on('review-submitted', productReview => {
            this.reviews.push(productReview)
        })
    }
})

Vue.component('info-tabs', {
    props: { // To access the data being sent by the custom attribute bind in the parent.
        shipping: {
            required: true,
        },
        details: {
            type: Array,
            required: true
        }
    },
    template: `
    <div>
        <span class="tab"
            :class="{ activeTab: selectedTab === tab }"
            v-for="(tab, index) in tabs" 
            :key="index"
            @click="selectedTab = tab"
            >
                {{ tab }}
            </span>
        <p v-show="selectedTab === 'Shipping'">Shipping: {{ shipping }}</p>
        <ul v-show="selectedTab === 'Details'">
            <li v-for="detail in details">{{ detail }}</li>
        </ul>
    </div>
    `,

    data() {
        return {
            tabs: ['Shipping', 'Details'],
            selectedTab: 'Shipping',
        }
    }

})

Vue.component('product-tabs', {
    props: {
        reviews: {
            type: Array,
            required: true
        }
    },
    template: `
        <div>
            <!-- 
            Use (data-name, index) for array types of data.

            @click="selectedTab = tab"
            The code above sets value of selectedTab in data,

            We want to visualize which tab was clicked so we will bind
            class to it
            -->
            <span class="tab"
            :class="{ activeTab: selectedTab === tab }"
            v-for="(tab, index) in tabs" 
            :key="index"
            @click="selectedTab = tab"
            >
                {{ tab }}
            </span>
            <div v-show="selectedTab === 'Reviews'">
                <p v-if="!reviews.length">There are no reviews yet.</p>
                <ul>
                    <li v-for="review in reviews">
                        <p>{{ review.name }}</p>
                        <p>Rating: {{ review.rating }}</p>
                        <p>{{ review.review }}</p>
                    </li>
                </ul>
            </div> 
            <!-- 
            We removed
            @review-submitted="addReview"
            from <product-review> becuase we will not listen to events from here.
            -->
            <product-review v-show="selectedTab === 'Make a Review'"></product-review>
        </div>
    `,
    data() {
        return {
            tabs: ['Reviews', 'Make a Review'],
            selectedTab: 'Reviews', // set from @click and default value of 'Reviews'
        }
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
                This ensures that the data will be converted into an integer versus a string. 
                -->
                <select id="rating" v-model.number="rating">
                    <option>5</option>
                    <option>4</option>
                    <option>3</option>
                    <option>2</option>
                    <option>1</option>
                </select>
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
                }
                // We’re also resetting the values of name, review and rating to be null. Everytime this form is submited
                /*
                this.$emit('review-submitted', productReview) 
                replace 'this' with 'eventBus' global channel we just created.
                */
                eventBus.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
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
        cart: [],
    },

    methods: {
        updateCart(id) {
            this.cart.push(id)
        },

        removeItemFromCart(id) {
            this.cart.splice(id, 1)
        },
    }
})
