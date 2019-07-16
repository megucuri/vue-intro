/*
Goal:
We want to be able to display a list of our product’ s details.

Problem:
We want our page to display our product’ s details.How can we iterate through this array to display its data ?
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
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        variants: [{
                variantID: 2234,
                variantColor: "green"
            },
            {
                variantID: 2235,
                variantColor: "blue"
            }
        ],
        sizes: [{
                sizeID: 1,
                size: 'XS'
            },
            {
                sizeID: 2,
                size: 'S'
            },
            {
                sizeID: 3,
                size: 'XM'
            },
            {
                sizeID: 4,
                size: 'M'
            },
            {
                sizeID: 5,
                size: 'XL'
            },
            {
                sizeID: 6,
                size: 'L'
            },
            {
                sizeID: 7,
                size: 'LL'
            },
        ]
    }
})
