import React,{useState,useEffect} from 'react';
import StatBox from './components/StatBox';
import Table from './components/Table';
import InfoBox from './components/InfoBox';
import Map from './components/Map';

import './css/App.css';

function App() {
  const[info,setInfo]=useState([]);
  const[timelineInfo,setTimelineInfo]=useState([]);
  const[selectedState,setSelectedState]=useState('india');

  const[loading,setLoading]=useState(true);

  const colors=['blue','green','red','grey'];

  async function getInfo() {
    
    try {
      const response = await fetch('https://api.covid19india.org/data.json');
      const data = await response.json();
      setInfo(data);
      
    }
    catch(e) {
      console.error('There has been a problem with your fetch operation:', e);
      setLoading(true);
    }
  }
  async function getTimelineInfo() {
    
    try {
      const response = await fetch('https://api.covid19india.org/states_daily.json');
      const data = await response.json();
      setTimelineInfo(data);
      setLoading(false)
    }
    catch(e) {
      console.error('There has been a problem with your fetch operation:', e);
      setLoading(true);
    }
  }
  useEffect(() => {
      console.log('useEffect called'); 
      getInfo();
      getTimelineInfo()
   }, []);

      if(loading){
        return(
          <div>Loading...</div>
        )       
      }

      else{
        return(
          <div className="container-fluid m2">

            <div className="row">
              <div style={{border:'1px solid red'}} className="col-lg-6 themed-grid-col">
              <h2 className="mt-4">India Covid-19 tracker</h2>
              <p>Get two columns <strong>starting at desktops and scaling to large desktops</strong>.</p>
              {console.log(info)}
              {console.log(timelineInfo)}
              {/* Stats */}
              <StatBox></StatBox>

              {/* table */}
              <Table data={info.statewise}></Table>
              </div>
              <div style={{border:'1px solid red'}} className="col-lg-6 themed-grid-col">
              <h2 class="mt-4">India Map</h2>
              <p>Get two columns <strong>starting at desktops and scaling to large desktops</strong>.</p>

              <div class="card mb-3">
                
                <div class="card-body">
                  <div class="row">
                    {/* infobox */}
                    <div class="col-xl-6 themed-grid-col mb-3">
                      <div class="card-group">
                        <InfoBox 
                          title={'CONFIRMED'}
                          total={}
                          color={colors[0]}
                          ></InfoBox>
                        <InfoBox
                          title={'ACTIVE'}
                          total={}
                          color={colors[1]}
                          ></InfoBox>
                        <InfoBox
                          title={'RECOVERED'}
                          total={}
                          color={colors[2]}
                          ></InfoBox>
                        <InfoBox
                          title={'DECEASED'}
                          total={}
                          color={colors[3]}
                          ></InfoBox>
                      </div>                   
                    </div>
                    {/* last update */}
                    <div class="col-xl-6 themed-grid-col mb-3">
                      <div class="float-right">Float right on all viewport sizes</div>
                    </div>
                    {/* map */}
                    <div class="col-xl-6 themed-grid-col mb-3">
                      <Map></Map>
                    </div>
                  
                  </div>
                
                </div>
              </div>




              </div>
            </div>
          </div>
        )
      }
    
    
  
}

export default App;