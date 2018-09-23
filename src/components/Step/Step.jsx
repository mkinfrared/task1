import React, {Component} from 'react';
import Element from '../Element/Element';
import {connect} from 'react-redux';
import {addElement} from '../../ducks/element_reducer';
import {DropTarget} from 'react-dnd';
import {ItemTypes} from "../constants";

const stepDropSource = {
	drop(props, monitor) {
		return {newPath: props.path};
	},
};

function collect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		hovered          : monitor.isOver(),
		item             : monitor.getItem(),
		dropResult       : monitor.getDropResult()
	};
}

class Step extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {
				  store, path, addElement,
				  connectDropTarget, hovered, item, dropResult
			  } = this.props;

		const [...keys] = store.getIn(path).keys();

		const elements = keys.map((key) => store.getIn([...path, key]).toJS())
							 .map((elem) => (
								 <Element key={elem.id}
										  path={[...path, `elem${elem.id}`]}
										  id={elem.id}
										  addTime={this.props.addTime}
										  changeTime={this.props.changeTime}/>
							 ));

		// const elems = Object.entries(store.getIn(path).toJS());
		//
		// const elements = elems.map((e, i) => {
		// 	return <Element key={i}
		// 					path={[...path, e[0]]}
		// 					id={e[1].id}
		// 					addTime={this.props.addTime}
		// 					changeTime={this.props.changeTime}/>
		// });

		return connectDropTarget(
			<div className='step'>
				<hr/>
				<section>
					<button>
						Шаг №{this.props.num + 1}
					</button>
					{elements}
					{(elements.length === 3)
					 ? null
					 : <button className='add-button'
							   onClick={() => addElement(path)}>
					 </button>
					}
				</section>
			</div>
		);
	}

}

Step = DropTarget(ItemTypes.ELEMENT, stepDropSource, collect)(Step);

export default connect((state) => ({store: state}), {addElement})(Step);