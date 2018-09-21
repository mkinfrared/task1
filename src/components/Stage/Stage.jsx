import React, {Component} from 'react';
import ToggleButton from '../ToggleButton/ToggleButton';
import Step from '../Step/Step';
import {duration} from 'moment';

class Stage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open : false,
			steps: [],
			time : []
		};

		this.addTime    = this.addTime.bind(this);
		this.changeTime = this.changeTime.bind(this);
	}

	render() {
		const time = this.state.time.reduce((acc, cv) => acc.add(cv.timeToExecute), duration(0));

		const steps = this.state.steps.map((step, i) => (
			<Step key={i}
				  num={i}
				  stage={`stage${this.props.num}`}
				  addTime={this.addTime}
				  changeTime={this.changeTime}/>
		));

		const num = this.state.steps.length;

		return (
			<div className='stage'>
				<ToggleButton open={this.state.open}/>
				<button>
					Этап №{this.props.num + 1}
				</button>
				<button>
					{time.hours()}:
					{`${time.minutes()}`.padStart(2, '0')}:
					{`${time.seconds()}`.padStart(2, '0')}
				</button>
				<section>
					{steps}
					<button className='add-button'
							onClick={() => this.addStep(num)}>
					</button>
					<p>Добавить шаг</p>
				</section>
			</div>
		);
	}

	addStep(num) {
		const {steps} = this.state;
		this.setState({steps: [...steps, `step${num}`]});
	}

	addTime(obj) {
		const {time} = this.state;

		this.setState({time: [...time, obj]});
	}

	changeTime(id, tm) {
		console.log(id, tm);
		let {time} = this.state;

		time = time.map((elem) => {
			if (elem.id === id) {
				elem.timeToExecute = tm;
			}
			return elem;
		});

		this.setState({time});
	}

}

export default Stage;