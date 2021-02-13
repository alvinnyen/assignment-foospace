import PropTypes from "prop-types";

const Table = (props = {}) => {
  const { columnWidths = [], headerColumns = [], dataRows = [] } = props;

  // it's meaningless to render a table if no data rows
  if (!dataRows.length) return null;

  const renderColumns = (columns = [], columnWidths = []) => {
    return columns.map((column = "", index) => {
      const style = {
        width: columnWidths[index] || `${100 / columns.length}%`,
        display: "inline-block",
      };
      return (
        <div key={index} style={style}>
          {column}
        </div>
      );
    });
  };

  const renderRows = (dataRows = [], columnWidths = []) => {
    return dataRows.map((dataRow = []) => renderColumns(dataRow, columnWidths));
  };

  return (
    <div>
      {renderColumns(headerColumns, columnWidths)}
      <hr />
      {renderRows(dataRows, columnWidths)}
    </div>
  );
};

Table.propTypes = {
  columnWidths: PropTypes.arrayOf(PropTypes.string).isRequired,
  headerColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
  dataRows: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
  ).isRequired,
};

export default Table;
