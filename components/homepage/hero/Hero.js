import styled from "styled-components"
import Image from "next/image";
import SearchBar from "@/components/miscellaneous/Searchbar";
import Offer from "@/components/miscellaneous/Offer";

function Hero({ venueCategogies, cities }) {

    // console.log(venueCategogies)

    return (
        <Section className="section-hero">
            
            <div className="hero-container">
                <Image
                    src="/banner/banner.png"
                    alt="An example image"
                    fill={true}
                    priority={true}          //Remove Lazy Loading
                    quality={100}
                    sizes="(100vw)"
                />
                <div className="hero-title-container">
                    {/* <h1 className="title">10,000 + Venues & Vendors Get Everything You Need Here!</h1> */}
                    <h1 className="title">Weddings are for Life</h1>
                    <h1 className="title"> Make it Larger than Life!</h1>
                    <p className="description">Explore over 10,000+ Venues and Vendors with reviews, pricing and more.</p>
                </div>
                
                <SearchBar venueCategogies={venueCategogies} cities={cities} />
            </div>

            <Offer />
        </Section>
    )
}

export default Hero;

const Section = styled.section`

width: 100%;
/* border: 5px solid black; */
height: auto;


.hero-container{
    position: relative;
    width: 100%;
    height: 85vh;
    /* height: 600px; */


    .hero-title-container{
        /* border: 1px solid red; */
        position: absolute;
        top: 40%; right: 50%;
        transform: translate(50%,-50%);
        min-width: 70rem;
        /* padding: 0rem 1rem; */
        

        h1{
            text-align: center;
            /* font-style: italic; */
            color: white;
            font-size: 4rem;
            font-family: "Montserrat";
            
        }
        p{
            text-align: center;
            color: white;
            /* color: var(--secoundary-color); */
            font-size: 2rem;
            font-weight: 500;
            margin-top: 1rem;
            font-family: "Montserrat";

        }
        
    }

}

@media (max-width:800px) {
    .hero-container{
        position: relative;
        width: 100%;
        height: 450px;
    }
}

@media (max-width:550px) {

    .hero-container{
        position: relative;
        width: 100%;
        height: 350px;
    }

    .hero-title-container{
        position: absolute;
        top: 40%; right: 50%;
        transform: translate(50%,-50%);
        min-width:90% !important;

        

        h1{

            font-size: 2.5rem !important;
        }
        P{
            font-size: 1.8rem !important;
            padding: .5rem 1rem;
        }
        
    }

}
`