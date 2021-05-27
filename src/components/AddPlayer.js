import React, { useState } from "react";
import PlayerDataService from "../services/PlayerService";
import {toast} from 'react-toastify'; 

const AddPlayer = () => {
  const initialPlayerState = {
    id: null,
    firstName: "",
    lastName: "",
    contactNumber:"",
    campaignName:"",
    published: false,
    Sessions:"",
  };
  const [Player, setPlayer] = useState(initialPlayerState);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false)
  const handleInputChange = event => {
    const { name, value } = event.target;
    setPlayer({ ...Player, [name]: value });
  };

  //call save api 
  const savePlayer = () => {
    var data = {
      firstName: Player.firstName,
      lastName: Player.lastName,
      contactNumber:Player.contactNumber,
      campaignName:Player.campaignName,
      Sessions:Player.Sessions
    };
    if (Player.firstName && Player.lastName && Player.contactNumber) {
      PlayerDataService.create(data)
        .then(response => {
          setPlayer({
            id: response.data.id,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            contactNumber:response.data.contactNumber,
            campaignName:response.data.campaignName,
            Sessions:response.data.Sessions
          });
          setSubmitted(true);
          toast.success('Added Player Successfully!')
          setPlayer(initialPlayerState);
        })
        .catch(e => {
          console.log(e);
        });
        setError(false)
    } else {
      setError(true)
    }
  };

  const resetPlayer=()=>{
    setPlayer(initialPlayerState);
    setSubmitted(false);
  }

  

  return (
    <div className="submit-form">
      
        <div>
          <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                required
                value={Player.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                required
                value={Player.lastName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="contactNumber">Contact Number</label>
              <input
                type="number"
                className="form-control"
                id="contactNumber"
                minlength="10"
                required
                maxlength="10"
                name="contactNumber"
                value={Player.contactNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="contactNumber">campaign Name</label>
              <input
                type="text"
                className="form-control"
                id="campaignName"
                name="campaignName"
                value={Player.campaignName}
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="Sessions">Game Sessions</label>
              <input
                type="text"
                className="form-control"
                id="Sessions"
                name="Sessions"
                value={Player.Sessions}
                onChange={handleInputChange}
              />
            </div>

          {error === true && <div className="mb-2 text-danger font-weight-bold">please fill the form</div>}
          
          <button onClick={resetPlayer} className="btn btn-warning mr-3">
            Reset
          </button>
          <button onClick={savePlayer} className="btn btn-success">
            Submit
          </button>
        </div>
      
    </div>
  );
};

export default AddPlayer;
