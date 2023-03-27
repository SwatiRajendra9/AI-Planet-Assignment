import React, { useState } from "react";
import './App.css';
import logo from './logo.png';
import bulb from './bulb.png'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Tabs, Tab, TextField } from "@mui/material";

function TabPanel(props) {
	const { children, value, index, cardArray, screenChangeCardDesc, ...other } = props;

	function getTimeSince(timeDiff, element) {
		var days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
		var hours = Math.floor(timeDiff / (1000 * 60 * 60))
		var mins = Math.floor(timeDiff / (1000 * 60))
		var secs = Math.floor(timeDiff / (1000))

		if (days > 0) {
			return `uploaded ${days} days ago`
		} else if (hours > 0) {
			return `uploaded ${hours} hours ago`
		} else if (mins > 0) {
			return `uploaded ${mins} minutes ago`
		} else if (secs > 0) {
			return `uploaded ${secs} seconds ago`
		} else  {
			return `uploaded just seconds now`
		}
	}

	return (
	  <div
		role="tabpanel"
		id='cards'
		style={{ display: (value === index ? 'block' : 'none') }}
		{...other}>
		<div id='cards'>
		{
			
			cardArray.map((element,index)=>{
				return(
					<div id='card' onClick={() => screenChangeCardDesc(element.index)} hidden={value !== index}>
						<div id='img-title'>
							<img id='card-img' src={element.img}></img>
							<h5 id='card-title' hidden={value !== index}>{element.title}</h5>
						</div>
						<div id='card-desc' >{element.desc}</div>
						<div id='card-stats'>
							<p>{getTimeSince(new Date() - new Date(element.uploadTime), element)}</p>
						</div>
					</div>
				)
			})
		}
		</div> 
	  </div>
	);
  }

function HomePage(props) {

	var cardArray = props.cardArray;

	const [value, setValue] = React.useState(0);
	const [searchTerm, setSearchTerm] = React.useState("");
	const [sort, setSort] = React.useState("Newest");

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	function filterAndSortCards(onlyFavourite) {
		var cardsFiltered = onlyFavourite ? cardArray.filter(card => card.isStar) : cardArray
		var cardArrayFltrd = cardsFiltered.filter(card => card.title.toLowerCase().search(searchTerm)!==-1);
		var cardArraySorted = cardArrayFltrd.sort((card) => Date.parse(card.startDate))
		return sort === 'Newest' ? cardArraySorted.reverse() : cardArraySorted;
	}
	
	return(
		<div id='main'>
			<div id='logo-div'>
				<img id='logo' src={logo} alt='ai-planet-logo'></img>
				<div id='blank-div-1'></div>
				<div id='blank-div-2'></div>
			</div>
			<div id='hackathon-submission-div'>
				<div id='hackathon-submission-desc'>
					<h1 id='homepage-title'>Hackathon Submissions</h1>
					<h6 id='submission-desc'>
						Lorem ipsum dolor sit amet consectetur. 
						Urna cursus amet pellentesque in parturient purus feugiat faucibus. 
						Congue laoreet duis porta turpis eget suspendisse ac pharetra amet. 
						Vel nisl tempus nec vitae. 
					</h6>
					<button id='upload-submission-button1' onClick={() => props.setIndexAndScreen('UploadForm', -1)}>Upload Submission</button>
				</div>
				<img id='bulb-img' src={bulb} alt="hand-holding-bulb"></img>
			</div>

			<div id='submissions-div'>
				<div id='tabs-search-filter'>
					<div id='tab-div'>
						<Tabs 
							value={value} 
							onChange={handleChange}  
							TabIndicatorProps={{
								style: {
									backgroundColor: "#44924C",
									height: "5px"
								}
							}}>
							<Tab label={<span style={{ color: value == 0 ? '#333333' : '#666666', textTransform: 'none', fontSize: '17px' }}>All Submissions</span>} />
							<Tab label={<span style={{ color: value == 1 ? '#333333' : '#666666', textTransform: 'none', fontSize: '17px' }}>Favourite Submissions</span>} />
						</Tabs>
						<TabPanel value={value} index={0} cardArray={filterAndSortCards()} screenChangeCardDesc={screenChangeCardDesc}/>
						<TabPanel value={value} index={1} cardArray={filterAndSortCards(true)} screenChangeCardDesc={screenChangeCardDesc}/>
					</div>
					<div id='search-filter-div'>
						<TextField id="search" variant="outlined" placeholder="Search" onChange={(e) => (setSearchTerm(e.target.value.toLowerCase()))}/>
						<Select id="filter" value={sort} onChange={(e) => (setSort(e.target.value))}>
							<MenuItem value={"Newest"}>Newest</MenuItem>
							<MenuItem value={"Oldest"}>Oldest</MenuItem>
						</Select>
					</div>
				</div>
			</div>
		</div>
	)

	function screenChangeCardDesc(index) {
		props.changeCurrentProjectIndex(index)
		props.changeScreenMode('CardFullDescPage');

	}

}


export default HomePage;