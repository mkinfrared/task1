import React, {Component} from 'react';
import Start from './components/Start/Start';
import Constructor from './components/Constructor/Constructor';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Start/>
				<Constructor/>
			</div>
		);
	}

}

export default DragDropContext(HTML5Backend)(App);