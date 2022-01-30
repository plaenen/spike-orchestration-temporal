export * from './command'
export * from './commandRegistry'
export * from './query'

// export abstract class BaseCommand<TInputType, TResponseType> implements ICommand {
//     protected _input: TInputType
//     abstract execute(): void
//     constructor(input: TInputType) {
//         this._input = input;
//     }
// }