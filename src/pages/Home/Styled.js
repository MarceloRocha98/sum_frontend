import styled from 'styled-components';

export const Container = styled.div`
        width: 800px;
        display:flex;
        flex-direction:column;
        margin: 20px auto;

        background-color:white;
        border-radius:10px;

               
        @media(max-width: 800px) {
                        width:100%;
              }


        

`;

export const Paginator = styled.div`
        display:flex;
        flex-direction:row;
        justify-content:space-between;

        // background-image: linear-gradient( 83.2deg,  rgba(150,93,233,1) 10.8%, rgba(99,88,238,1) 94.3% );

        padding: 10px 10px;
       
        @media(max-width: 800px) {
                flex-direction: column;
                position: relative;
              }
`

export const PageInfo = styled.div`
        display:flex;
        flex-direction:column;
        justify-content:space-between;

        @media(max-width: 800px) {
                text-align:center;
              }
`


export const SwitchContainer = styled.div`
              padding:10px;
`