import styled from "styled-components";
import {  useMemo, useState } from "react";
import { IoIosPeople } from 'react-icons/io'
import { useRouter } from "next/router";
import Veg from "@/components/miscellaneous/Veg";
import { memo } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosCall } from 'react-icons/io'


// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Thumbs, Pagination, Autoplay } from "swiper";
import Image from "next/image";
import RatingCard from "@/components/miscellaneous/RatingCard";
import CallingRequest from "@/lib/request/callingrequest/CallingRequest";
import Assured from "@/components/miscellaneous/Assured";

function VenueCard2({ venue, city,openLeadModel,callConversion }) {

    const images = venue.images?.split(",");

    // console.log("from venue card")


    // Remove the html tags
    function removeHTMLTags(text = "") {
        // console.log("Inside the funtion")
        return text.replace(/<.*?>/g, '');
    }

    async function handleAnchorClick(e,slug) {
        e.stopPropagation();
        await CallingRequest(slug);

    }

    // const venue_summary = removeHTMLTags(venue?.summary);
    const venue_summary = useMemo(() => {
        return (removeHTMLTags((venue && venue["summary"]) || ""))
    }, [venue]);



    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const router = useRouter();

    return (

        <Wrapper>



            <div className="image-slider">
                {/* Top image thumbnail */}
                <Swiper
                    style={{
                        '--swiper-navigation-color': '#fff',
                        '--swiper-pagination-color': '#fff',
                    }}
                    loop={true}
                    spaceBetween={10}
                    pagination={{
                        // dynamicBullets: true,
                    }}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    // navigation={true}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[FreeMode, Thumbs, Pagination, Autoplay]}
                    className="mySwiper2"
                    onClick={() => { router.push(`/${city}/${venue?.slug}`) }}
                >

                    {
                        images?.slice(0, 4).map((image, index) => {
                            return (
                                <SwiperSlide key={index} className="image-container">
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_MEDIA_PREFIX}/${image}`}
                                        fill
                                        sizes="(100vw)"
                                        alt="venue-img"
                                    />
                                </SwiperSlide>
                            )
                        })
                    }

                    <div className="rate">
                        <RatingCard />
                    </div>

                    {
                        venue?.wb_assured && (<Assured/>)
                    }
                
        

                </Swiper>

                {/* //botton thumb Image slider */}
                <Swiper
                    onSwiper={setThumbsSwiper}
                    loop={true}
                    spaceBetween={5}
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Thumbs]}
                    className="mySwiper"
                >
                    {
                        images?.slice(0, 4).map((image, index) => {
                            return (
                                <SwiperSlide key={index} className="image-container">
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_MEDIA_PREFIX}/${image}`}
                                        fill
                                        sizes="(100vw)"
                                        alt="venue-img"
                                    />
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            </div>

            <div className="content" onClick={() => {router.push(`/${city}/${venue?.slug}`) }}>
                <div className="venue-basic-info">
                    <div className="name-address">
                        <h2 className="venue-name">{venue?.name}</h2>
                        <address>{venue?.venue_address}</address>
                    </div>
                    <div className="phone">
                        {/* <a href={`tel:0${venue.phone}`} onClick={(e)=>{handleAnchorClick(e,venue.slug);openLeadModel(e,venue.slug,venue.id,"call")}} aria-label="call icon ">
                            <IoIosCall className="phone-icon" />
                        </a> */}
                        <a href={`tel:0${venue.phone}`} onClick={(e)=>{handleAnchorClick(e,venue.slug);callConversion(e,venue.slug,venue.id)}} aria-label="call icon ">
                            <IoIosCall className="phone-icon" />
                        </a>
                    </div>
                </div>

                <div className="venue-aditional-info">
                    <div className="guests detail-circle">
                        <IoIosPeople className="icon" />
                        <p>{`${venue?.min_capacity}-${venue?.max_capacity} guest`}</p>
                    </div>
                </div>
                <p className="venue-description">{`${venue_summary?.slice(0, 80)} `}<span className=" read-more-btn">read more...</span></p>

                <div className="price-contianer">
                    <div className="veg-price"> 
                        <Veg color={"green"} /> <p>Veg: <del className="price">₹{venue?.veg_price}</del>/Plate</p>
                    </div>
                    {/* This line will only the the non veg rate if availabe otherwise it show blank */}
                    {
                        venue?.nonveg_price != "0" && (<div className="nonveg-price">
                            <Veg color={"red"} /> <p>Non Veg: <del className="price">₹{venue?.nonveg_price}</del>/Plate</p>
                        </div>)
                    }


                </div>

                <div className="action-btns">
                    {/* <button className="venue-card-btn" onClick={(e) => { setSelectedCard(venue.slug); setIsLeadsModelOpen(true); e.stopPropagation(); }}>GET QUOTATION</button> */}
                    <button className="venue-card-btn" onClick={(e)=>{openLeadModel(e,venue?.slug,venue?.id);e.stopPropagation()}}>GET QUOTATION</button>
                </div>

            </div>


        </Wrapper >

    );
}
// By changing the side filter section, now this will not re-render again and again 
export default memo(VenueCard2);

const Wrapper = styled.div`
border: 8px solid #f2f2f2;
/* border: 6px solid green; */
display: grid;
grid-template-columns: 3fr 6fr;
padding: 1rem;
max-width: 110rem;
/* max-height: 400px; */
margin: 0rem auto 1rem auto;
gap: 1rem;


.image-slider{
    position: relative;
    /* width: 100%; */
    height: 280px;
    z-index: 0;


    .mySwiper2{
        position: relative;
        max-width: 35rem;
        margin-bottom: 2px;
        cursor: pointer;
        height: 80%;

        .rate{
            position: absolute;
            z-index: 1;
            bottom:10px;
            left: 10px;
        }
   
    }
    .mySwiper{
        max-width: 35rem;
        height: 20%;
        cursor: pointer;


    }
    .image-container{
        position: relative;
    }
}





.content{
    
    /* border: 2px solid black; */
    padding: 1rem;
    cursor: pointer;
    display: flex;
    flex-direction:column;
    justify-content: space-between;
    gap: 1.5rem;
    max-width: 100%;
    white-space: nowrap; 
    overflow: hidden; 
    text-overflow: ellipsis;

    .venue-basic-info{
        /* border: 1px solid blue; */
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;

        .name-address{
            /* border: 1px solid red; */
            display: flex;
            flex-direction:column;
            gap: .5rem;
            white-space: nowrap; 
            overflow: hidden; 
            text-overflow: ellipsis; 

            .venue-name{
                font-size: 2.2rem;
                color: var(--primary-color);
                font-weight: 600;
                font-family: "Montserrat";
                white-space: nowrap; 
                overflow: hidden; 
                text-overflow: ellipsis; 

            }
            address{
                font-size: 1.6rem;
                font-style: normal;
                font-weight: 500;
                /* color: var(--primary-color);
                */
                color: var(--para);
                max-width: 400px;
                /* border: 1px solid black; */
                font-family: "Poppins";
                white-space: nowrap; 
                overflow: hidden; 
                text-overflow: ellipsis; 
                
                

            }
        }
    
        .phone{

            background-color:var(--phone);
            min-width: 40px;
            min-height: 40px;
            border-radius: 1rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;

            .phone-icon{
                cursor: pointer;
                color: white;
                font-size: 3rem;
            }
        }
       

    }

    .venue-aditional-info{
        display: flex;
        flex-wrap: wrap;

        .detail-circle{
            display: flex;
            gap: 3px;
            align-items: center;
            /* border: 1px solid gray; */
            padding: 2px 5px ;
            border-radius: 5px;
            color: var(--para);
            background-color: #F1F5FA;

            .icon{
                font-size: 2.2rem;
            }
            p{
                font-family: "Poppins";
                font-size: 1.5rem;
            }
        }
    }
    .venue-description{
        font-size: 1.6rem;
        color: var(--para);
        white-space: break-spaces;
        font-family: "Poppins";

        .read-more-btn{
            color: var(--info-color);
            cursor: pointer;
        }
    }
}


.price-contianer{
    display: flex;
    /* justify-content: space-between; */
    flex-wrap: wrap;
    gap: 2rem;

    .nonveg-price, .veg-price{
        align-items: center;
        justify-content:center;
        display: flex;
        gap: 1rem;
        
    }
    p{
        color: var(--para);
        font-size: 1.5rem;
    }
    .price{
        color: black;
        font-family: "Poppins";
        font-size: 1.8rem;
        font-weight: 600;

        font-size: 2.2rem;
        font-family: "Montserrat";
        /* font-weight: bold; */
    }

}


.action-btns{
    /* padding: 2rem 1rem; */
    margin-top: 1rem;
    /* padding-right: 3rem; */
    display: flex;
    align-items: center;
    .venue-card-btn{
        border: none;
        white-space: nowrap;
        background:none;
        width: 100%;
        /* box-sizing: border-box; */
        border: 1px solid #F33232;
        /* color: #F33232; */
        padding: 1rem 2.5rem;
        text-transform: uppercase;
        border-radius:.5rem;
        font-size: 1.8rem;
        cursor: pointer;
        transition: all .3s linear;
        background: #F33232;
        color: white;

    }

    .know-more{
        color: var(--info-color);
        font-size: 1.7rem;
        font-family: "Poppins";
        text-decoration: underline;
        cursor: pointer;
    }

}


@media (max-width:850px) {

    .image-slider{

        height: 250px;

        .mySwiper2{
            max-width: 30rem;

        }
        .mySwiper{
            max-width: 30rem;
        }

    }
    
}

@media (max-width:680px) {

    grid-template-columns: 1fr;
    display: grid;
    padding: 1rem;
    max-width: 45rem;
    .image-slider{

        max-width: 100%;
        height: 200px;
        overflow: hidden;
        
        .mySwiper2{
            /* max-width: 40rem; */
            max-width: 100%;
            height: 100%;

        }
        .mySwiper{
            display: none;
        }

    }

    
}

@media (max-width:450px) {
    max-width: 100%;
}


`
