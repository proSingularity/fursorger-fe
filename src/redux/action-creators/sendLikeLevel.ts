import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { updateLevelMetadata } from "../../api/send-like";
import { ILevelMetadataUpdateSuccess } from "../actions/ILevelMetadataLikeSuccess";
import { requestUpdateLevelMetadata } from "./requestLikeLevelMetadata";
import { succeedUpdateLevelMetadata } from "./succeedLikeLevelMetadata";

export const sendUpdateLevelMetadata: ActionCreator<
    ThunkAction<
        Promise<ILevelMetadataUpdateSuccess>, // The type of the last action to be dispatched - will always be promise<T> for async actions
        ILevelMetadataUpdateSuccess["payload"], // The type for the data within the last action
        null, // The type of the parameter for the nested function
        ILevelMetadataUpdateSuccess // The type of the last action to be dispatched
    >
> = (levelId: number, update: IUpdateLevel = { like: true }) => {
    return async (dispatch: Dispatch) => {
        dispatch(requestUpdateLevelMetadata());
        const levelMetadata = await updateLevelMetadata(levelId, update);
        return dispatch(succeedUpdateLevelMetadata(levelMetadata));
    };
};

interface IUpdateLevel {
    like?: true;
    download?: true;
}
