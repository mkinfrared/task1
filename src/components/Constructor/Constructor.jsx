import React, {Component} from 'react';
import Stage from '../Stage/Stage';

class Constructor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			stages: []
		};
	}

	render() {
		const num = this.state.stages.length;
		const stages = this.state.stages.map((stage, i) => (
			<Stage key={i}
				   num={i}/>
		));

		return (
			<div className='constructor'>
				{stages}
				<button className='add-button'
						onClick={() => this.addStage(num)}>
				</button>
				<p>Добавить этап</p>
			</div>
		);
	}

	addStage(num) {
		const {stages} = this.state;
		this.setState({stages: [...stages, `stage${num}`]});
	}

}

export default Constructor;