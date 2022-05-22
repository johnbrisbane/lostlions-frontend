import { useCallback, useEffect, useRef, useState } from 'react'
import { Engine, Render, Bodies, World, Runner } from 'matter-js'
import axios from 'lib/axios'
import { useWallet } from '@solana/wallet-adapter-react'

function Comp (props) {
  const [data, setData] = useState([]);
  const [winner, setWinner] = useState<boolean>(false);

  const scene = useRef()
  const engine = useRef(Engine.create())

  const { publicKey } = useWallet()
  const userPub = publicKey?.toBase58()

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
     // create runner
     var runner = Runner.create({
      isFixed: true
    });
    Runner.run(runner, engine.current);

    engine.current.timing.timeScale = 0.55

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

  useEffect(() => {
    async function getResults() {
      const request = await axios.get(`api/result/${userPub}`);
      if (request.data.active == '1'){
        setData(request.data.starting_pos);
        if (request.data.result == '1')
        {
          setWinner(true);
        }
      }
      return request;
    }      
    getResults()
  }, [userPub]); 


  const handleAddCircle = () => {
    var winners = Array(250,300,378,428,450);
    var losers = Array(275,325,350,400,500);
    (document.getElementById("start") as HTMLButtonElement).disabled = true;

     if (winner){
      World.add(engine.current.world, Bodies.circle(winners[Math.floor(Math.random()*winners.length)], 5, 10, { restitution: .9 }));
      HandleResult(1);
     }
     else {
      World.add(engine.current.world, Bodies.circle(losers[Math.floor(Math.random()*losers.length)], 5, 10, { restitution: .9 }));
      HandleResult(0);
     }
  }

  async function HandleResult(result: number) {
    // initialize data state variable as an empty array
    await sleep(10500);

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

  return (
    <div>
      <div ref={scene} style={{ width: '100%', height: '100%' }}>
        <button onClick={handleAddCircle} className="px-8 m-2 btn bg-gradient-to-r from-[#FAD836] to-[#47833C]" id ="start">Play</button>
      </div>
    </div>
  )
}

export default Comp
