import core from './pdfViewer.core.js';

import pdfMake from 'pdfmake/build/pdfmake.js';
import pdfFonts from 'pdfmake/build/vfs_fonts.js';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

import IframePdfPopup from './IframePdfPopup.jsx';

function renderPdfPopup(pdfBinary, pdfLoadedCallback) {
    const pdfContainerElem = document.createElement('div');
    document.body.appendChild(pdfContainerElem);

    const onClose = () => {
        ReactDOM.unmountComponentAtNode(pdfContainerElem);
        document.body.removeChild(pdfContainerElem);
    }

    ReactDOM.render(
        <IframePdfPopup 
            pdfBinary={pdfBinary}
            onClose={onClose}
            onLoaded={pdfLoadedCallback}
            />
            
        , pdfContainerElem
    )
}

function base64ToBinary(base64) {
    const raw = window.atob(base64);
    const rawLength = raw.length;
    let array = new Uint8Array(new ArrayBuffer(rawLength));

    for(let i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i);
    }

    return array;
}

export default (docDefinition, pdfLoadedCallback) => {
    pdfMake
        .createPdf(docDefinition)
        .getBase64((base64) => (
            renderPdfPopup(
                base64ToBinary(base64), 
                pdfLoadedCallback
            )
        ))
}