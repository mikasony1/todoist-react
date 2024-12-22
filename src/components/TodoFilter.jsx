import { Component } from "react";
import debounce from "debounce";

export default class TodoFilter extends Component {
  render() {
    const { value } = this.props;
    return (
      <>
        <div className="search-container">
          <input
            type="search"
            placeholder="Поиск"
            onChange={this.handleUpdateSearchText}
          />
          <svg
            className="w-[10px] h-[10px] text-gray-800 dark:text-white icon-search"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="19"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
              d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>

        <div className="filter-container medium-font">
          <div className="toggle-checkbox">
            <input
              type="checkbox"
              id="hideCompleted"
              name="hideCompleted"
              checked={value.hideCompleted}
              onChange={this.handleUpdateHideCompleted}
            />
            <label htmlFor="hideCompleted">Скрыть выполненные</label>
          </div>
          <form className="multiselect-container">
            <span>Важность</span>
            <div className="checbox-container">
              <input
                type="checkbox"
                name="важность"
                id="severity-high"
                checked={value.severity.high}
                onChange={(e) => this.handleUpdateSeverity("high", e)}
              />
              <label htmlFor="severity-high">Срочно</label>
            </div>
            <div className="checbox-container">
              <input
                type="checkbox"
                id="severity-medium"
                name="важность"
                checked={value.severity.medium}
                onChange={(e) => this.handleUpdateSeverity("medium", e)}
              />
              <label htmlFor="severity-medium">Средне</label>
            </div>
            <div className="checbox-container">
              <input
                type="checkbox"
                id="severity-low"
                name="важность"
                checked={value.severity.low}
                onChange={(e) => this.handleUpdateSeverity("low", e)}
              />
              <label htmlFor="severity-low">Не срочно</label>
            </div>
          </form>
        </div>
      </>
    );
  }

  handleUpdateSeverity = (key, e) => {
    this.props.onChange({
      severity: { ...this.props.value.severity, [key]: e.target.checked },
    });
  };

  handleUpdateHideCompleted = (e) => {
    this.props.onChange({
      hideCompleted: e.target.checked,
    });
  };

  debounceSearch = debounce(
    (e) => this.props.onChange({ searchText: e.target.value }),
    500
  );

  handleUpdateSearchText = (e) => this.debounceSearch(e);
}
