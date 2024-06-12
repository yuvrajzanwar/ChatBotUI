import React, { useCallback, useRef, useState } from 'react';
import style from '../styles/Files.module.css'
import '../styles/Navbar.module.css'
import axios from 'axios'
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Files =() =>{
    const navigate = useNavigate();
    const [pdfFiles,setPdFiles]=useState([]);
    const [drag,setDrag]=useState(false);
    const fileInputRef = useRef();
    
    const onDrop=useCallback(acceptedFiles=>{
        console.log("Setting Files",acceptedFiles);
        setDrag(true);
        setPdFiles((prevFiles)=>[...prevFiles,...acceptedFiles]);
        },[]);

    const {getRootProps,getInputProps,isDragActive} = useDropzone({onDrop
        ,accept:'.pdf',
        multiple:true,
    })

    const openFileDialog = () => {
        fileInputRef.current.click();
      };
    
    const handleFileUpload=(e)=>{
        const newFiles= Array.from(e.target.files);
        // setPdFiles(newFiles);
        console.log("FILES",newFiles);
        setPdFiles((prevFiles) => [...prevFiles, ...newFiles]);
        // handleOnSubmit([...newFiles]);
    };

    const handleOnSubmit = ()=>{
        console.log("Files:",pdfFiles);    
        // if(pdfFiles.length) return;
        console.log("Sending:",pdfFiles);
        // const formData=new FormData();
        // files.forEach((file)=>{
        //     formData.append('files',file);
        // });
        
        // try{
        //     const response = await axios.post('http://127.0.0.1:8000/upload_files',formData,{
        //         headers:{
        //             'Content-Type':'multipart/form-data',
        //         },
        //     });
        //     console.log("Message",response.data.message ,"Files:",response.data.filenames) ;
        // }
        // catch (error){
        //     console.error('Error Uploading Files',error);
        // }
        navigate('/page', {state: {pdfFiles: pdfFiles}});
    };

    return(
        <>
        <div className="App">
            <Navbar/>
            <div className='upload-div'>
                <div className={style.outBox}>
                    <div className={style.quote}>
                    <h2>Taking to docs never been eaiser</h2>
                    </div>

                <div className={style.inputDiv}>
                    
                    <div className={style.inputBox}>
                        <div {...getRootProps()} className={style.dragDropArea}>
                        <input {...getInputProps()} />
                        {
                            isDragActive ? (<p>Drop here...</p>) :
                            (
                            !pdfFiles.length>0 ? (<p>Drag 'n' Drop files here</p>) : (<p>Drag 'n' Drop more files here</p>) 
                        )
                        }
                        </div>
                    
                        <div className={style.fileUpload}>
                            <input type="file" 
                            name="pdfs" id="file-upload" accept='.pdf' multiple onChange={handleFileUpload}  className={style.fileUploadInput}
                            ref={fileInputRef}
                            />
                            <label onClick={openFileDialog} className={style.chooseFile}> <span> {!pdfFiles.length>0 ? 'Upload Files':'Upload More Files'}</span>
                            </label>
                        </div>
                        <p className={style.req}>*Kindly upload pdf files only</p>

                    
                    </div>        
            
                    {(pdfFiles.length>0) && 
                    (   <div className={style.displayFiles}>
                            <div className={style.selectedFileList}>
                                <p>Selected Files:</p>
                                <div className={style.listBg}>
                                <ol className={style.list}>
                                    {pdfFiles.map((file,index)=>(
                                        <li key={index}>{file.name}</li>
                                    ))}
                                </ol>
                                </div>
                            </div>
                            <div className={style.fileUpload}>
                            <label onClick={handleOnSubmit} className={style.chooseFile}><span>Submit</span></label>
                            </div>
                        </div>
                    ) }

                </div>
                </div>
            </div>
        </div>
        </>
        
    );
};
export default Files;