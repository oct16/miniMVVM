import { Compiler } from './compiler.js'
import { Observer } from './observer.js'
export class VM {
    constructor (vm) {
        new Observer(vm.data)
        new Compiler(vm)
        window.vm = vm // for debugger
    }
}
