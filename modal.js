const openModal = document.getElementById('openModal')
const closeModal = document.getElementById('closeModal')
const modalFade = document.getElementById('modalFade')
const modal = document.getElementById('modal')
const calculator = document.getElementById('calculator')
const history = document.getElementById('history')

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

document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "http://192.168.1.15:3000/expressions"

    function renderHistory(items) {
        items.forEach(item => {
            const option = document.createElement('option')
            option.value = item.id
            option.textContent = item.name
            history.appendChild(option)
        })
    }
    
    async function fetcHistory() {
        try {
            const response = await fetch(apiUrl)
            if (!response.ok){
                throw new Error("Erro ao buscar os dados")
            }
        const data = await response.json()
        renderHistory(data)
        } catch (error) {
            console.log("Erro: ", error);
        }
    }

    fetcHistory()
})
