import { CommandCentreType } from '@packages/commands-nats';
import { CommandType } from '@packages/commands';
export declare const createActivities: (commandCentre: CommandCentreType) => {
    execCommand<TResultType>(cmd: CommandType): Promise<TResultType>;
};
//# sourceMappingURL=activities.d.ts.map