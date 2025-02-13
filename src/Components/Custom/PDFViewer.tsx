import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const PdfViewer = ({
    pdfName
}: {
    pdfName: string
}) => {
    return (
        <div className="w-full flex justify-center items-center bg-black overflow-hidden">
            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}>
                <div className="w-full h-full">
                    <Viewer fileUrl={`http://localhost:3000/view-pdf?token=${pdfName}`} />
                </div>
            </Worker>
        </div>
    );
};

export default PdfViewer;
