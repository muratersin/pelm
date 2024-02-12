import XLSX from 'xlsx'

export const parseNConvertToJson = async (
  file: File
): Promise<{ headers: string[]; genericJsonArray: any }> => {
  if (!file) {
    throw new Error(`File is ${typeof file}`)
  }

  const raw: any = await parseFile(file)
  return converToJson(raw)
}

export const parseFile = async (file: File) => {
  const workbook = XLSX.read(await file.arrayBuffer())

  const worksheet = workbook.Sheets[workbook.SheetNames[0]]
  const raw_data = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

  return raw_data
}

export const converToJson = (
  parsedData: ParsedArray
): { headers: string[]; genericJsonArray: any } => {
  const headers: string[] = parsedData.shift() as string[]
  const genericJsonArray: any[] = []

  parsedData.forEach((data) => {
    if (data.length === 0) {
      return
    }
    const curr: any = {}

    headers?.forEach((title, i) => {
      curr[title] = data[i]
    })

    genericJsonArray.push(curr)
  })

  return {
    headers,
    genericJsonArray
  }
}

export const imageUrlToBlob = async (url: string) => {
  const response = await fetch(url)
  const blob = await response.blob()
  return URL.createObjectURL(blob)
}
