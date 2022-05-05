import React ,{useState,useEffect} from 'react'
import { Card, Container, Row , Col  } from 'react-bootstrap'
import CountUp from 'react-countup';
import './Cards.scss'
function Cards({ confirmed, recovered, deaths, lastUpdate ,selectedCountry}) {
  const apiURL='https://covid19.mathdro.id/api'

    const [fetchedCountry,setFetchedCountry]=useState('')
    
        useEffect(()=>{
            if(selectedCountry){
            async function fetchCountry() {
              const response= await fetch(`${apiURL}/countries/${selectedCountry}`);
              const fetchedData = await response.json()
              setFetchedCountry( fetchedData)
            }
            fetchCountry()
            }
          },[selectedCountry])
    



    return (
        <Container>
            <Row>
        <div className='card-div'>
            
            <Card as={Col} xs={6} border="primary" style={{ width: '18rem', borderBottomWidth:'5px', margin:'0.5rem' , backgroundColor:'rgba(0,0,255,0.1)' }}>
                <Card.Header>Confirmed</Card.Header>
                <Card.Body>
                    <Card.Title>{!confirmed ? 'Loading...' : (<CountUp
                        start={0}
                        end={fetchedCountry.confirmed?fetchedCountry.confirmed.value: confirmed.value}
                        duration={2}
                        separator=','
                    />)}</Card.Title>
                    <Card.Text>
                        {new Date(lastUpdate).toDateString()}
                    </Card.Text>
                </Card.Body>
            </Card>


            <Card as={Col} xs={6} border="success" style={{ width: '18rem' , borderBottomWidth:'5px', margin:'0.5rem' , backgroundColor:'rgba(0,255,0,0.1)'}}>
                <Card.Header>Recovered</Card.Header>
                <Card.Body>
                    <Card.Title>{!recovered ? 'Loading...' : (<CountUp
                        start={0}
                        end={fetchedCountry.recovered?fetchedCountry.recovered.value:recovered.value}
                        duration={2}
                        separator=','
                    />)}</Card.Title>
                    <Card.Text>
                        {new Date(lastUpdate).toDateString()}
                    </Card.Text>
                </Card.Body>
            </Card>


            <Card as={Col} xs={6} border="danger" style={{ width: '18rem', borderBottomWidth:'5px', margin:'0.5rem' , backgroundColor:'rgba(255,0,0,0.1)' }}>
                <Card.Header>Deaths</Card.Header>
                <Card.Body>
                    <Card.Title>{!deaths ? 'Loading...' : (<CountUp
                        start={0}
                        end={fetchedCountry.deaths?fetchedCountry.deaths.value:deaths.value}
                        duration={2}
                        separator=','
                    />)}</Card.Title>
                    <Card.Text>
                        {new Date(lastUpdate).toDateString()}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
        </Row>
            </Container>
    )
}

export default Cards