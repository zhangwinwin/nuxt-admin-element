import { shallowMount, createLocalVue } from '@vue/test-utils'
import index from '../src/pages/index.vue'
import Vuex from 'vuex'
const localVue = createLocalVue()

localVue.use(Vuex)
describe('测试index', () => {
  let actions
  actions = {
    setHostTableList: jest.fn(),
    setPaginationConfig: jest.fn(),
    setHostUrl: jest.fn()
  }
  it('测试changeUrlPath', () => {
    const wrapper = shallowMount(index, actions);
    expect(wrapper.vm.changeUrlPath('/api/hostList/0')).toEqual('a')
  })
});
