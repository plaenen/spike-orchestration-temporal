import { helloCanary } from './index'

it('should be posible to pass a test', () => {
    expect(helloCanary('hello')).toEqual("Hello hello !!!")
})

export {}