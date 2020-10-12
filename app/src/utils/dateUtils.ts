const formatDateToLocale = ( value : string) => {

    const date = new Date(value);

    const year = date.getFullYear();
    const month = (1 + date.getMonth()).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
  
    return `${day}/${month}/${year}`;

}

const formatDateToServerFormat = ( date : Date ) => {

   var dd = String(date.getDate()).padStart(2, '0');
   var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
   var yyyy = date.getFullYear();
   
    return `${yyyy}-${mm}-${dd}`;

}

export const dateUtils = { formatDateToLocale, formatDateToServerFormat };