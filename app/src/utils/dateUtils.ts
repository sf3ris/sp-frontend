const formatDateToLocale = ( value : string) => {

    const date = new Date(value);

    const year = date.getFullYear();
    const month = (1 + date.getMonth()).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
  
    return `${day}/${month}/${year}`;

}

const formatDateToServerFormat = ( value : string ) => {

    const splitted_date = value.split('/');

   const [ day, month, year ] = splitted_date;

/*     const year = date.getFullYear();
    const month = (1 + date.getMonth()).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
   */
    return `${year}-${month}-${day}`;

}

export const dateUtils = { formatDateToLocale, formatDateToServerFormat };