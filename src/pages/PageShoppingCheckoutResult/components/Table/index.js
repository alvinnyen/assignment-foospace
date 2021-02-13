import "./Table.css";

export default (props = {}) => {
  const { columnWidths = [], headerColumns = [], dataRows = [] } = props;

  // it's meaningless to render a table if no data rows
  if (!dataRows.length) return null;

  const renderColumns = (columns = [], columnWidths = []) => {
    return columns.map((column = "", index) => {
      const style = {
        width: columnWidths[index] || `${100 / columns.length}%`,
      };
      return (
        <div key={index} className="cell" style={style}>
          {column}
        </div>
      );
    });
  };

  const renderRows = (dataRows = [], columnWidths = []) => {
    return dataRows.map((dataRow = []) => renderColumns(dataRow, columnWidths));
  };

  return (
    <div className="table">
      {renderColumns(headerColumns, columnWidths)}
      <hr />
      {renderRows(dataRows, columnWidths)}
    </div>
  );
};
