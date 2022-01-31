export * from './command'
export * from './commandCentre'
export * from './query'
export * from './queryCentre'
export * from './event'
export * from './eventCentre'

// export abstract class BaseCommand<TInputType, TResponseType> implements ICommand {
//     protected _input: TInputType
//     abstract execute(): void
//     constructor(input: TInputType) {
//         this._input = input;
//     }
// }