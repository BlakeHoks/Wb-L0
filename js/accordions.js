import {productsData} from "../index.js";
const accordions = document.querySelectorAll('.accordion')

accordions.forEach(accordion =>
    accordion.addEventListener('click', () => {
        const products = accordion.parentElement.parentElement.querySelector('.content__products')

        const accordionText = accordion.parentElement.querySelector('.content__select-text')
        const newAccordionText = document.querySelector('.content__select-text_alt')

        if (products.classList.contains('hidden')) {
            products.classList.remove('hidden')
            accordion.style['rotate'] = '0deg'

            if (accordion.parentElement.parentElement.classList.contains('cart')){
                newAccordionText.classList.add('hidden')
                accordionText.classList.remove('hidden')
                accordionText.classList.remove('content__not-available-title')
            }
            return
        }
        accordion.style['rotate'] = '180deg'
        products.classList.add('hidden')
        if (accordion.parentElement.parentElement.classList.contains('cart')){
            accordionText.classList.add('hidden')
            let productsCount = productsData.reduce(
                (acc, product) => acc + product.amount,
                0
            )

            newAccordionText.classList.remove('hidden')
            newAccordionText.textContent = `${productsCount} товара · ${document.querySelector('#totalPrice').textContent} сом`
            newAccordionText.classList.add('content__not-available-title')
        }
    })
)