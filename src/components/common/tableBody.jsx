import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  renderCell = (item, column) => {
    let tableData;
    // console.log('Item: ', item);
    // console.log('Column: ', column)
    if (column.content) return column.content(item);
    // console.log("_get: ", _.get(item, column.path));
    if (column.path === 'tips' && item.finalPay) {
      tableData = item.finalPay - item.initialPay;
    } else if (column.path === 'tips' && !item.finalPay) {
      tableData = 'N/A';
    } else {
      tableData = _.get(item, column.path) || "N/A";
    }

    return tableData;
  };

  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  render() {
    const { data, columns } = this.props;
    // console.log('Data: ', data)
    // console.log('Column: ', columns);
    return (
      <tbody>
        {data.map(item => (
          <tr key={item._id}>
            {columns.map(column => (
              <td key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
