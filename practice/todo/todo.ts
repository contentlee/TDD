interface TTodo {
  id: number;
  title: string;
  content: string;
  write_date: Date;
  edit_date: Date;
  state: "not_todo" | "complete" | "doing_now";
}

type TTodoKey = keyof TTodo;

class TodoTable {
  list: TTodo[] = [];

  constructor(list?: TTodo[]) {
    if (list) this.list = list;
  }

  add = (task: TTodo) => {
    this.list.push({ ...task });
    return this;
  };

  remove = (id: number) => {
    const idx = this.findIdx(id);
    if (idx < 0) return this;
    this.list.splice(idx, 1);
    return this;
  };

  complete = (id: number) => {
    const idx = this.findIdx(id);
    if (idx < 0) return this;
    this.list[idx].state = "complete";
    return this;
  };

  edit = (id: number, { title, content }: { title?: string; content?: string }) => {
    const idx = this.findIdx(id);
    if (idx < 0 || (!title && !content)) return this;

    if (title) this.list[idx].title = title;
    if (content) this.list[idx].content = content;

    this.list[idx].edit_date = new Date();
    return this;
  };

  sort = (key: TTodoKey, dir: "asc" | "dsc") => {
    if (key === "edit_date" || key === "write_date") this.sortByDate(dir);
    if (key === "id") this.sortById(dir);

    return this;
  };

  sortById = (dir: "asc" | "dsc") => {
    this.list.sort((a, b) => {
      if (dir === "asc") return a.id - b.id;
      else return b.id - a.id;
    });
  };

  sortByDate = (dir: "asc" | "dsc") => {
    this.list.sort((a, b) => {
      if (dir === "asc") return a.edit_date.getTime() - b.edit_date.getTime();
      else return b.edit_date.getTime() - a.edit_date.getTime();
    });
  };

  search = (key: TTodoKey, keyword: string | Date) => {
    if (key === "edit_date" || key === "write_date") return this.searchByDate(key, keyword as Date);
    if (typeof keyword !== "string") return [];
    return this.list.filter((task) => {
      console.log(task[key], keyword);
      return (task[key] as string).includes(keyword);
    });
  };

  searchByDate = (key: TTodoKey, date: Date) => {
    return this.list.filter((task) => {
      const taskDate = task[key] as Date;
      return (
        taskDate.getFullYear() === date.getFullYear() &&
        taskDate.getMonth() === date.getMonth() &&
        taskDate.getDate() === date.getDate()
      );
    });
  };

  findIdx = (id: number) => {
    return this.list.findIndex((task) => task.id === id);
  };
}

export default TodoTable;

export { TTodo };
