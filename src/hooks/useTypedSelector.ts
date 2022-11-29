import { TypedUseSelectorHook, useSelector } from "react-redux";
import { ProjectState } from "../store/projectReducer";

export const useTypedSelector:TypedUseSelectorHook<ProjectState> = useSelector