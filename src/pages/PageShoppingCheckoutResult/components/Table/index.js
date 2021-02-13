import "./Table.css";

export default (props = {}) => {
  const { columnWidths = [], headerColumns = [], dataRows = [] } = props;

  const renderColumns = (columns = [], columnWidths = []) => {
    return columns.map((column = "", index) => {
      const style = {
        width: columnWidths[index],
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
