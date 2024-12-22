import { PureComponent } from "react";
import moment from "moment";

const SEVERITY_NAMES = ["Не срочно", "Средне", "Срочно"];

export default class TodoItem extends PureComponent {
  render() {
    const { title, description, creationDate, severity, done } = this.props;
    return (
      <div className="todo-item-container">
        <div className="task-completed-container">
          <input
            type="checkbox"
            name="done"
            checked={done}
            onChange={this.handleDoneChange}
          />
        </div>

        <div className="todo-item-info-container medium-font">
          <p className="title ">{title}</p>
          {description && <p className="description ">{description}</p>}
          <span className="severity medium-font">
            {SEVERITY_NAMES[severity - 1]}
          </span>
        </div>

        <div className="todo-item-date-container small-font">
          <span>{moment(creationDate).format("DD.MM.YYYY HH:MM")}</span>
          <button className="medium-font" onClick={this.handleDelete}>
            УДАЛИТЬ
          </button>
        </div>
      </div>
    );
  }

  handleDoneChange = (e) => {
    const { id, onChange } = this.props;
    onChange(id, e.target.checked);
  };

  handleDelete = () => {
    const { id, onDelete } = this.props;
    onDelete(id);
  };
}
