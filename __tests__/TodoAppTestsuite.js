const todoList = require("../todo");
const {
  all,
  add,
  markAsComplete,
  overdue,
  dueToday,
  dueLater,
  toDisplayableList,
} = todoList();

const dateToday = new Date();
const formattedDate = (d) => {
  return d.toISOString().split("T")[0];
};

const today = formattedDate(dateToday);

describe("Test suite for Todo application", () => {
  beforeAll(() => {
    const formattedDate = (d) => {
      return d.toISOString().split("T")[0];
    };

    const dateToday = new Date();
    const today = formattedDate(dateToday);

    add({
      title: "Buy groccaries",
      dueDate: new Date("2022-03-07"),
      completed: false,
    });
    add({
      title: "Pay college fee",
      dueDate: new Date("2022-12-09"),
      completed: false,
    });
    add({
      title: "Pay rent",
      dueDate: today,
      completed: true,
    });
    add({
      title: "Submit assignment",
      dueDate: today,
      completed: false,
    });
    add({
      title: "Participate in coding contest",
      dueDate: new Date("2022-11-26"),
      completed: false,
    });
  });

  test("Must add new todo", () => {
    const todosItemsCounts = all.length;
    add({
      title: "Go to tour",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
    expect(all.length).toBe(todosItemsCounts + 1);
  });

  test("Must mark the todo as completed", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("Must get all overdue todos", () => {
    overDueItems = overdue();
    expect(
      overDueItems.every((todo) => {
        return todo.dueDate < today;
      })
    ).toBe(true);
  });

  test("Must get all due today todos", () => {
    dueTodayItems = dueToday();
    expect(
      dueTodayItems.every((todo) => {
        return todo.dueDate === today;
      })
    ).toBe(true);
  });

  test("Must get due later todos", () => {
    dueLaterItems = dueLater();
    expect(
      dueLaterItems.every((todo) => {
        return todo.dueDate > today;
      })
    ).toBe(true);
  });
});
