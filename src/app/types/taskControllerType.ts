export type TaskControllerType = {
    create: {
        user_id: number,
        params: {
            task_list_id: number,
        },
        body: {
            name: string,
        }
    },
    findById: {
        user_id: number,
        params: {
            task_list_id: number,
            id: number,
        },
    },
    delete: {
        user_id: number,
        params: {
            task_list_id: number,
            id: number,
        },
    },
    update: {
        user_id: number,
        params: {
            task_list_id: number,
            id: number,
        },
        body: {
            name: string,
        }
    },
}