import { CommandType } from "./types";

export interface CommandCentre {
    execCommand<TResult>(cmd: CommandType, timeoutInMs?: number): Promise<TResult>
}