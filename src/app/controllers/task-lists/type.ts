export type Type = {
  create: {
    body: {
      name: string;
    };
  };
  findById: {
    params: {
      id: number;
    };
  };
  findAll: {
    query: {
      my_list: boolean;
    };
  };
  delete: {
    params: {
      id: number;
    };
  };
  findAllByList: {
    query: {
      list_id?: number;
    };
  };
};
