import React from 'react';
import './Rank.css';


const Rank = ({name, entries}) => {
	return (
		<div>
			<div className = "f1 ranking">
				{`${name}, your current entry count is`} <span className="f1"> {`${entries}`} </span>
			</div>
		</div>
	);
}

export default Rank;