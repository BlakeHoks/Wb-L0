const payNowCheckbox = document.querySelector('#pay-now')

payNowCheckbox.addEventListener('change', () => {
    const totalPrice = document.querySelector('#totalPrice').textContent
    const confirmButton = document.querySelector('.payment__order__button')

    if (payNowCheckbox.checked) {
        confirmButton.textContent = 'Оплатить ' + totalPrice + ' сом'
        return
    }

    confirmButton.textContent = 'Заказать'
})

