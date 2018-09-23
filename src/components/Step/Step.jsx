import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import Element from '../Element/Element';
import StepDrop from '../StepDrop/StepDrop';
import {connect} from 'react-redux';
import {addElement} from '../../ducks/element_reducer';
import {DropTarget, DragSource} from 'react-dnd';
import {ItemTypes} from "../constants";
import flow from 'lodash/flow';

const stepSource = {
	beginDrag(props) {
		console.log(props);
		return {
			id   : props.id,
			index: props.num
		}
	}
};

const stepTarget = {
	hover(props, monitor, component) {
		if (!component) {
			return null
		}
		const dragIndex  = monitor.getItem().index;
		const hoverIndex = props.index;

		if (dragIndex === hoverIndex) {
			return
		}

		const hoverBoundingRect = (findDOMNode(
			component,
		)).getBoundingClientRect();

		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

		const clientOffset = monitor.getClientOffset();

		const hoverClientY = (clientOffset).y - hoverBoundingRect.top;

		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
			return;
		}

		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			return;
		}

		props.moveStep(dragIndex, hoverIndex);

		monitor.getItem().index = hoverIndex
	}
};

class Step extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {
				  store, path, addElement,
				  connectDropTarget, hovered,
				  connectDragSource, item, dropResult
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

		return connectDragSource(connectDropTarget(
			<div className='step'>
				<hr/>
				<section>
					<button>
						Шаг №{this.props.num + 1}
					</button>
					<StepDrop path={path}>
						{elements}
					</StepDrop>
					{(elements.length === 3)
					 ? null
					 : <button className='add-button'
							   onClick={() => this.props.addElement(path)}>
					 </button>
					}
				</section>
			</div>
		));
	}

}

Step = flow(
	DragSource(
		ItemTypes.STEP,
		stepSource,
		(connect, monitor) => ({
			connectDragSource: connect.dragSource(),
			isDragging       : monitor.isDragging()
		}),
	),
	DropTarget(ItemTypes.STEP, stepTarget, (connect) => ({
		connectDropTarget: connect.dropTarget()
	}))
)(Step);

export default connect((state) => ({store: state}), {addElement})(Step);