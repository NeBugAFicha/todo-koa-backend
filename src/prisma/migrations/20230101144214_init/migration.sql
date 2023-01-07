-- CreateTable
CREATE TABLE "grants" (
    "id" SMALLINT NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "grants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task_lists" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "task_lists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasks" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "task_list_id" INTEGER NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_grant_task_lists" (
    "task_list_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "grant_id" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "login" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "grants_name_key" ON "grants"("name");

-- CreateIndex
CREATE UNIQUE INDEX "user_grant_task_lists_user_id_grant_id_idx" ON "user_grant_task_lists"("task_list_id", "user_id", "grant_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_login_key" ON "users"("login");

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_task_list_id_fkey" FOREIGN KEY ("task_list_id") REFERENCES "task_lists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_grant_task_lists" ADD CONSTRAINT "user_grant_task_lists_grant_id_fkey" FOREIGN KEY ("grant_id") REFERENCES "grants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_grant_task_lists" ADD CONSTRAINT "user_grant_task_lists_task_list_id_fkey" FOREIGN KEY ("task_list_id") REFERENCES "task_lists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_grant_task_lists" ADD CONSTRAINT "user_grant_task_lists_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

INSERT INTO public.grants VALUES (1, 'Owner');
INSERT INTO public.grants VALUES (2, 'Create');
INSERT INTO public.grants VALUES (3, 'Read');
INSERT INTO public.grants VALUES (4, 'Update');
INSERT INTO public.grants VALUES (5, 'Delete');

INSERT INTO public.users(login, password) VALUES ('EgorDeveloper', '$2b$04$e6LR1D/wcLPybmor5hlBNej93egKNvXJKpgWR4pBu.g6eYaJsUeRi');
INSERT INTO public.users(login, password) VALUES ('AnotherUser', '$2b$04$xYMwPzNq/isutO/FziBIwe23ZYflkc9yh6NTyJdK0BPB2keVX0Dq6');


INSERT INTO public.task_lists(name) VALUES ('task_list');
INSERT INTO public.task_lists(name) VALUES ('task_list_another_task');
INSERT INTO public.task_lists(name) VALUES ('task_list_another2');
INSERT INTO public.task_lists(name) VALUES ('task_list_another3');

INSERT INTO public.user_grant_task_lists VALUES (1, 1, 1);
INSERT INTO public.user_grant_task_lists VALUES (2, 2, 1);
INSERT INTO public.user_grant_task_lists VALUES (2, 1, 2);
INSERT INTO public.user_grant_task_lists VALUES (2, 1, 4);
INSERT INTO public.user_grant_task_lists VALUES (3, 2, 1);
INSERT INTO public.user_grant_task_lists VALUES (4, 2, 1);
INSERT INTO public.user_grant_task_lists VALUES (1, 2, 3);
INSERT INTO public.user_grant_task_lists VALUES (1, 2, 4);
INSERT INTO public.user_grant_task_lists VALUES (1, 2, 5);

INSERT INTO public.tasks(name, task_list_id) VALUES ('task_list_another_task_task_updated', 2);
INSERT INTO public.tasks(name, task_list_id) VALUES ('task_list_task_task2', 2);
INSERT INTO public.tasks(name, task_list_id) VALUES ('task_list_task_task2', 2);
INSERT INTO public.tasks(name, task_list_id) VALUES ('task_list_another_task_task', 2);
INSERT INTO public.tasks(name, task_list_id) VALUES ('task_list_another2_task', 3);
INSERT INTO public.tasks(name, task_list_id) VALUES ('task_list_another2_task2', 3);
INSERT INTO public.tasks(name, task_list_id) VALUES ('task_list_another3_task', 4);
INSERT INTO public.tasks(name, task_list_id) VALUES ('task_list_another3_task2', 4);
INSERT INTO public.tasks(name, task_list_id) VALUES ('task_list_task4', 1);


