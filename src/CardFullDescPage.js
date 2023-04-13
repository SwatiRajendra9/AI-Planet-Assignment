import React from "react";
import './App.css';
import logo from './logo.png'
import dateimg from './date.png'
import star from './star.png'
import selectStar from './selectStar.png'
import line from './line.png'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Github from '@mui/icons-material/GitHub';
import OtherLink from '@mui/icons-material/OpenInNew';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

var months = ["January","February","March","April","May","June",
"July","August","September","October","November","December"]

function CardFullDescPage(props) {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return(
		<div id='CardFullDescPage-main-div'>
			<div id='logo-div'>
				<img id='logo' src={logo} alt='ai-planet-logo' onClick={()=>screenChangeHomePage('HomePage')}></img>
				<div id='blank-div-1'></div>
				<div id='blank-div-2'></div>
			</div>

			<div>
				<div id='card-desc-div'>
					<div id='card-desc-img-title-buttons'>
						<div id='card-desc-img-title'>
							<img id='card-desc-img' src={props.card.img}></img>
							<h1 id='card-desc-title'>{props.card.title}</h1>
						</div>
							<div id='edit-delete'>
							<Button 
									onClick={setIndexAndScreen}
									variant="outlined" 
									startIcon={<EditIcon/>}
									sx={{
										width: "120px",
										height: "35px",
										color: "#FFFFFF",
										borderColor: '#FFFFFF',
										borderRadius: "8px",
										fontSize: "17px",
										textTransform: 'none'
									}}>
									<span>Edit</span>
								</Button>
								<Button 
									onClick={handleOpen} 
									variant="outlined" 
									startIcon={<DeleteIcon/>} 
									sx={{
											width: "120px",
											color: "#FFFFFF",
											borderColor: '#FFFFFF',
											borderRadius: "8px",
											fontSize: "17px",
											textTransform: 'none',
											height: "35px"
										}} >
									<span>Delete</span>
								</Button>
								<Modal 
										id='model-del'
										open={open}
										aria-labelledby="modal-modal-title"
										aria-describedby="modal-modal-description"
									>
										<Box id='model-box'>
											<Typography id="modal-modal-title" variant="h6" component="h2">
												Delete Model
											</Typography>
											<Typography id="modal-modal-description">
												This action is irreversible. Are you sure you want to delete this model?
											</Typography>
											<div id='cancel-delete-button'>
												<button id='cancel-del' onClick={handleClose}>Cancel</button>
												<button id='hard-del' onClick={deleteCard}>Delete</button>
											</div>
										</Box>
									</Modal>
							</div>
							
					</div>
					<h6 id='card-desc-desc'>{props.card.summary}</h6>
					<div id='star-date'>
						<img 
							src={props.card.isStar ? selectStar: star} 
							style={{height: "16.5px", width: "15px", marginRight: "5px"}}
							onClick={props.makeFavourite}/>
						<img id='date' src={line} style={{height: "16.5px", width: "2px", marginLeft: "15px"}}/>
						<div id='dateComp'>
							<img id='date' src={dateimg} style={{height: "16.5px", width: "15px", marginRight: "15px"}}/>
							<p style={{color:"#F5F5F5", fontSize:"14px", margin:"0"}}>
								{`${new Date(props.card.uploadTime).getDate()} 
								${months[new Date(props.card.uploadTime).getMonth()]}`}
							</p>
						</div>
					</div>
				</div>
				<div>
				
				</div>
			</div>

			<div id='card-desc-fulldesc'>
				<div id='heading-desc-div'>
					<div id='heading'>Description</div>
					<div id='fulldesc'>
						<p>{props.card.desc}</p>
					</div>
				</div>
				<div id='hackathon-details-div'>
					<h6 style={{color: "#858585", fontSize: "17px", margin: "0 0 15px"}}>Hackathon</h6>
					<h5 style={{color: "#333333", fontSize: "20px", margin: "0 0 15px"}}>{props.card.hackathonname}</h5>
					<div id='date-range' style={{margin: "0 0 60px"}}>
						<img id='date' src={dateimg} style={{height: "16.5px", width: "15px", marginRight: "5px"}}/>
						<p style={{margin: "0", fontSize: "14px", color:"#858585"}}>{new Date(props.card.startDate).toLocaleDateString()} - {new Date(props.card.endDate).toLocaleDateString()}</p>
					</div>
					<Button
						variant="outlined" 
						startIcon={<Github/>} 
						sx={{
								width: "213px",
								color: "#666666",
								borderColor: '#666666',
								borderRadius: "8px",
								fontSize: "17px",
								textTransform: 'none',
								height: "35px",
								marginBottom: "10px",
								textDecoration: 'none'
							}} >
						<a href={props.card.githubrep} class="detailLinks" style={{}}>Github Repository</a>
					</Button>
					<Button 
						variant="outlined" 
						startIcon={<OtherLink/>}
						sx={{
							width: "213px",
							height: "35px",
							color: "#666666",
							borderColor: '#666666',
							borderRadius: "8px",
							fontSize: "17px",
							textTransform: 'none'
						}}>
						<a href={props.card.githubrep} class="detailLinks" style={{color: "#666666"}}>Other Link</a>
					</Button>
				</div>
			</div>

		</div>     
		
	)

	function screenChangeHomePage(page) {
		props.changeScreenMode(page);
	}

	function setIndexAndScreen() {
		props.setIndexAndScreen('EditPage', props.card.index)
	}

	function deleteCard() {
		props.changeScreenMode('HomePage');
		props.deleteCard();
	}
}

export default CardFullDescPage;