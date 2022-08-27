import React, { useState, useEffect, useRef } from 'react'
import api from '../../services/api'
import { debounce, get } from "lodash";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import Table from '../../components/Table'
import {Container, Paginator, PageInfo, SwitchContainer} from './Styled'

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function Home(){
    const [blottlers, setBlotters] = useState([]);
    const [ticker, setTicker] = useState("");
    const [price, setPrice] = useState(null);
    const [volume, setVolume] = useState(null);
    const [triggerFilter, setTriggerFilter] = useState(false); 
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [controlUpdate, setCOntrolUpdate] = useState(true);
    const [aggregate, setAggregate] = useState(false);
    const aggregateRef = useRef(aggregate);
    const tickerRef = useRef(ticker);
    const priceRef = useRef(price);
    const volumeRef = useRef(volume);

    async function getBottlers(){
        let query = `/first_task/?page=${page}`
        aggregateRef.current = aggregate;
        if(aggregate){
            query+="&aggregate=true"
        }
        if(aggregate){
            getFilteredBlotters();
        }else{
            const response = await api.get(query);
            // console.log(response.data);
            setBlotters(b=>JSON.parse(response.data.data));
            setTotalPages(e=>response.data.total_pages);
        }

    }
    useEffect( ()=>{
        
        getBottlers();
        // getFilteredBlotters();

    }, []);

    
    useEffect( ()=>{ // para levar em consideracao a mudanca atual no input
        getFilteredBlotters();
    }, [triggerFilter, page]);


    useEffect( ()=>{

        const id = setInterval(() => {
            const ag = aggregateRef.current;
            updateOnClock();
            setCOntrolUpdate(c=>!c)
        }, 30*1000);
        return () => clearInterval(id);

    }, [controlUpdate]);
    
 

    useEffect(()=>{
        aggregateRef.current = aggregate
        tickerRef.current = ticker
        priceRef.current = price
        volumeRef.current = volume
    }, [aggregate, ticker, price, volume])



   const updateOnClock = async () => {


        let queryParams = !!priceRef.current? `price=${priceRef.current}` :  ""
        queryParams +=  !!volumeRef.current? `&volume=${volumeRef.current}` : ""
        queryParams +=  !!tickerRef.current? `&ticker=${tickerRef.current}` : ""
        queryParams +=  !!aggregateRef.current? `&aggregate=${aggregateRef.current}` : ""
        queryParams +=  `&page=${page}`

        if(queryParams[0] === "&"){
            queryParams = queryParams.slice(1);
        }

        queryParams="?".concat(queryParams);
    
        const response = await api.get(`/first_task/${queryParams}`);
        setBlotters(e=>JSON.parse(response.data.data));
        setTotalPages(e=>response.data.total_pages);

    }

   const getFilteredBlotters = debounce(async () => {

    updateOnClock();

    }, 500);



  

    return (
        <Container>      
      
            <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    >
                    <TextField id="outlined-basic" 
                    onChange={e=>{
                            // setTicker(e.target.value.toUpperCase().replace(/ /g,''));
                            setTicker(e.target.value.replace(/ /g,''));
                            setTriggerFilter(!triggerFilter);
                        }} 
                        label="Ticker" 
                        variant="outlined" />


                    <TextField id="outlined-basic" 
                    onChange={e=>{
                        setVolume(e.target.value.replace(/ /g,''));
                        setTriggerFilter(!triggerFilter);
                    }} 
                     label="Volume"
                     variant="outlined" />

                    <TextField id="outlined-basic"
                     onChange={e=>{
                        setPrice(e.target.value.replace(/ /g,''));
                        setTriggerFilter(!triggerFilter);
                    }} 
                     label="Preço"
                     variant="outlined" />
            </Box>

            <SwitchContainer>
                <FormControlLabel control={<Switch />} label="aggregate" onClick={e=>{
                    setAggregate(ag=>!ag)
                    setTriggerFilter(t=>!t);
                }}/>
            </SwitchContainer>
         
            <Table 
            data={
                blottlers
            }
            total_pages={totalPages}
            />

            <Paginator>

            <PageInfo>

                            <p>
                                Pagina: {page}
                            </p>
            {!aggregate &&                            
                            <p>
                                Total de paginas: {Math.ceil(totalPages/10)}
                            </p>}
            </PageInfo>

                <IconButton size='small' onClick={e=> ((page-1) >= 1) && setPage(p=>p-1)}>
                    <ArrowBackIosNewIcon /> 
                    <p style={{color:""}}>Anterior</p>
                </IconButton>

                <IconButton  size='small' onClick={e=> ((page+1) <= totalPages) && setPage(p=>p+1)}>
                    <ArrowForwardIosIcon  />
                    <p>Próxima</p>
                </IconButton>
              
            </Paginator>

        </Container>
    );
}