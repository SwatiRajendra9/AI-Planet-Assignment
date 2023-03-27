import React, { useEffect } from "react";
import './App.css';
import HomePage from "./homepage.js";
import CardFullDescPage from "./CardFullDescPage.js";
import UploadForm from "./UploadForm.js";
import EditPage from "./EditPage.js";


class mainComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {'screenMode':'HomePage','cardArrayEmpty':'true', 'cardArray':[], currentProjectIndex:0}
	}

	componentDidMount() {
		if(localStorage.getItem("hackathonSubmissions2") !== null) {
			this.setState({cardArray: JSON.parse(localStorage.getItem("hackathonSubmissions2"))});
		}
	}

	makeFavourite = () => {
		var cardArrayCopy = [...this.state.cardArray]
		if (this.state.currentProjectIndex !== -1) {
			cardArrayCopy[this.state.currentProjectIndex].isStar = cardArrayCopy[this.state.currentProjectIndex].isStar ? false : true;
			this.setState({cardArray: cardArrayCopy})
			localStorage.setItem("hackathonSubmissions2", JSON.stringify(cardArrayCopy))
		}
	}

	changeScreenMode = (screen) => {
		this.setState({screenMode:screen})
	}

	updateCardArray = (card) => {	
		var cardArrayCopy = [...this.state.cardArray]
		cardArrayCopy[card.index] = card;
		this.setState({cardArray: cardArrayCopy})
		localStorage.setItem("hackathonSubmissions2", JSON.stringify(cardArrayCopy))
	}
	
	addToCardArray = (card) => {
		var cardArrayCopy = [...this.state.cardArray, {index: this.state.cardArray.length, ...card}]
		this.setState({cardArray: cardArrayCopy})
		localStorage.setItem("hackathonSubmissions2", JSON.stringify(cardArrayCopy))
	}

	changeCurrentProjectIndex = (clickProjectIndex) => {
		this.setState({currentProjectIndex: clickProjectIndex})
	}

	getCurrentProject = () => {
		if (this.state.currentProjectIndex != -1) {
			return this.state.cardArray[this.state.currentProjectIndex]
		}
	}

	deleteCard = () => {
		var cardArrayCopy = [...this.state.cardArray.slice(0, this.state.currentProjectIndex), 
			...this.state.cardArray.slice(this.state.currentProjectIndex + 1)]
		this.setState({cardArray: cardArrayCopy})
		localStorage.setItem("hackathonSubmissions2", JSON.stringify(cardArrayCopy))
	}

	setIndexAndScreen = (screen, index) => {
		this.setState({screenMode: screen, currentProjectIndex: index})
	}

	render() {
		if(this.state.screenMode === 'HomePage') {
			return( 
				<HomePage 
					changeScreenMode={this.changeScreenMode} 
					cardArray={this.state.cardArray} 
					setIndexAndScreen={this.setIndexAndScreen}
					changeCurrentProjectIndex={this.changeCurrentProjectIndex}/>
			)
		}
		else if(this.state.screenMode === 'CardFullDescPage') {
			return(
				<CardFullDescPage 
					changeScreenMode={this.changeScreenMode} 
					card={this.getCurrentProject()} 
					makeFavourite={this.makeFavourite}
					deleteCard={this.deleteCard}
                    setIndexAndScreen={this.setIndexAndScreen}
					/>    
			)
		}
        else if(this.state.screenMode === 'EditPage') {
			return(
				<EditPage
					updateCardArray={this.updateCardArray}
					changeScreenMode={this.changeScreenMode} 
					card={this.getCurrentProject()} />
			)
		}
		else if(this.state.screenMode === 'UploadForm') {
			return(
				<UploadForm 
					changeScreenMode = {this.changeScreenMode} 
					addToCardArray={this.addToCardArray} />
			)
		}
	}

}

export default mainComponent;