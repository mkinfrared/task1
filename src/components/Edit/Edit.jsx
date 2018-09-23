import React, {Component} from 'react';
import {duration} from 'moment';
import {connect} from 'react-redux';
import {editElem} from '../../ducks/element_reducer';

class Edit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id  : '',
			name: '',
			resp: '',
			h   : '',
			m   : '',
			s   : ''
		}
	}

	render() {
		const {id, name, resp, h, m, s} = this.state;

		const {path} = this.props;

		const data = {id, name, resp, time: duration(`${h}:${m}:${s}`)};

		if (!this.props.isOpen) {
			return null;
		}

		return (
			<div className='edit'>
				<div>
					<p>Название:</p>
					<input type="text"
						   name='name'
						   value={name}
						   onChange={(ev) => this.handleChange(ev)}
					/>
					<p>Ответственный:</p>
					<input type="text"
						   name='resp'
						   value={resp}
						   onChange={(ev) => this.handleChange(ev)}/>
					<p>Время:</p>
					<div className="time">
						<input className='time-input'
							   type="text"
							   name='h'
							   value={h}
							   onChange={(ev) => this.handleHourChange(ev)}/>
						:
						<input className='time-input'
							   type="text"
							   name='m'
							   value={m}
							   onChange={(ev) => this.handleMinSecChange(ev)}/>
						:
						<input className='time-input'
							   type="text"
							   name='s'
							   value={s}
							   onChange={(ev) => this.handleMinSecChange(ev)}/>
					</div>
					<section>
						<button className='accept'
								onClick={() => {
									this.props.editElem(path, data);
									this.props.toggleOpen();
								}}>
							Принять
						</button>
						<button className='decline'
								onClick={() => this.props.toggleOpen()}>
							Отмена
						</button>
					</section>
				</div>
			</div>
		);
	}

	componentDidMount() {
		const {path, store} = this.props;
		const elem          = store.getIn(path).toJS();

		this.setState({
			id  : elem.id,
			name: elem.name,
			resp: elem.resp,
			h   : `${duration(elem.time).hours()}`,
			m   : `${duration(elem.time).minutes()}`.padStart(2, '0'),
			s   : `${duration(elem.time).seconds()}`.padStart(2, '0')
		})
	}

	handleChange(ev) {
		this.setState({[ev.target.name]: ev.target.value});
	}

	handleMinSecChange(ev) {
		let {name, value} = ev.target;

		if (value > 59) {
			value = '59'
		}

		if (value < 0) {
			value = 0;
		}

		this.setState({[name]: value});
	}

	handleHourChange(ev) {
		let {name, value} = ev.target;

		if (value > 999) {
			value = 999;
		}

		this.setState({[name]: value});
	}

}

export default connect((state) => ({store: state}), {editElem})(Edit);