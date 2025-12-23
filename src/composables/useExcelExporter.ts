import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'

export function useExcelExporter(): {
  exportTableExcel: (args: {
    headers: string[]
    rows: (string | number)[][]
    filename: string
  }) => void
} {
  const exportTableExcel = ({
    headers,
    rows,
    filename,
  }: {
    headers: string[]
    rows: (string | number)[][]
    filename: string
  }): void => {
    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows])

    const colWidths = headers.map((h, i) => ({
      wch: Math.max(
        h.length,
        ...rows.map(r => (r[i] ? r[i].toString().length : 0)),
      ) + 2,
    }))
    worksheet['!cols'] = colWidths

    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data')

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
    saveAs(blob, `${filename}.xlsx`)
  }

  return { exportTableExcel }
}
