const useDownload = () => {

    const downloadPdf = ( b64data : string, filename : string) => {

        const link = document.createElement('a');
        link.href = 'data:application/octet-stream;base64,' + b64data;
        link.setAttribute('download', filename); //or any other extension
        document.body.appendChild(link);
        link.click();

    }

    return { downloadPdf }

}

export default useDownload;