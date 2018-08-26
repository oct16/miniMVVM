import { mockData } from './mock-data.js'
import { VM } from './vm.js'

new VM({
    el: '#app',
    data: mockData,
    computed: {
        name: () => {
            return 'this is computed data'
        }
    }
})
