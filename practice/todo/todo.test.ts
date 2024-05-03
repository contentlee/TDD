import { describe, expect, it } from "@jest/globals";
import TodoTable, { TTodo } from "./todo";

const tasks: TTodo[] = [
  {
    id: 1,
    title: "watching tv",
    content: "",
    write_date: new Date(),
    edit_date: new Date(),
    state: "not_todo",
  },
  {
    id: 2,
    title: "read book",
    content: "",
    write_date: new Date(),
    edit_date: new Date(),
    state: "not_todo",
  },
  {
    id: 3,
    title: "shopping",
    content: "",
    write_date: new Date(),
    edit_date: new Date(),
    state: "not_todo",
  },
];

const init = () => {
  const table = new TodoTable();
  tasks.forEach((task) => {
    table.add(task);
  });

  return table;
};

describe("todo Test", () => {
  it("test add method", () => {
    const table = init();
    const length = table.list.length;

    expect(table.add(tasks[0]).list.length).toBe(length + 1);
    expect(table.list[length].id).toBe(1);
  });

  it("test remove method", () => {
    const table = init();
    const length = table.list.length;

    expect(table.remove(1).list.length).toBe(length - 1);
    expect(table.list.findIndex((t) => t.id === 1)).toBe(-1);
  });

  it("test complete method", () => {
    const table = init();

    expect(table.complete(1).list[0].state).toBe("complete");
    expect(table.list[1].state === "complete").toBeFalsy();
  });

  it("test edit method", () => {
    const table = init();
    const title = "write essay";
    const content = "hahah, it's so interesting";

    expect(table.edit(1, { title }).list[0].title).toBe(title);
    expect(table.edit(1, { content }).list[0].content).toBe(content);
    expect(table.list[0].edit_date === table.list[0].write_date).toBeFalsy();
  });

  it("test sort method", () => {
    const table = init();
    const title = "write essay";

    table.edit(3, { title });
    expect(table.sort("edit_date", "dsc").list[0].id).toBe(3);
    expect(table.sort("id", "asc").list[0].id).toBe(1);
  });

  it("test search method", () => {
    const table = init();

    expect(table.search("title", "shopping").length).toBe(1);
  });
});
