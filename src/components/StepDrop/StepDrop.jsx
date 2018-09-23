import React, {Component} from 'react';
import {DropTarget} from "react-dnd";
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

class StepDrop extends Component {
	constructor(props) {
		super(props);
	}


	render() {
		const {connectDropTarget} = this.props;

		const style = {
			display: 'inline-block',
			width  : '108px',
			height : '40px',
			outline: '1px solid green'
		};

		return connectDropTarget(
			<section className='step-drop'>
				{this.props.children}
			</section>
		);
	}

}

export default DropTarget(ItemTypes.ELEMENT, stepDropSource, collect)(StepDrop);

// export default StepDrop;