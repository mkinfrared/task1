import React, {Component} from 'react';
import Start from './components/Start/Start';
import Constructor from './components/Constructor/Constructor';

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

export default App;