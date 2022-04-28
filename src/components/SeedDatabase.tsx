import { FC, useCallback, useEffect, useState } from 'react';
import axios from '../lib/axios';


export const SeedDatabase: FC = () => {    
    const onClick = useCallback(async () => {

        var e;
        axios.get('api/result')
        .then(function (response) {
            e = response.data.length;
            if ( e > 0 ) {
                console.log('error', `Database Already Seeded. Delete manually.`);
                return;
            }
            else {
                axios.get('api/v1/seeds')
                .then(function (response) {
                    console.log(response);
                  });
            }
          })

    },[]);
    
    return (
        <div>
            <DisplayData />
            <button
                className="btn m-2 bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ..."
                onClick={onClick}
            >
                <span> WARNING SEED DATABASE </span>
            </button>
        </div>
    );
};

function DisplayData() {
    // initialize data state variable as an empty array
    const [data, setData] = useState([]);
  
    // make the fetch the first time your component mounts
    useEffect(() => {
      axios.get('api/v1/getplayedgames').then(response => setData(response.data));
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