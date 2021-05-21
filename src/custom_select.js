import './form.css';

function CustomSelect(props) {
  return (
    <div className="user-info">
    	<label>{props.label}</label>
    	<div className="w-100">
	        <select onChange={props.onChange} name={props.name} value={props.value} >
			  {
			  	props && props.bgColors && props.bgColors.map((color, index) => {
			  		return(
			  			<option value={color.value} key={index}>{color.label}</option>
			  		)
			  	})
			  } 
			</select>
		</div>
    </div>
  );
}

export default CustomSelect;
