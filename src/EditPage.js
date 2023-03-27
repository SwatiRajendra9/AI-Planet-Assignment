import React from "react";
import './App.css';
import logo from './logo.png';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import addphoto from './add-photo-alternate.png';
import reuplod from './reupload.png'

import { useState, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";

function EditPage(props) {
    const [imagePreview, setImagePreview] = useState('no_preview');
    const [image, setImage] = useState('');

    return(
        <div id='UploadForm-main-div'>
            <div id='logo-div'>
              <img id='logo' src={logo} alt='ai-planet-logo' onClick={screenChangeHomePage}></img>
              <div id='blank-div-1'></div>
              <div id='blank-div-2'></div>
            </div>

            <form id='form'>
                <div id='form-elements'>
                    <h1>Edit Hackathon Submission</h1> 
                    <div id='item1'>
                        <h4 id='form-headings'>Title</h4>
                        <TextField required id="title" variant="outlined" placeholder='Title of your submission' defaultValue={props.card.title} onChange={(e) => (props.card.title=e.target.value)}></TextField>
                    </div>
                    
                    <div id='item2'>
                        <h4 id='form-headings'>Summary</h4>
                        <TextField required id="summary" variant="outlined" placeholder='A short summary of your submission (this will be visible with your submission)' defaultValue={props.card.summary} onChange={(e) => (props.card.summary=e.target.value)} ></TextField>
                    </div>

                    <div id='item3'>
                        <h4 id='form-headings'>Description</h4>
                        <TextField required id="desc" variant="outlined" placeholder='Write a long description of your project. You can describe your idea and approach here.' defaultValue={props.card.desc} onChange={(e) => (props.card.desc=e.target.value) }></TextField>
                        <h5 id='minimum-char'>0/3,000 characters</h5>
                    </div>

                    <div id='item4'>
                        <h4 id='form-headings'>Cover Image</h4>
                        <h4 id='minimumres'>Minimum Resolution: 360px X 360px</h4>
                        {imagePreview === 'preview' ?
                            <label variant="contained" component="label">    
                            <div id='cover-img-preview'>
                                <div id='preview-img-div'>
                                    <img id='card-img' src={props.card.img}/>
                                    <p>{props.card.imgName}</p>
                                </div>
                                
                                <label>
                                <div id='reupload-div'>
                                <input required hidden accept="image/*" multiple type="file" onChange={(e) => onImageUpload(e)}/>
                                    <p id='reupload'>Reupload</p>
                                    <img id='card-img-reupload' src={reuplod}/>
                                </div>
                                </label>
                            </div> 
                            </label>
                        :                
                            <label variant="contained" component="label">
                                <div id='coverimg'>
                                    <input required hidden accept="image/*" multiple type="file" onChange={(e) => onImageUpload(e)}/>
                                    <img id='add-image-icon' src={addphoto} ></img>
                                </div>    
                            </label>
                        }
                    </div>

                    <div id='item5'>
                        <h4 id='form-headings'>Hackathon Name</h4>
                        <TextField required id="hackathon-name" placeholder='Enter the name of the hackathon' defaultValue={props.card.hackathonname} variant="outlined" onChange={(e) => (props.card.hackathonname=e.target.value) }></TextField>
                    </div>

                    <div id='item6'>
                        
                        <h4>Hackathon Start Date</h4>
                        <LocalizationProvider dateAdapter={AdapterDayjs}> 
                            <DatePicker required 
                            label="Select start date" 
                            defaultValue={dayjs(new Date(props.card.startDate))}
                            onChange={(value) => (props.card.startDate=value.format())}/> 
                        </LocalizationProvider>
                        <h4>Hackathon End Date</h4>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker required
                              label="Select end date" 
                              defaultValue={dayjs(new Date(props.card.endDate))}
                              onChange={(value) => (props.card.endDate=value.format())}/>
                        </LocalizationProvider>
                    </div>

                    <div id='item7'>
                        <h4 id='form-headings'>Github Repository</h4>
                        <TextField required id="github-rep" variant="outlined" placeholder='Enter your submission’s public GitHub repository link' defaultValue={props.card.githubrep} onChange={(e) => (props.card.githubrep=e.target.value) }></TextField>
                    </div>

                    <div id='item8'>
                        <h4 id='form-headings'>Other Links</h4>
                        <TextField required id="other-links" variant="outlined" defaultValue={props.card.otherlink} placeholder='You can upload a video demo or URL of you demo app here.' onChange={(e) => (props.card.otherlink=e.target.value) }></TextField>
                    </div>
                    <button id='upload' 
                        onClick={() => {
                            if (
                                (props.card.githubrep.indexOf("http://") == 0 || props.card.githubrep.indexOf("https://") == 0)
                                && (props.card.otherlink.indexOf("http://") == 0 || props.card.otherlink.indexOf("https://") == 0) 
                                && props.card.title.length>0 && props.card.summary.length>0 && props.card.desc.length>0 && 
                                props.card.hackathonname.length>0 && props.card.startDate.length>0 && props.card.endDate.length>0
                                ) {
                                    screenChangeAfterSubmit();
                                }
                            else {
                                alert('Please enter a url starting with http:// or https://');
                            }
                            
                        }
                        }>Save Submission</button> 

                </div> 
            </form>
        </div>
    )

    function screenChangeHomePage() {
        props.changeScreenMode('HomePage');
    }

    function screenChangeAfterSubmit() {
        props.updateCardArray(props.card);
        props.changeScreenMode('HomePage');
    }

    function onImageUpload(event) {
        var reader = new FileReader();
        reader.onloadend = function() {
            props.card.img=reader.result
            setImagePreview('preview')
            setImage(props.card.img)
        }
        var file = event.target.files[0];
        props.card.imgName=file.name;
        reader.readAsDataURL(file);
    }

}

export default EditPage;