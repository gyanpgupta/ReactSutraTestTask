import React, { useEffect, useState } from 'react';
import CustomInput from "./custom_input";
import CustomTextArea from "./custom_text_area";
import CustomSelect from "./custom_select";
import './form.css';
import  { apiHost } from "./constant.js"

import axios from 'axios';

function Form(props) {
  const bgColors = [
  	{
  		label: "Red",
  		value: "red"
  	},
  	{
  		label: "Green",
  		value: "green"
  	},
  	{
  		label: "Yellow",
  		value: "yellow"
  	},
  	{
  		label: "Orange",
  		value: "orange"
  	},
  	{
  		label: "Grey",
  		value: "grey"
  	}
  ] 

  const [emailValidate, emailError] = useState(false)
  const [phoneValidate, phoneError] = useState(false)

  const [formConfig, setFormConfig] = useState({
    inputs: {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: 0,
      bio: '',
      bgColor: ""
    }
  });

  useEffect(() => {
      if(call === false){
        // call api to fetch the user detail
        axios.get(`${apiHost}/getUserData`).then((res) => {
            setFormConfig({
              ...formConfig,
              inputs: res.data
            })
            handleCall(true);
        })
      }
  });

  const [call, handleCall] = useState(false);

  const handleChange = (e) => {
  	setFormConfig({
      ...formConfig,
      inputs: {
        ...formConfig.inputs,
        [e.target.name]: e.target.value,
      },
    });

    if(e.target.name === "email"){
      validateEmail(e.target.value)
    }

    if(e.target.name === "phone"){
      validatePhone(e.target.value)
    }
  }	

  const submitDetails = () => {
    let details = formConfig.inputs
    if(phoneValidate === false && emailValidate === false){
      // call api to update the user detail
      axios.put(`${apiHost}/updateUserData` , details)
    }
  }

  const validateEmail = (email) => {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase()) === true ? emailError(false)  : emailError(true);
  }

  const validatePhone = (phone) => {
    var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(phone) === true ? phoneError(false)  : phoneError(true);
}

  return (
    <div className="user-form">
      <div>
        <img src={formConfig.inputs.profile} 
              width="100px"
        />
      </div>
    	<CustomInput 
              		placeholder="Username"
              		name="username"
              		onChange={(e) => handleChange(e)}
                	value={formConfig.inputs.username}
                	type="text"
                	label="Username"/>
    	<CustomInput placeholder="First Name"
                	 name="firstName"
                	 onChange={(e) => handleChange(e)}
                   value={formConfig.inputs.firstName}
                   type="text"
                   label="First Name"
        />
      <CustomInput	placeholder="Last Name"
                		name="lastName"
                		onChange={(e) => handleChange(e)}
                  	value={formConfig.inputs.lastName}
                  	type="text"
                  	label="Last Name"
        />
      <CustomInput placeholder="Email"
                	 name="email"
                	 onChange={(e) => handleChange(e)}
                   value={formConfig.inputs.email}
                   type="text"
                   label="Email"
                   error={emailValidate}
                   errorMessage="Enter a valid email"
        />
      <CustomInput placeholder="Phone Number"
                	 name="phone"
                	 onChange={(e) => handleChange(e)}
                   value={formConfig.inputs.phone}
                   type="text"
                   label="Phone Number"
                   error={phoneValidate}
                   errorMessage="Enter a valid phone number"
        />
      <CustomTextArea placeholder="Bio"
                  		name="bio"
                  		onChange={(e) => handleChange(e)}
                    	value={formConfig.inputs.bio}
                    	type="text"
                    	label="Bio"
        />
      <CustomSelect bgColors={bgColors}
            			  name="bgColor"
            			  onChange={(e) => handleChange(e)}
                    value={formConfig.inputs.bgColor}
            			  label="Background color of reading view"
        			     />
      <div className="d-flex items-center justify-between">             
        <button onClick={submitDetails}>Update</button>
        <button onClick={props.handleSubmit}>Reading</button>
      </div>
    </div>
  );
}

export default Form;
