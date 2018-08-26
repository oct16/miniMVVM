let uid = 0
export class Dep {
    constructor () {
        this.subQueue = []
        this.id = uid++
    }

    addSub (sub) {
        this.subQueue.push(sub)
    }

    notify () {
        this.subQueue.forEach(sub => sub.update())
    }

    removeSub (sub) {
        const index = this.subQueue.indexOf(sub)
        this.subQueue.splice(index, 1)
    }
}

Dep.target = null
