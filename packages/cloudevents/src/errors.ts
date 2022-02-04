import { IssuesType } from "./types"

export class InputValidationError extends Error {
    private _issues: IssuesType = []

    get issues(): IssuesType {
        return this._issues
    }
    constructor(issues?: IssuesType) {
        super('Invallid command arguments: ' + JSON.stringify(issues, null, 2))
        this._issues = issues || []
    }
}