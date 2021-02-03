import {
    mount
} from '@vue/test-utils'
import {
    assert
} from 'chai'
import counter from './counter'

describe('Counter', () => {
    const wrapper = mount(counter)
    const vm = wrapper.vm

    it('renders the correct markup', () => {
        expect(wrapper.html()).toContain('<span class="count">0</span>')
    })

    it('has a button', () => {
        const button = wrapper.find('button')
        expect(button.exists()).toBe(true)
    })

    it('increment works', async () => {
        await wrapper.find('button').trigger('click')
        const count = vm.count
        assert(count === 1)
    })
})