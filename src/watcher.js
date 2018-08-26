import { Dep } from './dep.js'
// Watcher is actually a subscriber
export class Watcher {
    constructor (vm, exp, cb) {
        this.$vm = vm
        this.$exp = exp
        this.$cb = cb

        Dep.target = this // carry the target for add dep
        this.value = this.getVal(exp)
        Dep.target = null
    }

    getVal (exp) {
        const data = this.$vm.data
        const keys = exp.split('.')
        let val = data
        keys.forEach(key => (val = val[key]))
        return val
    }

    // notify the latest result
    update () {
        const newVal = this.getVal(this.$exp)
        if (newVal !== this.value) {
            this.$cb.call(this.vm, newVal, this.value)
        }
    }
}
