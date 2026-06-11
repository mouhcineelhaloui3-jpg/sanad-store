export type AdminTableColumn<T> = {
  header: string;
  cell: (row: T) => React.ReactNode;
};

export function AdminTable<T>({
  columns,
  rows
}: {
  columns: AdminTableColumn<T>[];
  rows: T[];
}) {
  if (rows.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-200 p-8 text-center dark:border-slate-800">
        <p className="font-black">No records yet</p>
        <p className="mt-2 text-sm text-slate-500">Real data will appear here after the API/database is connected.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500 dark:border-slate-800">
            {columns.map((column) => (
              <th key={column.header} className="px-4 py-3 font-black">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="border-b border-slate-100 last:border-0 dark:border-slate-800">
              {columns.map((column) => (
                <td key={column.header} className="px-4 py-4 align-middle">
                  {column.cell(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
