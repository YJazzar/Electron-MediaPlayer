
// TODO: add a save feature
// TODO: make it store to file
class Stack {
    constructor() {
        this.historyStack = [];
    }

    push(state) {
        this.historyStack.push(state);
    }

    pop() {
        return this.historyStack.pop()
    }

    peek() {
        return this.historyStack[this.historyStack.length-1];
    }

    length() {
        return this.historyStack.length;
    }

    isEmpty() {
        if (this.historyStack.length == 0)
            return true;

        return false;
    }

    toString() {
        console.log(this.historyStack);
    }

    getStack() {
        return this.historyStack;
    }
}

module.exports = { Stack };