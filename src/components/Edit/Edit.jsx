import React, {Component} from 'react';
import {duration} from 'moment';

class Edit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			resp: '',
			h   : '',
			m   : '',
			s   : ''
		}
	}

	render() {
		const {name, resp, h, m, s} = this.state;

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
								onClick={() => this.props.changeData(name, resp, `${h}:${m}:${s}`)}>
							Принять
						</button>
						<button className='decline'
								onClick={() => this.props.onClose()}>
							Отмена
						</button>
					</section>
				</div>
			</div>
		);
	}

	componentDidMount() {
		this.setState({
			name: this.props.name,
			resp: this.props.responsible,
			h   : `${duration(this.props.time).hours()}`,
			m   : `${duration(this.props.time).minutes()}`.padStart(2, '0'),
			s   : `${duration(this.props.time).seconds()}`.padStart(2, '0')
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

export default Edit;