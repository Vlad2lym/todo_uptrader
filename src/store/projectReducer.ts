import { ProjectAction, ProjectActionTypes } from "../types/reduxTypes";
import { IProject } from "../types/types"

const projects = localStorage.getItem("projects") !== null ? JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem("projects")))) : []

const initialState:IProject[] = projects

export const projectReducer = (state = initialState, action:ProjectAction):IProject[] => {
    switch(action.type) {
        case ProjectActionTypes.ADD_PROJECT:
            const newState = state.concat([action.payload]);
            localStorage.setItem("projects", JSON.stringify(newState));
            return newState;

        case ProjectActionTypes.FIX_PROJECT:
            const newFixedState = state.map(project => {
                if (project.id === action.payload.id) {return action.payload}
                return project
            })
            localStorage.setItem("projects", JSON.stringify(newFixedState));
            return newFixedState

        case ProjectActionTypes.REMOVE_PROJECT:
            const newRemovedState = state.filter(project => project.id !== action.payload)
            localStorage.setItem("projects", JSON.stringify(newRemovedState));
            return newRemovedState

        default:
            return state;
    }
}

export type ProjectState = ReturnType<typeof projectReducer>