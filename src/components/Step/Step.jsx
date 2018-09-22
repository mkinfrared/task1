import React, {Component} from 'react';
import Element from '../Element/Element';
import {connect} from 'react-redux';
import {addElement} from '../../ducks/element_reducer';

class Step extends Component {
	render() {
		const {store, path, addElement} = this.props;

		const [...keys] = store.getIn(path);
		const elems = Object.entries(store.getIn(path).toJS());

		const num = keys.length;

		const elements = elems.map((e, i) => {
			return <Element key={i}
							path={[...path, e[0]]}
							id={e[1].id}
							addTime={this.props.addTime}
							changeTime={this.props.changeTime}/>
		});

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
								  onClick={() => addElement(path, num)}>
						</button>
					}
				</section>
			</div>
		);
	}

}

export default connect((state) => ({store: state}), {addElement})(Step);