class Calculator {
    constructor(prevAnsTextElement, curAnsTextElement) {
        this.prevAnsTextElement = prevAnsTextElement
        this.curAnsTextElement = curAnsTextElement
        this.clear()
    }

    clear () {
        this.curAns = ''
        this.prevAns = ''
        this.operation = undefined
    }

    delete () {
       this.curAns = this.curAns.toString().slice(0, -1) 
    }

    appendNumber(number) {
        if (number === '.' && this.curAns.includes('.')) return
        this.curAns = this.curAns.toString() + number.toString()
    }


    chooseOperation(operation) {
        if (this.curAns === '') return
        if (this.prevAns !== '') {
            this.compute()
        }
        this.operation = operation
        this.prevAns = this.curAns
        this.curAns = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.prevAns)
        const current = parseFloat(this.curAns)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '/':
                computation = prev / current
                break
            default:
                return
        }
        this.curAns = computation
        this.operation = undefined
        this.prevAns = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.curAnsTextElement.innerText = 
            this.getDisplayNumber(this.curAns)
        if (this.operation != null) {
        this.prevAnsTextElement.innerText = 
            `${this.getDisplayNumber(this.prevAns)} ${this.operation}`
        } else {
            this.prevAnsTextElement.innerText = ''
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const prevAnsTextElement = document.querySelector('[data-prev-ans]')
const curAnsTextElement = document.querySelector('[data-cur-ans]')

const calculator = new Calculator(prevAnsTextElement, curAnsTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click' , () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click' , () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})