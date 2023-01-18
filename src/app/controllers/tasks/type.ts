export type Type = {
  create: {
    params: {
      task_list_id: number;
    };
    body: {
      name: string;
    };
  };
  findById: {
    params: {
      task_list_id: number;
      id: number;
    };
  };
  delete: {
    params: {
      task_list_id: number;
      id: number;
    };
  };
  update: {
    params: {
      task_list_id: number;
      id: number;
    };
    body: {
      name: string;
    };
  };
};
