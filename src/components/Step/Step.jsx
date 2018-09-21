import React, {Component} from 'react';
import Element from '../Element/Element';
import {connect} from 'react-redux';
import {addElement} from '../../ducks/element_reducer';

class Step extends Component {
	constructor(props) {
		super(props);
		this.state = {
			elements: []
		};
	}

	render() {
		const elements = this.state.elements.map((element, i) => (
			<Element key={i}
					 addTime={this.props.addTime}
					 changeTime={this.props.changeTime}/>
		));

		return (
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
								  onClick={() => this.addElement()}>
						</button>
					}
				</section>
			</div>
		);
	}

	addElement() {
		const {elements} = this.state;
		this.props.addElement();
		this.setState({elements: [...elements, elements.length]});
	}

}

export default connect((state) => state, {addElement})(Step);