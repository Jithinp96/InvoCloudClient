import React from 'react';

const Table = ({ 
  id,
  data, 
  columns 
}) => {
  return (
    <div className="w-full overflow-x-auto">
      <table id={id} className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100 border-b">
          <tr>
            {columns.map((column) => (
              <th 
                key={column.key}
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                style={{ 
                  width: column.width || 'auto',
                  minWidth: column.minWidth || 'auto'
                }}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr 
                key={rowIndex} 
                className="hover:bg-gray-50"
              >
                {columns.map((column) => (
                  <td 
                    key={column.key} 
                    className="px-4 py-3 whitespace-nowrap text-sm text-gray-900"
                    style={{ 
                      width: column.width || 'auto',
                      minWidth: column.minWidth || 'auto'
                    }}
                  >
                    {column.render 
                      ? column.render(row[column.key], row) 
                      : row[column.key]
                    }
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td 
                colSpan={columns.length} 
                className="px-4 py-3 text-center text-sm text-gray-500"
              >
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;