let calc = document.getElementById('calc')
let expression = []
let resul = document.getElementById('resul')
let resulExp = []

document.getElementById('one').addEventListener('click', () => {expression.push(1), updateDisplay()})
document.getElementById('two').addEventListener('click', () => {expression.push(2), updateDisplay()})
document.getElementById('three').addEventListener('click', () => {expression.push(3), updateDisplay()})
document.getElementById('four').addEventListener('click', () => {expression.push(4), updateDisplay()})
document.getElementById('five').addEventListener('click', () => {expression.push(5), updateDisplay()})
document.getElementById('six').addEventListener('click', () => {expression.push(6), updateDisplay()})
document.getElementById('seven').addEventListener('click', () => {expression.push(7), updateDisplay()})
document.getElementById('eigth').addEventListener('click', () => {expression.push(8), updateDisplay()})
document.getElementById('nine').addEventListener('click', () => {expression.push(9), updateDisplay()})
document.getElementById('zero').addEventListener('click', () => {expression.push(0), updateDisplay()})

function sum() {
    if (calc.innerText && typeof expression[expression.length -1] == 'number') {
        expression.push('+')
    }
    updateDisplay()
}

function subtraction() {
    if (calc.innerText && typeof expression[expression.length -1] == 'number') {
        expression.push('-')
    }
    updateDisplay()
}

function multiplication() {
    if (calc.innerText && typeof expression[expression.length -1] == 'number') {
        expression.push('×')
    }
    updateDisplay()
}

function division() {
    if (calc.innerText && typeof expression[expression.length - 1] == 'number') {
        expression.push('/')
    }
    updateDisplay()
}

function bool() {
    if (calc.innerText && typeof expression[expression.length - 1] == 'number') {
        expression.push('.')
    }
    updateDisplay()
}

function percentage() {
    if (calc.innerText && typeof expression[expression.length - 1] == 'number' && expression.length < 3) {
        expression.push('%')
    }
    updateDisplay()
}

function clearEntry() {
    resulExp = []
    expression = []
    calc.innerText = ''
    resul.innerText = ''

    updateDisplay()
}

function backspace() {
    expression.pop()
    updateDisplay()
}

function sumSub() {
    if (typeof expression[expression.length - 1] === 'number') {
        let finalSignal = expression[expression.length - 2]
        if (finalSignal == '+') {
            expression[expression.length - 2] = '-'
        } else if (finalSignal == '-') {
            expression[expression.length - 2] = '+'
        }
    } else {
        let finalSignal = expression[expression.length - 1]
        if (finalSignal == '+') {
            expression[expression.length - 1] = '-'
        } else if (finalSignal == '-') {
            expression[expression.length - 1] = '+'
        }
    }

    updateDisplay()
}

function joinConsecutiveNumbers() {
    for (let item = 0; item < expression.length - 1; item++) {
        if (typeof expression[item] == 'number' && typeof expression[item + 1] == 'number') {
            let num = Number(`${expression[item]}${expression[item + 1]}`)
            expression.splice(item, 2, num)
        }
    }
}

function calculated() {
    if (expression.length == 1) {
        resul.innerText = expression[0]
    } else {
        joinConsecutiveNumbers()
        resulExp = [...expression]

        if (typeof resulExp[resulExp.length - 1] !== 'number') {
            resul.innerText = ''
            return
        }

        if (resulExp[resulExp.length - 2] == '%' && resulExp.length == 3) {
            let percent1 = resulExp[resulExp.length - 1]
            let percent2 = resulExp[resulExp.length - 3]
            resulExp.splice(0, 3, (percent2*percent1)/100)
        }

        for (let item = 0; item < resulExp.length; item++) {
            if (resulExp[item] == '.') {
                let bool1 = resulExp[item - 1]
                let bool2 = resulExp[item + 1]
                let bool3 = `${bool1}.${bool2}`
                resulExp.splice(item - 1, 3, Number(bool3))
                item -= 1
        }
        }
        for (let item = 0; item < resulExp.length; item++) {
            if (resulExp[item] == '/') {
                let divisor1 = resulExp[item - 1]
                let divisor2 = resulExp[item + 1]
                let quocient = divisor1 / divisor2
                resulExp.splice(item - 1, 3, quocient)
                item -= 1
            }
        }
        for (let item = 0; item < resulExp.length; item++) {
            if (resulExp[item] == '×') {
                let multiplicator1 = resulExp[item - 1]
                let multiplicator2 = resulExp[item + 1]
                let product = multiplicator1 * multiplicator2
                resulExp.splice(item - 1, 3, product)
                item -= 1
            }
        }
        for (let item = 0; item < resulExp.length; item++) {
            if (resulExp[item] == '-') {
                let minuend = resulExp[item - 1]
                let subtrahend = resulExp[item  + 1]
                let difference = minuend - subtrahend
                resulExp.splice(item - 1, 3, difference)
                item -= 1
            }
        }
        for (let item = 0; item < resulExp.length; item++) {
            if (resulExp[item] == '+') {
                let addend1 = resulExp[item - 1]
                let addend2 = resulExp[item + 1]
                let resulSum = addend1 + addend2
                resulExp.splice(item - 1, 3, resulSum)
                item -= 1
            }
        }
        resul.innerText = resulExp[0]
    
    }
}

function equal() {
    expression = []
    expression.push(Number(resul.innerText))
    calc.innerText = resul.innerText
    resul.innerText = ''
}

function updateDisplay() {
    joinConsecutiveNumbers()
    calc.innerText = expression.join(' ')
    calculated()
}
