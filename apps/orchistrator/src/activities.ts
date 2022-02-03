import { commandCentre, CommandCentreType } from '@packages/commands-nats'
import { command, CommandType } from '@packages/commands';
  
export const createActivities = (commandCentre: CommandCentreType) => ({
    async execCommand<TResultType>(cmd: CommandType): Promise<TResultType> {
        return await commandCentre.execCommand<TResultType>(cmd)
    }
});
