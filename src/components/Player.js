import React, { useState, useEffect } from "react";
import PlayerDataService from "../services/PlayerService";
import {toast} from 'react-toastify'; 
import constant from '../constant';

const Player = props => {
  const initialPlayerState = {
    id: null,
    firstName: "",
    lastName: "",
    contactNumber:"",
    campaignName:"",
    published: false,
    Sessions:"",
  };
  const [currentPlayer, setCurrentPlayer] = useState(initialPlayerState);
  const [message, setMessage] = useState("");

  //get player Details
  const getPlayer = id => {
    PlayerDataService.get(id)
      .then(response => {
        setCurrentPlayer(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getPlayer(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name,value } = event.target;
    setCurrentPlayer({ ...currentPlayer, [name]: value });
  };

//update Player
  const updatePlayer = () => {
    let data = {
      firstName: currentPlayer.firstName,
      lastName: currentPlayer.lastName,
      contactNumber:currentPlayer.contactNumber,
      campaignName:currentPlayer.campaignName,
      Sessions:currentPlayer.Sessions
    }
    PlayerDataService.update(currentPlayer.id, data)
      .then(response => {
        toast.success('The Player updated successfully!')
        setTimeout(() => {          
        props.history.push(constant.player);
        }, 1500);
      })
      .catch(e => {
        console.log(e);
      });
  };

  //Delete Player
  const deletePlayer = () => {
    PlayerDataService.remove(currentPlayer.id)
      .then(response => {
        toast.success('The Player Delete successfully!')
        props.history.push(constant.player);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      { currentPlayer ? (
        <div className="edit-form">
          <h4><strong>Edit Player details</strong></h4>
          <form>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                defaultValue={currentPlayer?.firstName}
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
                defaultValue={currentPlayer?.lastName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="campaignName">Campaign Name</label>
              <input
                type="text"
                className="form-control"
                id="campaignName"
                name="campaignName"
                defaultValue={currentPlayer?.campaignName}
                onChange={handleInputChange}
              />
            </div>
            {currentPlayer?.Sessions&&
            <div className="form-group">
              <label htmlFor="contactNumber">Sessions Name</label>
              <input
                type="text"
                className="form-control"
                id="Sessions"
                name="Sessions"
                defaultValue={currentPlayer?.Sessions}
                onChange={handleInputChange}
              />
            </div>}
            <div className="form-group">
              <label htmlFor="contactNumber">Contact Number</label>
              <input
                type="number"
                className="form-control"
                id="contactNumber"
                name="contactNumber"
                defaultValue={currentPlayer?.contactNumber}
                onChange={handleInputChange}
              />
            </div>
          </form>



          <button className="btn btn-danger mr-2"  onClick={deletePlayer}>
            Delete
          </button>

          <button
            type="submit"
            className="btn btn-success"
            onClick={updatePlayer}
          >
            Save details
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Player...</p>
        </div>
      )}
    </div>
  );
};

export default Player;
