export const productsData = [
    {
        id: 0,
        name: 'Футболка UZcotton мужская',
        price: 1051,
        discount: 50.33301617507136,
        amount: 1,
        maxAmount: 2,
        checked: true,
    },
    {
        id: 1,
        name: 'Силиконовый чехол картхолдер (отверстия) для карт, прозрачный кейс бампер на Apple iPhone XR, MobiSafe',
        price: 11500.235,
        discount: 8.695474483782288,
        amount: 200,
        maxAmount: 999,
        checked: true,
    },
    {
        id: 2,
        name: 'Карандаши цветные Faber-Castell "Замок", набор 24 цвета, заточенные, шестигранные, Faber-Castell',
        price: 475,
        discount: 48,
        amount: 2,
        maxAmount: 2,
        checked: true,
    },
]

const missingProductsData = [
    {
        id: 0,
        name: 'Футболка UZcotton мужская',
    },
    {
        id: 1,
        name: 'Силиконовый чехол картхолдер (отверстия) для карт, прозрачный кейс бампер на Apple iPhone XR, MobiSafe',
    },
    {
        id: 2,
        name: 'Карандаши цветные Faber-Castell "Замок", набор 24 цвета, заточенные, шестигранные, Faber-Castell',
    },
]
const updateIds = () => {
    let id = 0
    productsData.forEach(product => {
        product.id = id
        id++
    })
    updateNotification()
}

const updateNotification = () => {
    const productsCount = productsData.length
    document
        .querySelectorAll('.header__menu-icons__amount')
        .forEach(notification => {
            if (productsCount === 0) notification.remove()
            notification.textContent = productsCount.toString()
        })
}

const handleCountChange = (productId, amount) => {
    productsData[productId] = {
        ...productsData[productId],
        amount,
    }
    updateTotal()
}

const updateCount = (count, updateType, maxCount = 999) => {
    let countNumber = +count.textContent

    if (updateType === 'increment' && countNumber !== maxCount) {
        countNumber++
    } else if (updateType === 'decrement' && countNumber !== 1) {
        countNumber--
    }

    count.textContent = countNumber
    return count
}

const updateTotalPrice = (price = 0) => {
    document.querySelector('#totalPrice').textContent = price.toLocaleString("ru-RU")
}

const updateDiscount = (amount = 0, price = 0) => {
    const discountSpans = document.querySelector('#totalAmount').querySelectorAll('span')

    discountSpans[0].textContent = `${amount}`
    discountSpans[1].textContent = price.toLocaleString('ru-RU')
}

const updateDiscountValue = value => {
    if (value !== 0) value = -1 * value

    document.querySelector('#totalDiscount').textContent = `${value} сом`
}

const updateTotal = () => {
    if (productsData.length === 0) {
        updateTotalPrice()
        updateDiscount()
    }

    const totalAmount = productsData.reduce(
        (acc, product) => acc + product.amount,
        0
    )

    const total = productsData.reduce(
        (acc, product) =>
            acc +
            product.amount *
            (product.price - (product.price * product.discount) / 100) * product.checked, // amount * price - discount price
        0
    )

    const totalWithoutDiscount = productsData.reduce(
        (acc, product) => acc + product.checked * product.amount * product.price,
        0
    )

    const discountValue = totalWithoutDiscount - total

    updateTotalPrice(total)
    updateDiscount(totalAmount, totalWithoutDiscount)
    updateDiscountValue(discountValue)
}

const updateProductPrice = (product, productElement) => {
    const phonePrice = productElement.querySelector('.product__price_small')
    const currentPrice = productElement.querySelector('.product__current-price ')
    const oldPrice = productElement.querySelector('.product__old-price')
    const phoneOldPrice = productElement.querySelector('.product__price-discount_small')

    const priceWithDiscount = (product.amount * (product.price - (product.price * product.discount) / 100)).toLocaleString('ru-RU')

    const priceWithoutDiscount = (product.price * product.amount).toLocaleString('ru-RU')

    phonePrice.textContent = priceWithDiscount + ' сом'
    currentPrice.textContent = priceWithDiscount
    oldPrice.textContent = priceWithoutDiscount + ' сом'
    phoneOldPrice.textContent = priceWithoutDiscount + ' сом'
}

const checkboxes = document.querySelectorAll('.cart .custom-checkbox')

checkboxes[0].addEventListener('change', () => {
    for (let i = 1; i < checkboxes.length; i++) {
        checkboxes[i].checked = checkboxes[0].checked
    }

    productsData.forEach(product => (product.checked = checkboxes[0].checked))

    updateTotal()
})

for (let i = 1; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener('change', () => {
        const productName = formatProductName(
            checkboxes[i].closest('.content__product').querySelector('.product__name')
                .textContent
        )

        const productId = productsData.findIndex(
            product => product.name === productName
        )

        productsData[productId].checked = checkboxes[i].checked

        updateTotal()
    })
}

const cartCounters = document.querySelectorAll('.cart .product__amount-actions') // maybe I should get products here instead to not looking for them in the loop

const formatProductName = productName => productName.replace(/^\s\s*/, '').replace(/\s\s*$/, '').replace(/\s+/g, ' ')

cartCounters.forEach(counter => {
    const productName = formatProductName(
        counter.closest('.content__product').querySelector('.product__name')
            .textContent
    )

    const buttons = counter.querySelectorAll('button')

    let count = counter.querySelector('.product__amount')
    const incrementButton = buttons[1]
    const decrementButton = buttons[0]

    incrementButton.addEventListener('click', () => {
        const product = productsData.filter(
            product => product.name === productName
        )[0]

        console.log(incrementButton.closest('.content__product'))
        const buttonType = 'increment'
        const updatedCount = updateCount(count, buttonType, product.maxAmount)

        decrementButton.classList.add('product__button_active')

        if (+updatedCount.textContent === product.maxAmount) {
            incrementButton.classList.remove('product__button_active')
        } else {
            incrementButton.classList.add('product__button_active')
        }
        handleCountChange(product.id, +updatedCount.textContent)

        updateProductPrice(
            productsData[product.id],
            incrementButton.closest('.content__product')
        )
    })

    decrementButton.addEventListener('click', () => {
        const product = productsData.filter(
            product => product.name === productName
        )[0]

        const buttonType = 'decrement'
        const updatedCount = updateCount(count, buttonType, product.amount)

        incrementButton.classList.add('product__button_active')

        if (+updatedCount.textContent === 1) {
            decrementButton.classList.remove('product__button_active')
        } else {
            decrementButton.classList.add('product__button_active')
        }
        handleCountChange(product.id, +updatedCount.textContent)

        updateProductPrice(
            productsData[product.id],
            decrementButton.closest('.content__product')
        )
    })
})

const productActionBlocks = document.querySelectorAll('.product__actions-list')

productActionBlocks.forEach(productActionsList => {
    const productActions = productActionsList.querySelectorAll('.product__actions-item')

    const likeButton = productActions[0]
    const deleteButton = productActions[1]

    likeButton.addEventListener('click', () => {
        if (likeButton.classList.contains('like_active')) {
            likeButton.classList.remove('like_active')
            return
        }

        likeButton.classList.add('like_active')
    })

    deleteButton.addEventListener('click', () => {
        const productBlock = deleteButton.closest('.content__product')
        const productName = formatProductName(
            productBlock.querySelector('.product__name').textContent
        )
        if (!productBlock.parentElement.parentElement.classList.contains('content__not-available')){
            const deletingProductId = productsData.findIndex(
                product => product.name === productName
            )
            productsData.splice(deletingProductId, 1)
            updateTotal()
            updateIds()
        } else {
            const deletingProductId = missingProductsData.findIndex(
                product => product.name === productName
            )
            missingProductsData.splice(deletingProductId, 1)
            document.querySelector('.content__not-available-title').textContent = `Отсутствуют · ${missingProductsData.length} товара`
        }
        productBlock.remove()
    })
})