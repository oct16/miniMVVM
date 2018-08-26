import { Dep } from './dep.js'
import { isObject } from './utils.js'

export class Observer {
    constructor (data) {
        this.dep = new Dep()
        Object.keys(data).forEach(key => this.defineReactive(data, key))
    }

    defineReactive (data, key) {
        let val = data[key]

        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get: () => {
                // if from new watcher getter (exclude from text compile)
                if (Dep.target) {
                    this.dep.addSub(Dep.target)
                }
                return val
            },
            set: (newVal) => {
                if (val !== newVal) {
                    val = newVal
                    this.dep.notify()
                    if (isObject) {
                        new Observer(newVal)
                    }
                }
            }
        })
    }
}
