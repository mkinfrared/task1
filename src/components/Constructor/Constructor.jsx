import React, {Component} from 'react';
import Stage from '../Stage/Stage';
import {connect} from 'react-redux';
import {addStage} from '../../ducks/element_reducer';

class Constructor extends Component {
	render() {
		const {store, addStage} = this.props;

		const [...keys] = store.keys();

		const num = keys.length;

		const stages = keys.map((stage, i) => {
			return <Stage key={i}
						  num={i}
						  path={stage}/>
		});

		return (
			<div className='constructor'>
				{stages}
				<button className='add-button'
						onClick={() => addStage(num)}>
				</button>
				<p>Добавить этап</p>
			</div>
		);
	}

	componentWillReceiveProps(nextProps) {
		let {store} = nextProps;

		store = JSON.stringify(store.toJS());

		localStorage.setItem('process', store);
	}


}

export default connect((state) => ({store: state}), {addStage})(Constructor);