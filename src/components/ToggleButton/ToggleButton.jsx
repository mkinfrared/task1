import React from 'react';

function ToggleButton(props) {
	return (
		<div className='toggle-button'>
			{(props.open)
			 ? <i className="fas fa-minus"
				  onClick={() => props.toggleOpen()}></i>
			 : <i className="	fas fa-plus"
				  onClick={() => props.toggleOpen()}></i>}
		</div>
	);
}

export default ToggleButton;