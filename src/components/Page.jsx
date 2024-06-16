import React,{useState, useEffect} from 'react'
import Chat from './Chat'
import PdfPreview from './PdfPreview'
import '../styles/Page.css'
import { useLocation , useNavigate} from 'react-router-dom'

const Page = ({pdfFiles}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [file, setFile] = useState(null);
  const [filesArray, setFilesArray] = useState([]);

  useEffect(() => {
    if (!location.state) 
    {navigate('/');
    return;
    }
    const files = location.state.pdfFiles;
    setFilesArray(files);
    setSelectedFile(files[0]);
  }, [location.state]);
  


  return (
    <>
        <div className='container'>
            <div className='file-viewer'>
                <PdfPreview pdfFiles= {filesArray} selectedFile={selectedFile} setSelectedFile={setSelectedFile}/>
            </div>
            <div className='chatbot-container'>
                <Chat file={selectedFile}/>
            </div>
        </div>  
    </>
  )
}

export default Page