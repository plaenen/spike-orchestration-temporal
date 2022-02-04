import { createCanaryCommand } from './cmd.cannary'
import { InputValidationError } from './errors'

it('should be possible to create a command', () => {
    const cmd = createCanaryCommand({
        greet: 'hello',
        name: 'world'
    })
    expect(cmd.type).toEqual('cmd.canary.create.v1')
    expect(cmd.data.greet).toEqual('hello')
})

it('should be possible to create a command', () => {
    try {
        const cmd = createCanaryCommand({
            greet: 'h',
            name: 'world'
        })
    } catch(err) {
        const iErr = (err as InputValidationError)
        expect(iErr.issues.length).toEqual(1)
        expect(iErr.message).toContain('Invallid command arguments')
    }
})


