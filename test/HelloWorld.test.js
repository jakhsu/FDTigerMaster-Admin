import {
    shallowMount
} from '@vue/test-utils';
import HelloWorld from '../src/components/HelloWorld.vue';

describe('HelloWorld test', () => {
    test('msg should be hello', () => {
        const wrapper = shallowMount(HelloWorld);
        wrapper.setData({
            scores: {
                firstSection: 1
            }
        });
        expect(wrapper.scores.firstSection).toBe(1);
    });
});