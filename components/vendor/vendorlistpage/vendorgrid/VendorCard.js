import Image from "next/image";
import styled from "styled-components";
import { IoIosCall } from 'react-icons/io'
import RatingCard from "@/components/miscellaneous/RatingCard";
import { useRouter } from "next/router";
import { BiRupee } from 'react-icons/bi'
import { memo } from "react";
import CallingRequest from "@/lib/request/callingrequest/CallingRequest";
import Assured from "@/components/miscellaneous/Assured";

function VendorCard({ vendor, openLeadModel }) {

    // console.log("from vendor card")
    const image_url = vendor.images?.split(",")[0];
    // console.log(`${process.env.NEXT_PUBLIC_MEDIA_PREFIX}/${image_url}`)

    const router = useRouter();

    async function handleAnchorClick(e,slug) {
        e.stopPropagation();
        await CallingRequest(slug);

    }
    return (
        <Wrapper onClick={() => router.push(`/${"delhi"}/${vendor.slug}`)}>
            <div className="img-container">
                <Image
                    src={`${process.env.NEXT_PUBLIC_MEDIA_PREFIX}/${image_url}`}
                    fill={true}
                    alt="vendor-img"
                    sizes="(100vw)"
                />
                {
                    vendor?.wb_assured  == 1 && (<Assured/>)
                }
                {/* <div className="assured-contianer">
                    <MdCheckCircle className="check-icon" /> <h2> WB ASSURED</h2>
                </div> */}
                <div className="rate">
                    <RatingCard className="rate" />
                </div>
            </div>

            <div className="vendor-details">
                <div>

                    <h2 className="v-name">{vendor.brand_name}</h2>
                    <p className="v-add">{vendor.vendor_address}</p>
                </div>


            </div>

            <div className="price-stripe">

                <span className="price-title"> Package price</span>
                <span className="price"><BiRupee className="rupee-icon" />{vendor.package_price}</span>
            </div>

            <div className="action-btns">
                {/* <ButtonOutline>Venue Tour</ButtonOutline> */}
                <button className="venue-card-btn" onClick={(e) => { openLeadModel(e,vendor?.slug,vendor?.id), e.stopPropagation(); }}>Get Quotation</button>
                

                {/* In the anchor we are not calling the openLeadModel yet, In future we can implement this,  */}
                <a href={`tel:0${vendor.phone}`} onClick={(e)=>{handleAnchorClick(e,vendor?.slug)}} className="call-btn" aria-label="call icon ">
                    <IoIosCall className="call-icon" />
                </a>
            </div>

        </Wrapper>
    )
}


export default memo(VendorCard);

const Wrapper = styled.div`
    width:100%;
    z-index: 1;
    background-color: white;
    overflow: hidden;
    ${'' /* max-width: 45rem; */}
    border: 8px solid #f2f2f2;
    cursor: pointer;
    display: flex;
    flex-direction:column;
    gap: 1rem;
    .img-container{
        position: relative;
        margin: 1rem;
        height: 230px;

    .rate{
        position: absolute;
        z-index: 2;
        bottom: 10px;
        left: 10px;
    }
}

/* .assured-contianer{
    position: absolute;
    border: 3px solid #A06B14;
    padding:.5rem 1.5rem;
    background-color:#5C3900 ;
    top: 10px;
    gap:.5rem;
    left: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    .check-icon{
        font-size: 2rem;
        color: green;
    }
    h2{
        color: white;
        font-size: 1.4rem;
    }
} */




.vendor-details{

    padding: .5rem 1rem;
    display: flex;
    align-items: start;
    gap: .3rem;
    width: 100%;


    div{
        
        width: 100%;

    }


    .v-name{
        font-size: 2rem;
        color: var(--primary-color);
        font-weight: 600;
        font-family: "Montserrat";

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

    }

    .v-add{
        font-size: 1.6rem;
        font-style: normal;
        font-weight: 500;
        color: var(--primary-color);
        font-family: "Poppins";
        
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
       
    }

}
.price-stripe{

    background-color: var(--primary-color);
    /* width: 100%; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.2rem 1rem;

    .price-title,.price{
        color: white;
        /* color: black; */
        font-family: "Poppins";
        padding: .5rem;
        font-size: 1.8rem;
        font-weight: 400;
        display: flex;
        align-items: center;

    }
    .rupee-icon{
        color: white;
        font-size: 2.5rem;
    }
}


.action-btns{
    /* padding: 2rem 1rem; */
    margin-top: 1rem;
    /* padding-right: 3rem; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0rem 2rem 1rem 2rem ;

    .venue-card-btn{
        border: none;
        white-space: nowrap;
        background:none;
        border: 1px solid #F33232;
        padding: 1rem 2.5rem;
        text-transform: uppercase;
        border-radius:.5rem;
        font-size: 1.8rem;
        cursor: pointer;
        transition: all .3s linear;
        color: #F33232;

        &:hover{
            background-color: #F33232;
            color: white;
        }

    }
    .call-btn{
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid green;
        padding: .2rem .8rem;
        border-radius: .5rem;
        cursor: pointer;
        .call-icon{

            font-size: 30px;
            color: var(--phone);
        }

        &:hover{
            background-color: var(--phone) ;

            .call-icon{
                color: white;
            }
        }

    }


}


@media (max-width:1000px) {
    .img-container{
        height: 200px;
    }
}

`