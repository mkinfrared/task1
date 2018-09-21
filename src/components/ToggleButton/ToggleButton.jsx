import React from 'react';

function ToggleButton(props) {
	return (
		<div className='toggle-button'>
			{(props.open) ?
				<i class="fas fa-plus"></i> :
				<i className="fas fa-minus"></i>}
		</div>
	);
}

export default ToggleButton;