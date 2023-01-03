export type Type = {
    grant: {
        params: {
            task_list_id: number,
        },
        query: {
            grant: string,
            user_id: number,
            take_off: boolean,
        },
    },
};