import React, {Component} from 'react';
import Edit from '../Edit/Edit';
import {duration} from "moment";
import {connect} from 'react-redux';
import {DragSource} from 'react-dnd';
import {ItemTypes} from '../constants';

const elementSource = {
	beginDrag(props) {
		return {};
	},
	endDrag(props, monitor, component) {
		return {};
	}
};

function collect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging       : monitor.isDragging()
	};
}

class Element extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id           : this.props.elementID,
			name         : `#${this.props.elementID}`,
			responsible  : 'John Doe',
			timeToExecute: duration('1:30:00'),
			isOpen       : false
		};

		this.toggleOpen = this.toggleOpen.bind(this);
		this.changeData = this.changeData.bind(this);

	}

	render() {
		const {connectDragSource, isDragging} = this.props;

		return connectDragSource(
			<div className='element'>
				<i className="fas fa-server"
				   onClick={() => this.toggleOpen()}>
				</i>
				<Edit name={this.state.name}
					  responsible={this.state.responsible}
					  time={this.state.timeToExecute}
					  isOpen={this.state.isOpen}
					  onClose={this.toggleOpen}
					  changeData={this.changeData}/>
			</div>);
	}

	componentDidMount() {
		const {id, timeToExecute} = this.state;

		this.props.addTime({id, timeToExecute});
	}

	toggleOpen() {
		this.setState({isOpen: !this.state.isOpen});
	}

	changeData(name, resp, time) {
		this.setState({
			name         : name,
			resp         : resp,
			timeToExecute: duration(time)
		});

		this.props.changeTime(this.state.id, duration(time));
		this.toggleOpen();
	}

}

Element = DragSource(ItemTypes.ELEMENT, elementSource, collect)(Element);

export default connect((state) => state, null)(Element);