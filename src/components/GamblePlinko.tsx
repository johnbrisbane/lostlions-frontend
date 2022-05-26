import { useCallback, useEffect, useRef, useState } from 'react'
import { Engine, Render, Bodies, World, Runner } from 'matter-js'
import axios from 'lib/axios'
import { useWallet } from '@solana/wallet-adapter-react'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

function Comp (props:any) {
  const [winner, setWinner] = useState<boolean>(false);
  const [wager, setWager] = useState(0);
  const [total, setTotal] = useState(0);
  const [alignment, setAlignment] = useState('ROAR');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };

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

    engine.current.timing.timeScale = 0.40

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
    setWager(0);

    if (total > 1000) {
        (document.getElementById("start") as HTMLButtonElement).disabled = true;
        (document.getElementById("start") as HTMLButtonElement).textContent = 'REFRESH PAGE';
    }
    if (wager > 1000) {
        (document.getElementById("start") as HTMLButtonElement).disabled = true;
        window.alert("Warning, this may lag browser");
    }

    for (let i = 0; i < wager; i++) {
        World.add(engine.current.world, Bodies.circle(Math.random()*600, Math.random()*10, 6, { restitution: .9 }));
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

        <div className="navbar mb-2 shadow-lg bg-neutral text-neutral-content" style={{backgroundImage: `url(backdrop.jpg)`}}>
            <div className="px-2 mx-2 navbar-start">
                <button onClick={() => {
                    setWager(wager + 25);
                    setTotal(total + 25);
                }} className="px-8 m-2 btn bg-gradient-to-r from-[#fa4336] to-[#47833C]">Add 25</button>
                <button onClick={() => {
                    setWager(wager + 50);
                    setTotal(total + 50);
                }} className="px-8 m-2 btn bg-gradient-to-r from-[#27168a] to-[#47833C]">Add 50</button>
                <button onClick={() => {
                    setWager(wager + 100);
                    setTotal(total + 100);
                }} className="px-8 m-2 btn bg-gradient-to-r from-[#000000] to-[#47833C]">Add 100</button>
                <button onClick={() => {
                    setWager(0)
                }} className="px-8 m-2 btn bg-gradient-to-r from-[#d4d3c9] to-[#47833C]">Reset</button>
            </div>

            <div className="navbar-center lg:flex">
            <div className="flex items-stretch">
                <p className=" text-black text-2xl text-center">
                    Wager: {wager} {alignment}
                </p>
            </div>
            </div>
            <div className="navbar-end bordered">
                <ToggleButtonGroup
                color="info"
                value={alignment}
                exclusive
                onChange={handleChange}
                >
                <ToggleButton value="ROAR">ROAR</ToggleButton>
                <ToggleButton value="SOL">Solana</ToggleButton>
                </ToggleButtonGroup>
            </div>
        </div>
        
        <div className="container mx-auto flex justify-center top-auto w-screen">
            <button onClick={handleAddCircle} className="px-8 m-2 btn bg-gradient-to-r from-[#FAD836] to-[#47833C]" id ="start">Play</button>
        </div>
        <div className="container mx-auto flex justify-center top-auto w-screen"ref={scene} style={{ width: '100%', height: '100%' }}></div>
        <div className="container mx-auto flex justify-between top-auto" style={{ width: '700px' }}>
            <p >5x</p>
            <p>2.5x</p>
            <p>1x</p>
            <p>.75x</p>
            <p>.5x</p>
            <p>.25x</p>
            <p>.5x</p>
            <p>.75x</p>
            <p>1x</p>
            <p>2.5x</p>
            <p>5x</p>
        </div>
    </div>
  )
}

export default Comp

