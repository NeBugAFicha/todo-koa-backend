export type TaskListControllerType = {
    create: {
        user_id: number,
        body: {
            name: string,
        }
    },
    findById: {
        user_id: number,
        params: {
            id: number,
        },
    },
    findAll: {
        user_id: number,
        query: {
            my_list: boolean,
        }
    },
    delete: {
        user_id: number,
        params: {
            id: number,
        },
    },
    findAllByList: {
        user_id: number,
        params: {
            list_id: number,
        },
    },
}