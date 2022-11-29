export interface ITodo {
    id: number,
    title: string,
    description?: string,
    date: {
        created: string,
        deadline?: string
    },
    priority: string,
    files: any[],
    status: string,
    subtasks: ISubtask[],
    comments?: any[],
}
export interface ISubtask {
    id: number,
    title: string,
    active: boolean
}

export interface IProject {
    id: number,
    title: string,
    description?: string,
    createdDate: string,
    boards: IBoard[]
}

export interface IBoard {
    id: number,
    title: string,
    items: ITodo[]
}

export interface IFile {
    id: number,
    file: {},
    url: string
}