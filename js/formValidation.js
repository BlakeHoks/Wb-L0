const inputs = document.querySelectorAll('.cart-form__input')

const formValidation = (input) => {
    const isValid = validate(input.value, input.id)
    const errorSpan = input.closest('label').querySelector('.cart-form__error')

    if (!isValid) {
        errorSpan.classList.remove('hidden')
        errorSpan.classList.add('cart-form__error_active')
        input.classList.add('cart-form__input_error')

        if (input.id === 'inn') errorSpan.textContent = 'Проверьте ИНН'

        return
    }

    if (input.id === 'inn') errorSpan.textContent = 'Для таможенного оформления'
    errorSpan.classList.add('hidden')
    errorSpan.classList.remove('cart-form__error_active')
    input.classList.remove('cart-form__input_error')
}

document.querySelector('.payment__order__button').addEventListener('click', () => {
    inputs.forEach(input => formValidation(input)
    )
})

inputs.forEach(input =>
    input.addEventListener('focusout', () => formValidation(input))
)



const validate = (text, inputType) => {
    switch (inputType) {
        case 'first-name':
        case 'second-name':
            if (text === '') {
                return false
            }
            break
        case 'email':
            if (
                text
                    .toLowerCase()
                    .match(
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    ) === null
            )
                return false
            break
        case 'mobile':
            if (text.match(/^[\s()+-]*([0-9][\s()+-]*){6,20}$/) === null) return false
            break
        case 'inn':
            if (text.length !== 14) return false
            break
    }

    return true
}