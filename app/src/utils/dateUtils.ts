const formatDateToLocale = (value : string) => {
  const date = new Date(value)

  const year = date.getFullYear()
  const month = (1 + date.getMonth()).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')

  return `${day}/${month}/${year}`
}

const formatDateToServerFormat = (date : Date) => {
  const dd = String(date.getDate()).padStart(2, '0')
  const mm = String(date.getMonth() + 1).padStart(2, '0') // January is 0!
  const yyyy = date.getFullYear()

  return `${yyyy}-${mm}-${dd}`
}

const formatLocaleDatetoServerdate = (date: string) => {
  const ddmmyy = date.split('/')

  return `${ddmmyy[2]}-${ddmmyy[1]}-${ddmmyy[0]}`
}

export const dateUtils = { formatDateToLocale, formatDateToServerFormat, formatLocaleDatetoServerdate }
