import { useCallback, useEffect, useRef, useState } from 'react'
import { Engine, Render, Bodies, World } from 'matter-js'
import axios from 'lib/axios'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import { useRouter } from 'next/router'
import { SendBackToken } from './AppSendBack'

function Comp (props) {
  const scene = useRef()
  const isPressed = useRef(false)
  const engine = useRef(Engine.create())

  const { publicKey } = useWallet()
  const userPub = publicKey?.toBase58()
  const router = useRouter();

  useEffect(() => {
    var 
      cols = 11,
      rows = 9,
      height = 700,
      width = 600,
      plinkosize = 14,
      count = 0;

    var render = Render.create({
        element: scene.current,
        engine: engine.current,
        options: {
        width: width,
        height: height,
        wireframes: false
        }
      });
    
    const boundryoptions = {
      density: 1,
      friction: 1,
      isStatic: true
    };

    const coloroptionsred = {
        density: 1,
        friction: 1,
        isStatic: true,
        render: {
            fillStyle: 'red',
            lineWidth: 3
        }
      };
      const coloroptionsgreen = {
        density: 1,
        friction: 1,
        isStatic: true,
        render: {
            fillStyle: 'green',
            lineWidth: 3
        }
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
        World.add(engine.current.world, [
          Bodies.rectangle(x - 200, y, w, h, boundryoptions)
        ]);
      }
      else if (i == cols/2 - 1) {
        World.add(engine.current.world, [
          Bodies.rectangle(x + 200, y, w, h, boundryoptions)
        ]);
      }
      else{
        World.add(engine.current.world, [
          Bodies.rectangle(x, y, w, h, boundryoptions)
        ]);
      }
      
  }
  

    World.add(engine.current.world, [
      // floor
      Bodies.rectangle(width/2, height, width, 25, boundryoptions),

      //walls
      Bodies.rectangle(0, height/2, 10, height, boundryoptions),
      Bodies.rectangle(width, height/2, 10, height, boundryoptions),
      
    ]);
    for (let i =0; i <= cols; i++){
        if (i % 2 == 0){
            World.add(engine.current.world, [Bodies.rectangle(spacing*i-spacing/2, height, spacing, 25, coloroptionsred)]);
        }
        else {
            World.add(engine.current.world, [Bodies.rectangle(spacing*i-spacing/2, height, spacing, 25, coloroptionsgreen)]);
        }

    }

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
          World.add(engine.current.world, [
            Bodies.rectangle(x - 10,y,55, 4, plinkooptionsleft)
          ]);
        }
        else if ((i == cols -1) && (j % 2 == 0)){
          World.add(engine.current.world, [
            Bodies.rectangle(x + 10,y,55, 4, plinkooptionsright)
          ]);
        }
        else {
          World.add(engine.current.world, [
            Bodies.circle(x,y,plinkosize, plinkooptionsleft)
          ]);
        }
      }
    }

    Engine.run(engine.current)
    Render.run(render)

    return () => {
      Render.stop(render)
      World.clear(engine.current.world)
      Engine.clear(engine.current)
      render.canvas.remove()
      render.canvas = null
      render.context = null
      render.textures = {}
    }
  }, [])

  const handleAddCircle = () => {
    (document.getElementById("start") as HTMLButtonElement).disabled = true;

    AddStartingPos(userPub)
    .then(
        function(res) {
          if(res && res.active == '1'){
            UpdateActive(res.id);
            World.add(engine.current.world, Bodies.circle(res.starting_pos, 5, 10, { restitution: .9 }));
            HandleResult(res.result)
          }
          else {
            if (confirm("You have no Lion Credit for plinko, Please return home to submit a lion")) {
                router.push('/');
              } else {
                router.push('/');
              }
          }
        }
    );
  }

  return (
    <div>
      <div ref={scene} style={{ width: '100%', height: '100%' }} />
      <button onClick={handleAddCircle} className="px-8 m-2 btn bg-gradient-to-r from-[#FAD836] to-[#47833C] z-50" id ="start">Play</button>
    </div>
  )
}

export default Comp

async function AddStartingPos(UserPublicKey: string) {
    try {
  
      const res = await axios.get(`api/result/${UserPublicKey}`);
  
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
  
  async function HandleResult(result: number) {
    // initialize data state variable as an empty array
    console.log("Hello");
    await sleep(10500);
    console.log("World!");

    if (result == 0) {
        window.alert("Sorry You Lost your lion!!\nTry Again?");
        window.location.href='/game';
        return (
            <div></div>
        );
      }
      else {
        window.alert("Congratulations!\nCheck your wallet for your new attribute!");
        window.location.href='/claimLion';
        return (
                <div> </div>
          );
      }

  }
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }