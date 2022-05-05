import React, { useState, useEffect } from 'react'
import { Line, Bar, Chart } from 'react-chartjs-2'
import { CategoryScale, Chart as ChartJS, registerables } from 'chart.js';
import { Container, Row, Col } from 'react-bootstrap';
import './Graphs.scss'
function Graphs(props) {
  
  const [daily, setDaily] = useState([])
  const apiURL = 'https://covid19.mathdro.id/api'
  const [country,setCountry]=useState([])
  useEffect(() => {
    async function fetchDailyData() {
      if(props.selectedCountry){
        
        const response = await fetch(`${apiURL}/countries/${props.selectedCountry}`);
        const fetchedCountry = await response.json()
        setCountry(fetchedCountry)
      }else{
        
        const response = await fetch(`${apiURL}/daily`);
        const fetchedData = await response.json()
        setDaily(fetchedData)
      }
    }
    
    fetchDailyData()
  }, [props.selectedCountry])
  
  

  const lineGraph = (

    daily.length
      ? (
        <Line
          data={{
            labels: daily.map(({ reportDate }) => reportDate),
            datasets: [{
              data: daily.map(({ totalConfirmed }) => totalConfirmed),
              label: 'Confirmed',
              backgroundColor: 'rgba(0,0,255,0.2)',
              borderColor: 'blue',
              borderWidth: 0,
              borderDash: [5, 5],
              borderDashOffset: 2,
              fill: true
            }, {
              data: daily.map(({ deltaConfirmed }) => deltaConfirmed),
              label: 'Deaths',
              borderColor: 'red',
              backgroundColor: 'rgba(255,0,0,0.2)',
              fill: true
            }],
          }}
        />
      ) : null


  )

  const barGraph= (
    country.confirmed?(
      <Bar
      
      data={{ 
        labels:['Confirmed','Recovered','Deaths'],
        datasets:[{
          label:'People',
          backgroundColor:[
            'rgba(0,0,255,0.5)',
            'rgba(0,255,0,0.5)',
            'rgba(255,0,0,0.5)'
          ],
          data:[country.confirmed.value,country.recovered.value,country.deaths.value]
        }],
       }}
      options={{ 
        legend:{display : false},
        title:{display:true , text: `Current Situation in ${props.selectedCountry}`}
       }}
      />
    ) :null

  )

  ChartJS.register(...registerables)

  return (
    <div className='graph-div'>
      <Container>
        <Row>
          <Col>
          
            {!props.selectedCountry && !daily.length?"Loading..." : props.selectedCountry&&props.selectedCountry!='Global'? barGraph:lineGraph}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Graphs