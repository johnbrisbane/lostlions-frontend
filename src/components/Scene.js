import React from "react";
import ReactDOM from "react-dom";
import Matter from "matter-js";
import axios from "../lib/axios";
import { useEffect, useState } from "react";


class Scene extends React.Component {



  componentDidMount() {

    var Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite,
      cols = 11,
      rows = 9,
      height = 700,
      width = 600,
      plinkosize = 14,
      particlesize = 10,
      count = 0;
    
    const boundryoptions = {
      density: 1,
      friction: 1,
      isStatic: true
    };

    const plinkooptionsleft = {
      isStatic : true,
      density : 1,
      restitution : 1,
      friction : 0,
      angle : 45
    };

    const plinkooptionsright = {
      isStatic : true,
      density : 1,
      restitution : 1,
      friction : 0,
      angle : -45
    };
    const spacing = width / cols;

    var engine = Engine.create({
      // positionIterations: 20
    });

    var composite = Composite.create({

    });

    var render = Render.create({
      element: this.refs.scene,
      engine: engine,
      options: {
        width: width,
        height: height,
        wireframes: false
      }
    });

    //--------------------------
    //        BOUNDRIES
    //--------------------------
    
    //bottom part
    for (let i = 0; i < cols +1; i ++) {
      const x = i * spacing;
      const h = 100;
      const w = 4;
      const y = height - h/2;

      if (i == cols/2){
        World.add(engine.world, [
          Bodies.rectangle(x - 200, y, w, h, boundryoptions)
        ]);
      }
      else if (i == cols/2 - 1) {
        World.add(engine.world, [
          Bodies.rectangle(x + 200, y, w, h, boundryoptions)
        ]);
      }
      else{
        World.add(engine.world, [
          Bodies.rectangle(x, y, w, h, boundryoptions)
        ]);
      }
      
  }

    World.add(engine.world, [
      // floor
      Bodies.rectangle(width/2, height, width, 25, boundryoptions),
      //walls
      Bodies.rectangle(0, height/2, 10, height, boundryoptions),
      Bodies.rectangle(width, height/2, 10, height, boundryoptions),
      
    ]);

    //--------------------------
    //        PLINKOS
    //--------------------------

    for (let j = 0; j < rows; j ++) {
      for (let i = 0; i < cols +1; i ++) {
        let x = i * spacing;
        if (j % 2 == 0) {
          x += spacing / 2;
        }
        const y = spacing + j * spacing;
        if ( ((i == 0) && (j % 2 == 0))) {
          World.add(engine.world, [
            Bodies.rectangle(x - 10,y,55, 4, plinkooptionsleft)
          ]);
        }
        else if ((i == cols -1) && (j % 2 == 0)){
          World.add(engine.world, [
            Bodies.rectangle(x + 10,y,55, 4, plinkooptionsright)
          ]);
        }
        else {
          World.add(engine.world, [
            Bodies.circle(x,y,plinkosize, plinkooptionsleft)
          ]);
        }
      }
    }

    Engine.run(engine);

    Render.run(render);

    const button = document.getElementById('start')
    button.addEventListener('click', () => {

    AddStartingPos(publickey)
    .then(
        function(res) {
          if(res && res.active == '1'){
            UpdateActive(res.id);
            World.add(engine.world, Bodies.circle(res, 5, particlesize, { restitution: .9 }));
          }
          else {
            
          }
        }
    );

      

    });

  };

  render() {
    return (
      <div>
        <div ref="scene" />
        <button className="" id ="start">Play</button>
      </div>
    );
  }
}
export default Scene;

async function AddStartingPos(UserPublicKey) {
  try {

    const res = await axios.get(`api/v1/getResultFromWallet/${UserPublicKey}`);

    console.log(res.data)

    return res.data; 
      // Don't forget to return something   
  }
  catch (err) {
      console.error(err);
  }
}

async function UpdateActive(id) {
  try {
    const res = await axios.put(`api/result/${id}`);

    return res.data.result; 
      // Don't forget to return something   
  }
  catch (err) {
      console.error(err);
  }
}

function showResults() {
  // initialize data state variable as an empty array
  const [data, setData] = useState([]);

  // make the fetch the first time your component mounts
  useEffect(() => {
    axios.get(`api/v1/getResultFromWallet/${UserPublicKey}`).then(response => setData(response.data));
  }, []);

  if (!data?.length) {
      return (
        <div className="text-center text-2xl pt-16 w-screen">
          <p>No Results Yet</p>
        </div>
      );
    }

  return (
    <div className='pt-12 w-screen'>
        Results of Games Played (Wallet ID, Result, Time Of Play). 1 is Winner 0 is Loser for result
        <table>
            <tr>
                <th>ID</th>
                <th>Wallet ID</th>
                <th>Result</th>
                <th>Date</th>
            </tr>
        {data.map((row) => (
        <tr key={row.id}>
            <th> {row.id} </th>
            <th> {row.wallet_id} </th> 
            <th> {row.result}</th>
            <th> {row.updated_at }</th>
            </tr>
      ))}

        </table>
    </div>
  );
}