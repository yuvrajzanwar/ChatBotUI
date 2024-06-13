import React from 'react'
import '../styles/PdfPreview.css'
import { Document, Page, pdfjs } from 'react-pdf'; 


pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.3.136/pdf.worker.min.mjs';
const PdfPreview = ({selectedFile, setSelectedFile, pdfFiles}) => {
    // const [selectedFile, setSelectedFile] = React.useState(null);
    const [numPages, setNumPages] = React.useState(null);
    const [pageNumber, setPageNumber] = React.useState(1);
    const containerRef = React.useRef(null);

    const onDocumentLoadSuccess = ({ numPages }) => {
        console.log("Document Loaded Successfully");
        setNumPages(numPages);
        setPageNumber(1);
      };

      const onDocumentLoadError = (error) => {
        console.error('Error loading PDF:', error);
        alert('Error loading PDF. Please check the console for details.');
    };

      

    const renderPageNumber = (pageNumber, numPages) => {
      return (
        <div className="page-number">
          {pageNumber} / {numPages}
        </div>
      );
    };

    const handleFileSelect = (file) => {
      setSelectedFile(file);
    };

    const renderPdfPages = () => {
        return (
          <div className="pdf-container" ref={containerRef} style={{ width: '100%', height: '100%', overflow: 'auto' }}>
            <Document
              file={selectedFile}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              className="pdf-document"
            >
              {Array.from(new Array(numPages), (el, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  className="pdf-page"
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                  width={containerRef.current?.clientWidth-10 || 0}
                  canvasProps={{
                    className: 'pdf-canvas',
                  }}
                  // scale={scale}
                  // onLoadSuccess={onPageLoadSuccess}
                >
                  {renderPageNumber(index + 1, numPages)}
                </Page>
              ))}
            </Document>
          </div>
        );
      };
    
    return (
        <div className='outer-container'>
        <div className='file-list'>
          <div className='file-list-header'>Select PDF</div>
          {pdfFiles.map((file, index) => (
            <div 
              key={index} 
              className={(selectedFile && selectedFile.name === file.name) ? 'file-item selected-file' : 'file-item'} 
              onClick={() => handleFileSelect(file)}
            >
              <div className="file-item-text">
                <div class="truncated-text-container">
                  <div class="truncated-text" data-full-text={file.name}>
                  {file.name}
                  </div>
                </div>
            </div>
            </div>
          ))}
        </div>
        <div className="pdf-container">
            <div className="pdf-preview">
                {selectedFile ? renderPdfPages() : 
                <div style={
                    {
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '80vh',
                        width: '40vw',
                        fontSize: '30px',
                        color: '#4684ff',
                    } 
                }>Select file to preview</div>
              }
            </div>
        </div>
        </div>
    )
}

export default PdfPreview