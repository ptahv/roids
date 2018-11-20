import React from 'react';

import Popup from '../Popup/Popup.jsx';

/* Requires pdfViewer at src-url location 
*/

function openPdfViewerInIframe({iframeElem, pdfBinary, onLoaded}) {
    if (iframeElem) {
        const iframeWindow = iframeElem.contentWindow || iframeElem;

        if (iframeWindow.PDFViewerApplication)
            iframeWindow.PDFViewerApplication.open(pdfBinary);

        if (onLoaded)
            onLoaded();
    }
}

export default ({pdfBinary, onLoaded, onClose}) => {
    let iframeElem = null;

    return (
        <Popup header='PDF' onClose={onClose}>
            <iframe 
                src='/vendor/pdfViewer/web/viewer.html'
                onLoad={() => openPdfViewerInIframe({iframeElem, pdfBinary, onLoaded})} 
                style={{
                    height: '90vh',
                    width: '90vh'
                }}
                ref={(elem) => {
                    if (elem) 
                        iframeElem = elem
                }} /> 
        </Popup>
    )
}

// export default class extends React.Component {
//     onIframeLoaded = () => {
//         const {pdfBinary, onLoaded} = this.props;

//         if (this.iframeElem) {
//             const iframeWindow = this.iframeElem.contentWindow || this.iframeElem;

//             if (iframeWindow.PDFViewerApplication)
//                 iframeWindow.PDFViewerApplication.open(pdfBinary);

//             if (onLoaded)
//                 onLoaded();
//         }
//     }

//     render() {
//         return (
//             <Popup header='PDF' onClose={this.props.onClose}>
//                 <iframe 
//                     src='/vendor/pdfViewer/web/viewer.html'
//                     onLoad={this.onIframeLoaded} 
//                     style={{
//                         height: '90vh',
//                         width: '90vh'
//                     }}
//                     ref={(elem) => {
//                         if (elem) 
//                             this.iframeElem = elem
//                     }} /> 
//             </Popup>
//         );
//     }
// }