import React, { useEffect, useState } from 'react'
import Axios from "axios";

const LeaderBoard = () => {
  const [leaderBoard, setLeaderBoard] = useState([]);
  
  useEffect(() => {
    Axios.get("http://localhost:3001/leaderboard").then((res)=> {
      setLeaderBoard(res.data)
    })  
  }, []);
  return (
    <div>
      <h1>
        LeaderBoard
      </h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Juegos ganados</th>
          </tr>
        </thead>
        <tbody>
          {
            leaderBoard.map((el,idx) => {
              return (
                <tr key={idx}>
                  <td>{el.name}</td>
                  <td>{el.qty}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default LeaderBoard