const deliveryAltOpenModalButton = document.querySelector('.aside__delivery-change-icon')
const deliveryOpenModalButton = document.querySelector('.delivery__button')
const deliveryCloseButton = document.querySelector('.dialog__close')
const deliveryModal = document.querySelector('#delivery-modal')

deliveryAltOpenModalButton.addEventListener('click', () =>
    deliveryModal.showModal()
)
deliveryOpenModalButton.addEventListener('click', () =>
    deliveryModal.showModal()
)
deliveryCloseButton.addEventListener('click', () => {
    deliveryModal.close()
})

const deliveryModalButtons = document.querySelectorAll(
    '.delivery__selector-button'
)

deliveryModalButtons[0].addEventListener('click', () => {
    if (deliveryModalButtons[0].classList.contains('delivery__selector-button_active'))
        return

    deliveryModalButtons[0].classList.add('delivery__selector-button_active')
    deliveryModalButtons[1].classList.remove('delivery__selector-button_active')

    document.querySelector('.shipment-form').style['display'] = 'flex'
    document.querySelector('.courier-form').style['display'] = 'none'
})

deliveryModalButtons[1].addEventListener('click', () => {
    if (deliveryModalButtons[1].classList.contains('delivery__selector-button_active')) return

    deliveryModalButtons[1].classList.add('delivery__selector-button_active')
    deliveryModalButtons[0].classList.remove('delivery__selector-button_active')

    document.querySelector('.shipment-form').style['display'] = 'none'
    document.querySelector('.courier-form').style['display'] = 'flex'
})

document.querySelector('#delivery-modal-button').addEventListener('click', () => {})

const paymentModal = document.querySelector('#payment-modal')
const paymentMethodButton = document.querySelector('#payment-method-button')
const alternateMethodButton = document.querySelector('.aside__payment-change-icon')
const paymentCloseButton = document.querySelector('.payment-methods-close')

paymentMethodButton.addEventListener('click', () => {
    paymentModal.showModal()
})
alternateMethodButton.addEventListener('click', () => {
    paymentModal.showModal()
})
paymentCloseButton.addEventListener('click', () => {
    paymentModal.close()
})
