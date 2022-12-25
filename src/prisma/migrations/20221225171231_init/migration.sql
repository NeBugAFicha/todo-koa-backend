-- CreateTable
CREATE TABLE "grants" (
    "id" SMALLINT NOT NULL,
    "name" VARCHAR(50) NOT NULL,

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
    "id" BIGINT NOT NULL,
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
CREATE UNIQUE INDEX "user_grant_task_lists_user_id_grant_id_idx" ON "user_grant_task_lists"("user_id", "grant_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_login_key" ON "users"("login");

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_task_list_id_fkey" FOREIGN KEY ("task_list_id") REFERENCES "task_lists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_grant_task_lists" ADD CONSTRAINT "user_grant_task_lists_grant_id_fkey" FOREIGN KEY ("grant_id") REFERENCES "grants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_grant_task_lists" ADD CONSTRAINT "user_grant_task_lists_task_list_id_fkey" FOREIGN KEY ("task_list_id") REFERENCES "task_lists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_grant_task_lists" ADD CONSTRAINT "user_grant_task_lists_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

insert into "grants" ("id", "name") values (1, 'Owner'), (2, 'Create'), (3, 'Read'), (4, 'Update'), (5, 'Delete');
