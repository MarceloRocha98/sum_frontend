import React, {useState, useEffect} from 'react';
import {Table as Tb, Td, Tr, Thead, Tbody} from './Styled'
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';




import api from '../services/api'

export default function Table(props){
    const [rows, setRows] = useState(0);
    const [newData, setNewData] = useState([]);



async function createBlotter(i){ // incompleta
    const body = newData[i];
    console.log(body);

    try{
        const response = await api.post('/trading/blotter/', body)
        alert("Dados enviados com sucesso")
        setRows(0);
    }catch(err){
        console.log(err);
        alert("Ocorreu algum erro, verifique os dados fornecidos e tente novamente")
  

   
    }

}


 

    return(
    <div >
              
            <Tb>
    
    <Thead>

   
                    <Tr>
                        <th>
                            ticker
                        </th>
                        <th>
                            volume
                        </th>
                        <th>
                            price
                        </th>
                        <th>
                            user_name
                        </th>
                        <th>
                            user_email
                        </th>
                        <th>
                            
                        </th>
                    </Tr>
            </Thead>
                        <Tbody>
                {props.data.map(blotter =>(

                            <Tr>
                             

        <Td> {blotter.ticker}</Td>
        <Td> {blotter.volume}</Td>
        <Td> {blotter.price}</Td>
        <Td> {blotter.user_name}</Td>
        <Td> {blotter.user_email}</Td>
        <Td> </Td>
                                
                            </Tr>


        ))}
  
        { rows!==0 && 
             <>
                {Array.from(Array(rows), (e, i) => (
                    <Tr>
                            <Td>  <TextField id="outlined-basic" label="ticker" variant="outlined"
                             onChange={e=>{
                                setNewData(data =>{
                                    data[i].ticker = e.target.value
                                    return data
                                })
                             }}
                            />   </Td>
                            <Td>   <TextField id="outlined-basic" label="volume" variant="outlined"
                            onChange={e=>{
                                setNewData(data =>{
                                    data[i].volume = e.target.value
                                    return data
                                })
                                }}
                            />  </Td>
                            <Td>   <TextField id="outlined-basic" label="price" variant="outlined" 
                            onChange={e=>{
                                setNewData(data =>{
                                    data[i].price = e.target.value
                                    return data
                                })
                                }}
                            />  </Td>

                            <Td>   <TextField id="outlined-basic" label="username" variant="outlined" 
                            onChange={e=>{
                                setNewData(data =>{
                                    data[i].name = e.target.value
                                    return data
                                })
                                }}
                            />  </Td>

                            <Td>   <TextField id="outlined-basic" label="email" variant="outlined" 
                            onChange={e=>{
                                setNewData(data =>{
                                    data[i].email = e.target.value
                                    return data
                                })
                                }}
                            />  </Td>
                        
                            
                            <Td>   
                            <Button variant="contained" onClick={e=>createBlotter(i)} endIcon={<SendIcon />}>
                                    Send
                            </Button>
                            </Td>
                    </Tr>
         ))}
            </>}

            <Tr>
                <Td>     </Td>
                <Td>     </Td>
                <Td>     </Td>
                <Td>     </Td>
                <Td>     </Td>

                <Td>
                    <IconButton onClick={e=>{
                        setRows(rows+1)
                        setNewData(newData=>[...newData, {}])
                        console.log(newData)
                      

                    }} aria-label="add" size="small">
                        <AddIcon />
                    </IconButton>
                </Td>
            </Tr>

                        </Tbody>

     

            </Tb>

    
            
                 

    </div>
    );
}