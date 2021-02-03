import SimpleCard from '@/components/Card/SimpleCard.vue'
import {
    mount
} from '@vue/test-utils'


describe('SimpleCard.vue', () => {
    const wrapper = mount(SimpleCard);
    it('renders div', () => {
        const div = wrapper.find('div')
        expect(div.exists()).toBe(true)
    })
    it('renders div with correct id', () => {
        const div = wrapper.find('div')
        expect(div.element.id).toBe('simple-card')
    })
})