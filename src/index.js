class SmartCalculator {

    constructor(initialValue) {
        this.expression = initialValue.toString();
    }

    add(number) {
        this.expression += " + " + number;
        return this;
    }

    subtract(number) {
        this.expression += " - " + number;
        return this;
    }

    multiply(number) {
        this.expression += " * " + number;
        return this;
    }

    devide(number) {
        this.expression += " / " + number;
        return this;
    }

    pow(number) {
        this.expression += " ^ " + number;
        return this;
    }

    _toPostfix() {
        const stack = [];
        let postfixExp = "";
        const operators = {
            "+": 1,
            "-": 1,
            "*": 2,
            "/": 2,
            "^": 3
        };

        function parse(expressionArray) {

            if (expressionArray.length === 0) {

                if (stack.length > 0) {

                    while(stack.length > 0) {
                        postfixExp += stack.pop() + " ";
                    }
                }

                return postfixExp;
            }

            if (expressionArray[0] in operators) {
                while (stack.length > 0) {
                    if (operators[expressionArray[0]] <= operators[stack[stack.length-1]]) {
                        postfixExp += stack.pop() + " ";
                    } else {
                        break;
                    }
                }
                stack.push(expressionArray[0]);
            } else {
                postfixExp += expressionArray[0] + " "
            }

            expressionArray = expressionArray.slice(1);

            return parse(expressionArray);
        }

        return parse(this.expression.split(' ')).trim();
    }

    _evaluatePostfix() {

        const postfixExpression = this._toPostfix();

        const operators = {
            '+': (x, y) => x + y,
            '-': (x, y) => x - y,
            '*': (x, y) => x * y,
            '/': (x, y) => x / y,
            '^': (x, y) => Math.pow(x, y)
        };

        let stack = [];

        postfixExpression.split(' ').forEach((token) => {
            if (token in operators) {
                let [y, x] = [stack.pop(), stack.pop()];
                stack.push(operators[token](x, y));
            } else {
                stack.push(parseFloat(token));
            }
        });

        return stack.pop();
    }

    valueOf() {
        return this._evaluatePostfix();
    }
}

module.exports = SmartCalculator;









