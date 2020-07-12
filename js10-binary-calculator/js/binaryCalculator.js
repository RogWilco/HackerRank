'use strict'

class BinaryCalculator {
    static input(input) {
        document.getElementById('res').innerHTML += input
    }

    static clear() {
        document.getElementById('res').innerHTML = ''
    }

    static compute() {
        const expression = document.getElementById('res').innerHTML
        let operand1 = ''
        let operand2 = ''
        let operator = ''
        let result

        console.log(`Expression: ${expression}`)

        for(let i of expression) {
            if (operator === '') {
                switch(i) {
                    case '0':
                    case '1':
                        operand1 += i
                        break;

                    case '+':
                    case '-':
                    case '*':
                    case '/':
                        operator = i
                        break;
                }
            } else {
                operand2 += i
            }

            console.log(`  - ${i}`)
            console.log(`    operand1: ${operand1}`)
            console.log(`    operator: ${operator}`)
            console.log(`    operand2: ${operand2}`)
        }

        operand1 = BinaryCalculator.toDecimal(operand1)
        operand2 = BinaryCalculator.toDecimal(operand2)

        switch(operator) {
            case '+':
                result = operand1 + operand2
                break

            case '-':
                result = operand1 - operand2
                break

            case '*':
                result = operand1 * operand2
                break

            case '/':
                result = Math.floor(operand1 / operand2)
                break
        }

        console.log(`Base10: ${operand1} ${operator} ${operand2} = ${result}`)

        operand1 = BinaryCalculator.toBinary(operand1)
        operand2 = BinaryCalculator.toBinary(operand2)

        result = BinaryCalculator.toBinary(result)

        console.log(`Base2: ${operand1} ${operator} ${operand2} = ${result}`)

        document.getElementById('res').innerHTML = result
    }

    static toBinary(value) {
        return value >= 0 ? value.toString(2) : (~value).toString(2)
    }

    static toDecimal(value) {
        return parseInt(value, 2)
    }

    static handleKey(keyCode) {
        const keyCodes = {
            48: '0',
            49: '1',
            67: 'C',
            187: '+',
            189: '-',
            56: '*',
            191: '/',
        }

        switch(event.keyCode) {
            case 48:    // 0
            case 49:    // 1
            case 187:   // +
            case 189:   // -
            case 56:    // *
            case 191:   // /
                BinaryCalculator.input(keyCodes[event.keyCode])
                break;

            case 67:    // C
            case 27:    // [Esc]
                BinaryCalculator.clear()
                break;

            case 13:    // [Enter]
                BinaryCalculator.compute()
                break;

            default:
                console.log(`keyCode: ${event.keyCode}`)
        }
    }
}

const calc = new BinaryCalculator()

const buttonHandlers = {
    btn0: () => BinaryCalculator.input(0),
    btn1: () => BinaryCalculator.input(1),
    btnClr: () => BinaryCalculator.clear(),
    btnEql: () => BinaryCalculator.compute(),
    btnSum: () => BinaryCalculator.input('+'),
    btnSub: () => BinaryCalculator.input('-'),
    btnMul: () => BinaryCalculator.input('*'),
    btnDiv: () => BinaryCalculator.input('/'),
}

document.addEventListener('click', function (event) {
    if (!event.target.matches('#btns div')) return

    buttonHandlers[event.target.id]()
}, false)

document.addEventListener('keydown', event => BinaryCalculator.handleKey(event.keyCode), false)
