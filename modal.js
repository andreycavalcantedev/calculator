const openModal = document.getElementById('openModal')
const closeModal = document.getElementById('closeModal')
const modalFade = document.getElementById('modalFade')
const modal = document.getElementById('modal')
const calculator = document.getElementById('calculator')

const toggleModal = () => {
    modal.classList.toggle('hide')
    modalFade.classList.toggle('hide')
    if (!calculator.classList.contains('hide')){
        calculator.classList.add('hide')
    } else {
        calculator.classList.remove('hide')
    }
}

[openModal, closeModal, modalFade].forEach((e) => {
   e.addEventListener("click", () => toggleModal())
});