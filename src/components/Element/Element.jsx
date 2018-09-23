import React, {Component} from 'react';
import Edit from '../Edit/Edit';
import {connect} from 'react-redux';
import {moveElem} from '../../ducks/element_reducer';
import {DragSource} from 'react-dnd';
import {ItemTypes} from '../constants';

const elementSource = {
	beginDrag(props) {
		return {};
	},
	endDrag(props, monitor, component) {
		if (!monitor.didDrop()) {
			return;
		}
		const {path, store} = props;
		const elemData      = store.getIn(path).toJS();

		let {newPath} = monitor.getDropResult();
		newPath       = [...newPath, path[path.length - 1]];

		props.moveElem(path, newPath, elemData);
	}
};

function collect(connect, monitor) {
	return {
		connectDragSource : connect.dragSource(),
		connectDragPreview: connect.dragPreview(),
		isDragging        : monitor.isDragging(),
		newPath           : monitor.getDropResult(),
		didDrop           : monitor.didDrop()
	};
}

class Element extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false
		};

		this.toggleOpen = this.toggleOpen.bind(this);

	}

	render() {
		const {path, store, connectDragSource, isDragging} = this.props;

		const opacity = isDragging ? 0 : 1;

		const name = store.getIn(path).toJS().name;
		console.log(name);

		if (this.state.isOpen) {
			return (
				<div className='element'
					 style={{opacity}}>
					<i className="fas fa-server"
					   onClick={() => this.toggleOpen()}>
					</i>
					<p>{name}</p>
					<Edit isOpen={this.state.isOpen}
						  onClose={this.toggleOpen}
						  toggleOpen={this.toggleOpen}
						  path={path}/>
				</div>);
		} else {
			return connectDragSource(
				<div className='element'
					 style={{opacity}}>
					<i className="fas fa-server"
					   onClick={() => this.toggleOpen()}>
					</i>
					<p>{name}</p>
				</div>);
		}
	}

	toggleOpen() {
		this.setState({isOpen: !this.state.isOpen});
	}

}

Element = DragSource(ItemTypes.ELEMENT, elementSource, collect)(Element);

export default connect((state) => ({store: state}), {moveElem})(Element);