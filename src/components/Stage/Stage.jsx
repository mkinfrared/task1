import React, {Component} from 'react';
import ToggleButton from '../ToggleButton/ToggleButton';
import Step from '../Step/Step';
import {duration} from 'moment';
import {connect} from 'react-redux';
import {addStep} from '../../ducks/element_reducer';
import update from 'immutability-helper';

class Stage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			keys: []
		};

		this.moveStep = this.moveStep.bind(this);

	}

	render() {
		const {store, path, addStep} = this.props;

		const {keys} = this.state;
		console.log(keys);

		const steps = keys.map((step, i) => {
			const regEx = /[0-9]/;
			const index = step.search(regEx);
			const num   = parseInt(step.substring(index));
			console.log(num);
			return <Step key={i}
						 id={step}
						 num={num}
						 path={[path, step]}
						 moveStep={this.moveStep}/>
		});

		const time = this.calcTime(keys);
		const num  = keys.length;

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
				<section className='stage-section'>
					{steps}
					<button className='add-button'
							onClick={() => addStep([path], num)}>
					</button>
					<p>Добавить шаг</p>
				</section>
			</div>
		);
	}

	componentWillReceiveProps(nextProps) {
		const {path, store} = nextProps;

		const [...keys] = store.get(path).keys();

		this.setState({keys});

	}

	calcTime(array) {
		const {store, path} = this.props;
		const [...steps]    = store.get(path).keys();

		return array.map((key) => {
			if (store.hasIn([path, key])) {
				const [...arr] = store.getIn([path, key]).keys();
				return arr;
			}
		}).flat().map((key) => {
			return steps.map((name) => {
				if (store.hasIn([path, name, key])) {
					const [...value] = store.getIn([path, name, key]).values();
					return value[3];
				}
			});
		}).flat().reduce((acc, cv) => acc.add(cv), duration(0));
	}

	moveStep(oldIndex, newIndex) {
		let {keys} = this.state;
		let item = keys[oldIndex];

		this.setState(update(this.state, {
			keys: {
				$splice: [[oldIndex, 1], [newIndex, 0, item]]
			}
		}));
	}

}

export default connect((state) => ({store: state}), {addStep})(Stage);