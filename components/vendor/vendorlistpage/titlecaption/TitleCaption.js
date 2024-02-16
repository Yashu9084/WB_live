import Pagedescription from "@/components/miscellaneous/pagedescription/PageDescription";
import styled from "styled-components";

export default function TitleCaption ({caption,category,city,locality,count}){


    return(
        <Wrapper className="section title-caption-section">
            <div className="container">
                <h2 className="main-title">{`${category.replaceAll("-", " ")}  in ${locality === "all" ? city : locality}`} <span className="count">{`(${count})`}</span></h2>
                {/* <Pagedescription caption={caption}/> */}
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.section`


.main-title{
        font-family: "Montserrat";
        font-size:2.8rem ;
        text-align: center;
        text-transform: capitalize;

        .count{
            color: var(--para);
            font-size: 1.7rem;
            font-family: "Poppins";
        }
    }


`