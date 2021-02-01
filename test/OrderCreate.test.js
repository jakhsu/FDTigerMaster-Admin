import {
    mount,
    shallowMount
} from '@vue/test-utils'
import OrderCreateModal from "@/components/Modal/OrderCreateModal.vue"

const wrapperShallowMount = shallowMount(OrderCreateModal)

console.log("wrapper shallow mount", wrapperShallowMount.html())

const wrapperMount = mount(OrderCreateModal)

console.log("wrapper mount", wrapperMount.html())