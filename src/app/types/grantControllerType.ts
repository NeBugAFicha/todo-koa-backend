export type GrantControllerType = {
    createGrant: {
        params: {
            task_list_id: number,
        },
        query: {
            user_id: number,
        },
    },
    readGrant: {
        params: {
            task_list_id: number,
        },
        query: {
            user_id: number,
        }
    },
    updateGrant: {
        params: {
            task_list_id: number,
        },
        query: {
            user_id: number,
        }
    },
    deleteGrant: {
        params: {
            task_list_id: number,
        },
        query: {
            user_id: number,
        }
    },
};