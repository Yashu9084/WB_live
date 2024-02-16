import styled from "styled-components";
// import {BsShare} from 'react-icons/bs'
import { BsShare } from 'react-icons/bs'
import { GrPrevious } from 'react-icons/gr'
import { useRouter } from "next/router";


export default function BreadCrumb({ meta_title }) {

    const router = useRouter();
    return (
        <Wrapper className="container-l">

            {/* <GrPrevious className="previous-icon"  onClick={()=>{router.back();}}/> */}
            {/* <BsFillArrowLeftCircleFill className="previous-icon"  onClick={()=>{router.back();}}/> */}
            {/* <span>Filter(4)</span> */}
            {/* <span>{meta_title.split("|")[0] || ""} </span> */}
            <span className="icon-container" onClick={()=>{router.back();}}>
                <GrPrevious className="icon" />
            </span>
            <span className="icon-container">
                <BsShare className="icon" />
            </span>

        </Wrapper>
    )
}



const Wrapper = styled.div`

 display: flex;
 align-items: center;
 justify-content: space-between;
 padding: 1rem 2rem;
 /* gap: 2rem; */
 /* height: 5rem; */
 /* .previous-icon{
    font-size: 3rem;
    color: var(--para);
    cursor: pointer;
 }
 span{
    color: var(--para);
    font-size:1.8rem;
    font-family: "Poppins";
 } */

 .icon-container{
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--gray);
    border-radius:50%;
    width: 25px;
    height: 25px;
    .icon{
        font-size: 2rem;
    color: var(--para);
    cursor: pointer;
    }

    
}
`