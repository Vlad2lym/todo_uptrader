import { IProject } from "./types"

interface AddProjectAction {
    type: ProjectActionTypes.ADD_PROJECT,
    payload: IProject
}

interface FixProjectAction {
    type: ProjectActionTypes.FIX_PROJECT,
    payload: IProject
}

interface RemoveProjectAction {
    type: ProjectActionTypes.REMOVE_PROJECT,
    payload: number
}

export type ProjectAction = AddProjectAction | FixProjectAction | RemoveProjectAction

export enum ProjectActionTypes {
    ADD_PROJECT = 'ADD_PROJECT',
    FIX_PROJECT = 'FIX_PROJECT',
    REMOVE_PROJECT = 'REMOVE_PROJECT'
}