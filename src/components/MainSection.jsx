import React, {useState, useRef} from 'react';
import styled,{keyframes} from 'styled-components';
import TypingText from './TypingText';
import "../styles/MainSection.css";
import LoadingScreen from "./LoadingScreen"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(-3deg);
  }
  100% {
    transform: rotate(3deg);
  }
`;

const ToggleButtonContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #e0e0e0;
  border-radius: 25px;
  padding: 5px;
  width: fit-content;
  margin-top : 3vh;
`;

const ToggleOption = styled.div`
  background-color: ${({ selected }) => (selected ? '#4b0dff' : 'transparent')};
  color: ${({ selected }) => (selected ? '#fff' : '#000')};
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  
  &:hover {
    background-color: ${({ selected }) => (selected ? '#3700ff' : '#d0d0d0')};
  }
`;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  height : 14vh;
  background-color: white;

  @media (max-width: 768px){
    padding : 0 20px;
    height: 12vh;
  }
`;

const Logo = styled.div`
  font-size: 2.3em;
  //font-weight: bold;
  color: #0d0d0d;

    @media (max-width: 768px) {
    font-size: 1.9em;
  }

`;

const AboutButton = styled.button`
  background-color: #4b0dff;
  color: white;
  border: none;
  border-radius: 25px;
  padding: 12px 22px;
  cursor: pointer;
  font-size: 1em;
  &:hover {
    background-color: #3700ff;
    animation : ${rotate} 1s infinite alternate;
  }


  @media (max-width: 768px) {
    padding: 10px 18px;
    font-size: 0.9em;
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  // align-items: center;
  padding: 1vh 2vw 5vh 8vw;
  background-color: #f7f7f7;
  height: 80vh;

  @media (max-width : 768px){
    flex-direction: column;
    height:60vh;
  }
`;

const TextContainer = styled.div`
  flex: 1;
  flex-direction: column;
  max-width: 60vw;
  margin-top:18vh;

  @media (max-width : 768px){
    margin-top:5vh;
    max-width:90%;
  }
`;

const Title = styled.div`
  height:9vh;
  font-size: 9vh;
  color: #0d0d0d;
  @media(max-width:768px){
      font-size:5vh;
      height:5vh;
  }
`;

const Subtitle = styled.div`
  font-size: 9vh;
  color: #0033cc;
  @media(max-width:768px){
      font-size:5vh;
  }
`;

const DescriptionDesktop = styled.p`
  font-size: 3vh;
  color: #262626;
  margin-bottom: 7vh;

  @media (max-width: 768px) {
    display: none;
  }
`;

const DescriptionMobile = styled.p`
  display: none;
  font-size: 2.5vh;
  color: #262626;
  margin-bottom: 4vh;

  @media (max-width: 768px) {
    display: block;
  }
`;

const CallToAction = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const Button = styled.button`
  background-color: #4b0dff;
  display : flex;
  flex-direction: row; 
  color: white;
  border :  none;
  border-radius: 35px;
  padding: 12px 22px;
  cursor: pointer;
  font-size: 1em;
  margin-right: 15px;
  &:hover {
    background-color: #3700ff;
    font-size:1.2rem;
  }
      &:hover .profile-images {
    animation: ${rotate} 0.5s infinite alternate;
  }

`;

const ProfileImages = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

const Text = styled.div`
    display:flex;
    height:6vh;
    font-size:2.5vh;
    align-items:center;
    margin-right : 5px;
`
const ProfileImage = styled.img`
  border-radius: 30%;
  height: 40px;
  width : 35px;
  margin-left: -8px;
//border: 2px solid white;
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 80vw;
  height: 70vh;
  overflow-y: auto;

  @media (min-width: 768px) {
    width: 80%;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.5em;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
`;

const ModalBody = styled.div`
  font-size: 1em;
  color: #333;
  display:flex;
  align-items: center;
  justify-content :center;  
`;

const Modal = ({ title, onClose,files, setFiles, handleUpload }) => {
  const [fileSelected, setFileSelected] = useState(false);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef();
  
  const openFileDialog = () => {
    fileInputRef.current.click();
  };


  const handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };
  
  const handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      const uniqueNewFiles = newFiles.filter(newFile => 
        !files.some(existingFile => existingFile.name === newFile.name && existingFile.size === newFile.size)
      );
      setFiles(prevFiles => [...prevFiles, ...uniqueNewFiles]);
      setFileSelected(true);
      e.dataTransfer.clearData();
    }
  };
  

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileChange(e);
    }
  };
  
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const uniqueNewFiles = newFiles.filter(newFile => 
      !files.some(existingFile => existingFile.name === newFile.name && existingFile.size === newFile.size)
    );
    setFiles(prevFiles => [...prevFiles, ...uniqueNewFiles]);
    setFileSelected(true);
    e.target.value = null; 
  };

  const formatFileSize = (size) => {
    if (size < 1024) {
      return `${size} B`;
    } else if (size < 1048576) {
      return `${(size / 1024).toFixed(2)} KB`;
    } else {
      return `${(size / 1048576).toFixed(2)} MB`;
    }
  };



  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <ModalBody>
        {!fileSelected ? (<div 
              className='file-upload-container'
              onDragEnter={handleDragIn}
              onDragLeave={handleDragOut}
              onDragOver={handleDragIn}
              onDrop={handleDrop}
            >
            <div className="file-upload">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                <g clip-path="url(#clip0_252_1045)">
                  <path d="M10.0001 36.6667C9.08341 36.6667 8.29897 36.3406 7.64675 35.6883C6.99341 35.035 6.66675 34.25 6.66675 33.3333V6.66666C6.66675 5.74999 6.99341 4.96499 7.64675 4.31166C8.29897 3.65944 9.08341 3.33333 10.0001 3.33333H23.6251C24.0695 3.33333 24.4934 3.41666 24.8967 3.58333C25.299 3.75 25.6529 3.98611 25.9584 4.29166L32.3751 10.7083C32.6806 11.0139 32.9167 11.3678 33.0834 11.77C33.2501 12.1733 33.3334 12.5972 33.3334 13.0417V33.3333C33.3334 34.25 33.0073 35.035 32.3551 35.6883C31.7017 36.3406 30.9167 36.6667 30.0001 36.6667H10.0001ZM10.0001 33.3333H30.0001V13.3333H25.0001C24.5279 13.3333 24.1323 13.1739 23.8134 12.855C23.4934 12.535 23.3334 12.1389 23.3334 11.6667V6.66666H10.0001V33.3333ZM10.0001 6.66666V13.3333V6.66666V33.3333V6.66666ZM20.0001 31.6667C21.8612 31.6667 23.4379 31.0139 24.7301 29.7083C26.0212 28.4028 26.6667 26.8333 26.6667 25V20C26.6667 19.5278 26.5073 19.1317 26.1884 18.8117C25.8684 18.4928 25.4723 18.3333 25.0001 18.3333C24.5279 18.3333 24.1323 18.4928 23.8134 18.8117C23.4934 19.1317 23.3334 19.5278 23.3334 20V25C23.3334 25.9167 23.014 26.7017 22.3751 27.355C21.7362 28.0072 20.9445 28.3333 20.0001 28.3333C19.0834 28.3333 18.299 28.0072 17.6467 27.355C16.9934 26.7017 16.6667 25.9167 16.6667 25V15.8333C16.6667 15.5833 16.7501 15.3817 16.9167 15.2283C17.0834 15.0761 17.2779 15 17.5001 15C17.7501 15 17.9517 15.0761 18.1051 15.2283C18.2573 15.3817 18.3334 15.5833 18.3334 15.8333V23.3333C18.3334 23.8056 18.4934 24.2011 18.8134 24.52C19.1323 24.84 19.5279 25 20.0001 25C20.4723 25 20.8684 24.84 21.1884 24.52C21.5073 24.2011 21.6667 23.8056 21.6667 23.3333V15.8333C21.6667 14.6667 21.264 13.6806 20.4584 12.875C19.6529 12.0694 18.6667 11.6667 17.5001 11.6667C16.3334 11.6667 15.3473 12.0694 14.5417 12.875C13.7362 13.6806 13.3334 14.6667 13.3334 15.8333V25C13.3334 26.8333 13.9862 28.4028 15.2917 29.7083C16.5973 31.0139 18.1667 31.6667 20.0001 31.6667Z" fill="#95A4AD"/>
                </g>
                <defs>
                  <clipPath id="clip0_252_1045">
                    <rect width="40" height="40" fill="white"/>
                  </clipPath>
                </defs>
              </svg> 
              {dragging ? <div className="drag-overlay">Drop the file here</div> : <div>Drag and drop your file here </div>}
                or<br/>
              <div className="file-input-container">
                <input
                  type="file"
                  id="file-upload"
                  accept=".pdf, .docx, .doc, .Pdf, .DOCX, .DOC"
                  ref={fileInputRef}
                  multiple onChange={handleFileChange} 
                  className="file-input"
                />
                <label onClick={openFileDialog} className="choose-file-button">
                  Choose Files 
                </label>
              </div>
            </div>
        </div>  ):(
          <>
          <div className='addfiles-container'>
                <div className='subcontainer1'>
                  <div className='file-count'>
                  {files.length > 1 ? <div>{files.length} files selected</div> : <div>{files.length} file selected</div>}
                  </div>
                  <div className='file-list1'>
                  <th className='file-item-header'>
                    <td>File Name</td>
                    <td>Size</td>
                  </th>
                  {files.map((file, index) => (
                    <tr key={index} className='file-item1'>
                      <td>{file.name}</td>
                      <td>{formatFileSize(file.size)}</td>
                    </tr>
                  ))}
                  </div>
                  
                  <div className='file-upload-button-container'>
                    <button className='choose-file-button validate' onClick={handleUpload}>Validate and upload </button>
                  </div>
                </div>
                <div className='subcontainer2'>
                  <div 
                    className='file-upload-container'
                    style={{marginTop : '10%', marginBottom:'10%'}}
                    onDragEnter={handleDragIn}
                    onDragLeave={handleDragOut}
                    onDragOver={handleDragIn}
                    onDrop={handleDrop}
                  >
                  <div className="file-upload smaller">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                      <g clip-path="url(#clip0_252_1045)">
                        <path d="M10.0001 36.6667C9.08341 36.6667 8.29897 36.3406 7.64675 35.6883C6.99341 35.035 6.66675 34.25 6.66675 33.3333V6.66666C6.66675 5.74999 6.99341 4.96499 7.64675 4.31166C8.29897 3.65944 9.08341 3.33333 10.0001 3.33333H23.6251C24.0695 3.33333 24.4934 3.41666 24.8967 3.58333C25.299 3.75 25.6529 3.98611 25.9584 4.29166L32.3751 10.7083C32.6806 11.0139 32.9167 11.3678 33.0834 11.77C33.2501 12.1733 33.3334 12.5972 33.3334 13.0417V33.3333C33.3334 34.25 33.0073 35.035 32.3551 35.6883C31.7017 36.3406 30.9167 36.6667 30.0001 36.6667H10.0001ZM10.0001 33.3333H30.0001V13.3333H25.0001C24.5279 13.3333 24.1323 13.1739 23.8134 12.855C23.4934 12.535 23.3334 12.1389 23.3334 11.6667V6.66666H10.0001V33.3333ZM10.0001 6.66666V13.3333V6.66666V33.3333V6.66666ZM20.0001 31.6667C21.8612 31.6667 23.4379 31.0139 24.7301 29.7083C26.0212 28.4028 26.6667 26.8333 26.6667 25V20C26.6667 19.5278 26.5073 19.1317 26.1884 18.8117C25.8684 18.4928 25.4723 18.3333 25.0001 18.3333C24.5279 18.3333 24.1323 18.4928 23.8134 18.8117C23.4934 19.1317 23.3334 19.5278 23.3334 20V25C23.3334 25.9167 23.014 26.7017 22.3751 27.355C21.7362 28.0072 20.9445 28.3333 20.0001 28.3333C19.0834 28.3333 18.299 28.0072 17.6467 27.355C16.9934 26.7017 16.6667 25.9167 16.6667 25V15.8333C16.6667 15.5833 16.7501 15.3817 16.9167 15.2283C17.0834 15.0761 17.2779 15 17.5001 15C17.7501 15 17.9517 15.0761 18.1051 15.2283C18.2573 15.3817 18.3334 15.5833 18.3334 15.8333V23.3333C18.3334 23.8056 18.4934 24.2011 18.8134 24.52C19.1323 24.84 19.5279 25 20.0001 25C20.4723 25 20.8684 24.84 21.1884 24.52C21.5073 24.2011 21.6667 23.8056 21.6667 23.3333V15.8333C21.6667 14.6667 21.264 13.6806 20.4584 12.875C19.6529 12.0694 18.6667 11.6667 17.5001 11.6667C16.3334 11.6667 15.3473 12.0694 14.5417 12.875C13.7362 13.6806 13.3334 14.6667 13.3334 15.8333V25C13.3334 26.8333 13.9862 28.4028 15.2917 29.7083C16.5973 31.0139 18.1667 31.6667 20.0001 31.6667Z" fill="#95A4AD"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_252_1045">
                          <rect width="40" height="40" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg> 
                    {dragging ? <div className="drag-overlay">Drop the file here</div> : <div>Drag and drop your file here </div>}
                      or<br/>
                    <div className="file-input-container">
                      <input
                        type="file"
                        id="file-upload"
                        accept=".pdf, .docx, .doc, .Pdf, .DOCX, .DOC"
                        ref={fileInputRef}
                        multiple onChange={handleFileChange} 
                        className="file-input"
                      />
                      <label onClick={openFileDialog} className="choose-file-button right-align">
                        Add more files
                      </label>
                    </div>
                  </div>
                </div>
                </div>
              </div>
          </>
        )}
        </ModalBody>
      </ModalContent>
    </ModalBackdrop>
  );
};


const MainSection = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [files, setFiles] = useState([]);
  const [loading,setLoading] =useState(false);
  const [selectedOption, setSelectedOption] = useState('Google');

  const handleUpload = async() =>{
    closeModal();
    if(!files.length){alert("No Files Selected"); return};
        console.log("Sending:",files);
        const formData=new FormData();
        files.forEach((file)=>{
            formData.append('files',file);
        });
        if(selectedOption === "Mistral AI"){
        formData.append('model', "MISTRA");}
        else if(selectedOption === "Google"){
            formData.append('model',"GOOGLE");
        }
        console.log("SENDING:",formData);
        try{
            setLoading(true);
            const response = await axios.post('http://127.0.0.1:8000/upload_files',formData,{
                headers:{
                    'Content-Type':'multipart/form-data',
                },
            });
            console.log("Message",response.data.message ,"Files:",response.data.filenames) ;
            navigate('/page',{state: {pdfFiles: files}});
        }
        catch (error){
            alert("Error Uploading Files. Please try again");
            console.error('Error Uploading Files',error);
        } finally{
            setLoading(false);
        }
  }

  return (
    <>
    {loading && <LoadingScreen/>}
    <HeaderContainer> 
      <Logo>
       DocBuddy
      </Logo>
      
    <AboutButton className='about' onClick={()=> navigate("/about")}>
    {/* <img src='hanging.png' className='hanging'></img> */}
      ABOUT</AboutButton>
    </HeaderContainer>
    <MainContainer>
      <TextContainer>
        <Title><TypingText text='Talking to docs'/></Title>
        <Subtitle>has never been this easy</Subtitle>
      </TextContainer>
      
      <ImageContainer>
        <DescriptionDesktop>
        Experience the unparalleled convenience and power of interacting with your documents. Whether you're a professional, student, or researcher, our platform boosts productivity and simplifies document management. Choose from <div className='bluetext'>Bimodular AI</div> options for a customized, efficient, and fun document interaction experience.
        </DescriptionDesktop>
        <DescriptionMobile>
        Experience the unparalleled convenience and power of interacting with your documents. Choose from <div className='bluetext'>Bimodular AI</div> options for a customized, efficient, and fun document interaction experience.
        </DescriptionMobile>
        <CallToAction>
          <Button onClick={openModal}>
          <Text>Upload Files</Text>
          <ProfileImages className='profile-images'>
            <ProfileImage src="pdf.png" alt="Profile 1" />
            <ProfileImage src="docs.png" alt="Profile 2" />
          </ProfileImages>
          </Button>
        </CallToAction>
        <ToggleButtonContainer>
          <ToggleOption
            selected={selectedOption === 'Google'}
            onClick={() => setSelectedOption('Google')}
          >
            Google
          </ToggleOption>
          <ToggleOption
            selected={selectedOption === 'Mistral AI'}
            onClick={() => setSelectedOption('Mistral AI')}
          >
            Mistral AI
          </ToggleOption>
        </ToggleButtonContainer>
        <div className='model-text' >Choose Model</div>
      </ImageContainer>
    </MainContainer>
      {isModalOpen && (
        <Modal title="Upload your files here" handleUpload={handleUpload} files={files} setFiles ={setFiles} onClose={closeModal}>
          <p>This is a responsive modal example using styled-components.</p>
        </Modal>
      )}
    </>
  );
};

export default MainSection;
