import { Component } from "react";
import TodoFilter from "./TodoFilter";
import NewTodoItem from "./NewTodoItem";
import TodoItem from "./TodoItem";
import generateTodos from "../utiles/todoGenerator";

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      filter: {
        hideCompleted: false,
        searchText: null,
        severity: {
          low: true,
          medium: true,
          high: true,
        },
      },
    };
  }

  render() {
    let items = this.filterItems();

    items = items.sort((item1, item2) => {
      if (item1.done === item2.done) {
        return item2.id - item1.id;
      }
      return item1.done - item2.done;
    });

    return (
      <div className="todolist-container">
        <h2 className="extra-large-font">TODO LIST</h2>
        <TodoFilter
          value={this.state.filter}
          onChange={this.handleUpdateFilter}
        />
        <div className="todoitems-container">
          {items.length ? (
            items.map((item) => (
              <TodoItem
                key={item.id}
                id={item.id}
                title={item.title}
                description={item.description}
                creationDate={item.creationDate}
                severity={item.severity}
                done={item.done}
                onChange={this.handleUpdateItem}
                onDelete={this.handleDeleteItem}
              />
            ))
          ) : (
            <div className="info-container">
              {this.state.items.length
                ? "По вашим критериям ничего не найдено"
                : "Тут пока ничего нет..."}
            </div>
          )}
        </div>

        <NewTodoItem
          onAdd={this.handleAddItem}
          onGenerate={this.handleGenerateItems}
        />
      </div>
    );
  }

  handleAddItem = (item) => {
    this.setState(() => ({
      items: [item, ...this.state.items],
    }));
  };

  handleUpdateItem = (id, done) => {
    this.setState(() => ({
      items: this.state.items.map((item) => {
        if (item.id === id) {
          item.done = done;
        }
        return item;
      }),
    }));
  };

  handleDeleteItem = (id) => {
    this.setState({
      items: this.state.items.filter((item) => item.id !== id),
    });
  };

  handleUpdateFilter = (filter) => {
    this.setState({
      filter: { ...this.state.filter, ...filter },
    });
  };

  handleGenerateItems = () => {
    this.setState({
      items: [...generateTodos(1000), ...this.state.items],
    });
  };

  filterItems() {
    const { items, filter } = this.state;

    const predicates = [
      (item) =>
        !filter.searchText ||
        item.title.toLowerCase().includes(filter.searchText.toLowerCase()) ||
        item.description
          .toLowerCase()
          .includes(filter.searchText.toLowerCase()),
      (item) => !filter.hideCompleted || !item.done,
      (item) => filter.severity.low || item.severity !== 1,
      (item) => filter.severity.medium || item.severity !== 2,
      (item) => filter.severity.high || item.severity !== 3,
    ];

    return items.filter((item) => predicates.every((func) => func(item)));
  }
}
