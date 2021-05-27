import React, { useState, useEffect } from "react";
import PlayerDataService from "../services/PlayerService";
import constant from '../constant'

//List page 
const PlayersList = (props) => {
  const [Players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchPlayer,setSearchPlayer]=useState('')

  //calling api
  useEffect(() => {
    retrievePlayers();
  }, []);


//get the list
  const retrievePlayers = () => {
    PlayerDataService.getAll()
      .then(response => {
        setPlayers(response.data);
        setSearchPlayer(response.data)
      })
      .catch(e => {
        console.log(e);
      });
  };


  const setActivePlayer = (Player, index) => {
    setCurrentPlayer(Player);
    setCurrentIndex(index);
  };

  //Delete APi
  const deletePlayer = (id) => {
    PlayerDataService.remove(id)
      .then(response => {
         retrievePlayers()
      })
      .catch(e => {
        console.log(e);
      });
  };

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value.toLowerCase();
    console.log(e.target.value);
    setSearchTitle(searchTitle);
    let newData = searchPlayer && searchPlayer != undefined && searchPlayer?.filter(search=>(
      (search.Sessions?.toLowerCase().includes(searchTitle)
      ||search.firstName?.toLowerCase().includes(searchTitle)
      ||search.lastName.toLowerCase().includes(searchTitle))));
    console.log(e.target.value)
    console.log(e.target.value === undefined ,e.target.value,e.target.value==='null',Players)

    setPlayers(newData)
 
  };


  const editPlayer=(id)=>{
    props.history.push(constant.player+"/"+ id)
  }

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="search"
            className="form-control"
            placeholder="Search by Game Session  Or Full Name"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          
        </div>
      </div>
      <div className="col-md-9 col-12">
        <div className="d-flex justify-content-between mt-3 mb-3">
        <h4>Player List</h4>
        <button className="badge badge-info " onClick={()=>props.history.push(constant.addPlayer)}>
          Add Player
        </button>
        </div>
        <ul className="list-group">
          <div className="list-group-item d-flex justify-content-between" style={{ backgroundColor: "#ffc107" }}>
            <strong>Full Name</strong>
            <strong><span className="mr-5">Game Session</span></strong>
            <strong><span className="mr-5">Action</span></strong>
          </div>

          {Players &&
            Players.map((Player, index) => (
              <li
                className={
                  "list-group-item d-flex justify-content-between" 
                }
               // onClick={() => setActivePlayer(Player, index)}
                key={index}
              >
                <span>{Player.firstName + ' ' + Player.lastName}</span>
                <span>{Player.Sessions}</span>
                <div>
                  <button className="badge badge-warning ml-2" onClick={()=>editPlayer(Player.id)}>
                    Edit
                  </button>
                  <button className={index === currentIndex ? "badge badge-secondary ml-2 " : "badge badge-info ml-2"} id="viewButton" onClick={() => setActivePlayer(Player, index)}>
                    View Details
                  </button>
                  <button className="badge badge-danger ml-2" onClick={()=>deletePlayer(Player.id)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
        </ul>

      </div>
      <div className="col-md-3 col-12 mt-3">
        {currentPlayer ? (
          <div className="mt-5"> 
            <h4>Player Details </h4>
            <div>
              <label>
                <strong>First Name:</strong>
              </label>{" "}
              {currentPlayer.firstName}
            </div>
            <div>
              <label>
                <strong>Last Name:</strong>
              </label>{" "}
              {currentPlayer.lastName}
            </div>

            {currentPlayer.Sessions &&
              <div>
                <label>
                  <strong>Game Sessions:</strong>
                </label>{" "}
                {currentPlayer.Sessions}
              </div>}
            <div>
              <label>
                <strong>Campaign Name:</strong>
              </label>{" "}
              {currentPlayer.campaignName}
            </div>
            <div>
              <label>
                <strong>Contact Number:</strong>
              </label>{" "}
              {currentPlayer.contactNumber}
            </div>
            <button className="btn btn-warning " onClick={()=>editPlayer(currentPlayer.id)}>
                    Edit
            </button>
          </div>
        ) : (
          <div className="mt-5">
            <br />
            <p className="mt-5">Please click on a View Detail...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayersList;
