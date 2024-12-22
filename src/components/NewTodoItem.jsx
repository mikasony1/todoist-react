import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";

export default class NewTodoItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      severity: "2",
    };
  }

  render() {
    const isDisabled = this.state.title.trim().length === 0;
    const severity = this.state.severity;

    return (
      <>
        <div className="new-todoitem-container medium-font">
          <h3 className="large-font">ДОБАВИТЬ ЗАДАЧУ</h3>
          <span className="title-input">Название</span>
          <input
            type="text"
            name="taskName"
            value={this.state.title}
            onChange={(e) => this.handleUpdateItem("title", e)}
            className="task-name"
            placeholder="Введите название задачи"
          />

          <span className="title-input"> Описание</span>
          <input
            type="text"
            name="taskDescription"
            value={this.state.description}
            onChange={(e) => this.handleUpdateItem("description", e)}
            className="task-description"
            placeholder="Введите описание задачи"
          />
          <span className="title-input">Важность</span>
          <div className="severity-contanier">
            <button
              className={
                severity === "3"
                  ? "severity-button active-severity-button medium-font"
                  : "severity-button medium-font"
              }
              value={3}
              onClick={(e) => this.handleUpdateItem("severity", e)}
            >
              Срочно
            </button>
            <button
              className={
                severity === "2"
                  ? "severity-button active-severity-button medium-font"
                  : "severity-button medium-font"
              }
              value={2}
              onClick={(e) => this.handleUpdateItem("severity", e)}
            >
              Средне
            </button>
            <button
              className={
                severity === "1"
                  ? "severity-button active-severity-button medium-font"
                  : "severity-button medium-font"
              }
              value={1}
              onClick={(e) => this.handleUpdateItem("severity", e)}
            >
              Не срочно
            </button>
          </div>
          <div className="buttons-container">
            <button className="button" onClick={this.handleGenerateItems}>
              Сгенерировать 1000 задач
            </button>
            <button
              className="button"
              disabled={isDisabled}
              onClick={this.handleAddItem}
            >
              ДОБАВИТЬ
            </button>
          </div>
        </div>
      </>
    );
  }

  handleUpdateItem = (key, e) => this.setState({ [key]: e.target.value });

  handleAddItem = () => {
    const newItem = {
      id: uuidv4(),
      title: this.state.title.trim(),
      description: this.state.description,
      severity: this.state.severity,
      creationDate: new Date(),
      done: false,
    };
    this.props.onAdd(newItem);
    this.setState({
      title: "",
      description: "",
      severity: "2",
    });
  };

  handleGenerateItems = () => {
    this.props.onGenerate();
  };
}
