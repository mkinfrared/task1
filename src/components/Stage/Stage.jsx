import React, {Component} from 'react';
import ToggleButton from '../ToggleButton/ToggleButton';
import Step from '../Step/Step';
import {duration} from 'moment';
import {connect} from 'react-redux';
import {addStep} from '../../ducks/element_reducer';

class Stage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
		};
	}

	render() {
		const {store, path, addStep} = this.props;

		const [...keys] = store.get(path).keys();

		const stepNames = Object.keys(store.get(path).toJS());
		const time        = stepNames.map((name) => store.getIn([path, name]).toJS())
								   .map((e) => {
									   let obj = Object.entries(e);
									   if (obj[0]) {
										   return obj.map((e) => {
											   return e[1].time;
										   });
									   }
								   })
								   .flat()
								   .reduce((acc, cv) => acc.add(cv), duration(0));

		const steps = keys.map((step, i) => (
			<Step key={i}
				  num={i}
				  path={[path, step]}/>
		));

		const num = keys.length;

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
							onClick={() => addStep([path], num)}>
					</button>
					<p>Добавить шаг</p>
				</section>
			</div>
		);
	}

}

export default connect((state) => ({store: state}), {addStep})(Stage);