import { isNodeElement, isNodeText, isMustacheTagText, MUSTACHE_TAG_REG } from './utils.js'
import { Watcher } from './watcher.js'
export class Compiler {
    constructor (vm) {
        this.$vm = vm
        this.$data = vm.data
        this.$el = document.querySelector(vm.el)
        this.compileEl(this.$el)
    }

    compileEl (el) {
        const frag = this.node2frag(el)
        this.compileNode(frag)
        el.appendChild(frag)
    }

    node2frag (el) {
        const frag = document.createDocumentFragment()
        while (el.firstChild) {
            frag.appendChild(el.firstChild)
        }
        return frag
    }

    compileNode (frag) {
        const nodes = Array.prototype.slice.call(frag.childNodes)
        nodes.forEach(node => {
            if (isNodeElement(node)) {
                if (node.childNodes.length) {
                    this.compileNode(node)
                }
            } else if (isNodeText(node) && isMustacheTagText(node.textContent)) {
                this.compileText(node, RegExp.$1)
            }
        })
    }

    compileText (node, exp) {
        const val = this.getVal(exp)
        node.textContent = node.textContent.replace(MUSTACHE_TAG_REG, val)
        new Watcher(this.$vm, exp, (val) => {
            node.textContent = val
        })
    }

    getVal (exp) {
        let val = this.$vm.data
        const keys = exp.split('.')
        keys.forEach(key => {
            val = val[key]
        })
        return val
    }
}
