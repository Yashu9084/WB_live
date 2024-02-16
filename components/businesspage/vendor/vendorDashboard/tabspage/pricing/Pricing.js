import Heading from "@/components/miscellaneous/Heading";
import styled from "styled-components";
import { useState } from "react";
import { AiOutlinePlus } from 'react-icons/ai'
import { parseCookies } from "nookies";
import { Spinner1 } from "@/styles/components/spinner";

export default function Pricing({ vendorContent, setVendorContent }) {

    const cookies = parseCookies()
    const {token} = JSON.parse(cookies["@VendorApp"] || "")

    const [inputPriceList, setInputPriceList] = useState(vendorContent?.package_option?.split(",") || [""]);
    const [isLoading,setIsLoading] = useState(false);
    // const [otherPrices, setOtherPrices] = useState([]);

    const [formData, setFormData] = useState(vendorContent || {})

    const handleFormInput = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handlePriceChange = (index, event) => {
        // console.log(index,event)
        const newPriceList = [...inputPriceList];
        newPriceList[index] = event.target.value;
        setInputPriceList(newPriceList);

    }
    
    const handleAddPriceInput = () => {
        setInputPriceList(prevState => [...prevState, ""]);
    }



    const handleUpdate = async () => {
        // console.log("Button clicked")
        // console.log(formData)



        try {
            setIsLoading(true)
            
            const otherPrices = inputPriceList.filter((price) => price !== "" && !price.includes('\n'))
            // console.log({ ...formData, package_option: otherPrices.toString() })

            const url = `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/business/update_user_content`;


            let response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "bearer": token,
                },
                body: JSON.stringify({ ...formData, package_option: otherPrices.toString() })
            })


            response = await response.json();

            // console.log(response);

            if (response.success) {
                // console.log(response)
                setVendorContent(response.data)
                alert("Successfully ")
            } else {
                alert("something went wroung")
            }


        } catch (error) {
            console.log(error);

        }
        setIsLoading(false)
    }


    return (
        <Wrapper>
            <div className="container">
                <Heading text={"Update Pricing Details"} />

                <div className="form-container">
                    <div className="form-item">
                        <label htmlFor="packageprice">Package </label>
                        <input type="number" id="packageprice" name="package_price" value={formData?.package_price} onChange={handleFormInput} />
                    </div>
                    <Heading text={"other Pricing"} />
                    {
                        inputPriceList?.map((price, i) => {
                            return (
                                <div className="form-item" key={i}>
                                    <label htmlFor="name">Package Option: {i + 1} </label>
                                    <input type="text" id="name" name="name" value={price} onChange={(e) => handlePriceChange(i, e)} />
                                </div>
                            )
                        })
                    }
                    <div className="form-btn">
                        <span>
                            <AiOutlinePlus className={'plus-icon'} onClick={handleAddPriceInput} />
                        </span>
                    </div>
                    <div className="form-btn">
                        <button className="btn" onClick={handleUpdate}>{isLoading ? <Spinner1/> : "Update"}</button>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
}


const Wrapper = styled.section`

.form-container{
    display: flex;
    flex-direction: column;
    gap: 3rem;
    padding: 2rem 0rem;
    margin: auto;
}

.form-item{
    background-color: #FFF5F5;
    display: flex;
    /* padding: 1rem; */
    border-left: 5px solid var(--primary-color);
    border-bottom:1px solid var(--primary-color);

    input,select{
        font-size: 1.8rem;
        font-family: "Poppins";
        border: none;
        color: var(--para);
        width: 100%;
        outline: none;
        padding: 1.5rem;
        font-weight: 500;
        background-color: transparent;
    }
    .dropdown{
        /* border: 1px solid red; */
        width: 100%;
    }
    label{
        display: inline-block;
        font-family: "Poppins";
        font-weight: 500;
        color: var(--para);
        white-space: nowrap;
        min-width:200px;
        /* width: 15%; */
        background-color: #FFEEEE;
        padding: 1.5rem;

        font-size: 2rem;
    }
}
.form-btn{
    text-align: center;

    .btn{
        background-color: var(--primary-color);
        color: white;
        font-size: 1.8rem;
        font-family: "Poppins";
        border: none;
        width:200px;
        border-radius: 5px;
        padding: .5rem 5rem;
    }
    .plus-icon{
        font-size: 3rem;
        cursor: pointer;

    }
}

@media (max-width:600px) {

.form-item{
    flex-direction: column;
}
.form-container{
    gap: 1.5rem;

}
}
`