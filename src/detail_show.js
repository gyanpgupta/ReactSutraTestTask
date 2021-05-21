import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './form.css';
import {apiHost} from "./constant.js"

function DetailShow(props) {

	const [details, setDetails] = useState({});
	const [call, handleCall] = useState(false);

	useEffect(() => {
	    if(call === false){
			// call api to fetch the user detail
		    axios.get(`${apiHost}/getUserData`).then((res) => {
		        setDetails(res.data);
		        handleCall(true);
		    })
	    }
	});

  return (
    <div className="user-form" id="user-details" style={{background: details.bgColor}}>
        <h2>Detail show</h2>
        <div>
	        <img src={details.profile}
	              width="100px"
	        />
	    </div>
        {
        	handleCall &&
        		<ul className="user-details-list">
        			<li>
        				Username : {details.username}
        			</li>
        			<li>
        				FirstName : {details.firstName}
        			</li>
        			<li>
        				Last Name : {details.lastName}
        			</li>
        			<li>
        				Email : {details.email}
        			</li>
        			<li>
        				Phone : {details.phone}
        			</li>
        			<li>
        				Bio : {details.bio}
        			</li>
        		</ul>
        }
       	<button onClick={props.handleSubmit}>Editing</button>
    </div>
  );
}

export default DetailShow;
