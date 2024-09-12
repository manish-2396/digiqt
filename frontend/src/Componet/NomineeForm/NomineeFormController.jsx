import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import NomineeFormView from './NomineeFormView'
import api from "../../Axios"

const NomineeFormController = () => {

    const [sameAddress, setSameAddress] = React.useState(false);
    const [form, setForm] = useState({
        relationShip: "",
        nomineeName: "",
        DOB: "",
        address: ""
    })
    const [isValid, setValid] = useState(false)
    const [isPinCodeExist, setIspinCodeExist] = useState(false)
    const navigate = useNavigate();

    function isAdult(DOB) {
        const today = new Date();
        const birthdateObj = new Date(DOB);

        let age = today.getFullYear() - birthdateObj.getFullYear();
        const monthDiff = today.getMonth() - birthdateObj.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdateObj.getDate())) {
            age--;
        }
        return age >= 18;
    }

    const handleValidation = (name, value = "") => {
        if (name === "nomineeName") {
            const regex = /^[a-zA-Z\s]*$/;
            return regex.test(value);
        } else if (name === "pincode") {
            const regex = /^[\d\s]*$/;
            return regex.test(value);
        } else if (name === "DOB") {
            let test = isAdult(value);
            setValid(test);
            return true
        } else {
            return true
        }
    }

    function isObjectEmpty(obj) {
        for (let key in obj) {
            if (!obj[key] && obj[key] === "") {
                return true;
            }
        }
        return false;
    }

    const handleSelect = (event) => {
        setForm({
            ...form,
            relationShip: event?.target?.value
        })

    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (handleValidation(name, value)) {
            console.log(handleValidation(name, value))
            setForm({
                ...form,
                [name]: value
            })
        }
    }

    const AddNomineeDetail = async (event) => {
        event.preventDefault();

        console.log(form)

        if (!isValid) return
        if (isObjectEmpty(form)) return alert("enter all fields")
        const response = await api.post(`/nominee/add`, form);

        if (response?.status === 201) {
            navigate('/');
        }


    }

    let pin = form?.pincode?.trim();

    useEffect(() => {
        const checkPin = async () => {
            if (pin?.length > 3) {
                try {
                    const response = await api.get(`/nominee/isCheck/${pin}`);
                    const { _id, city, country, pincode, state } = response?.data?.data
                    setIspinCodeExist(true)
                    setForm({
                        ...form,
                        pincodeId: _id,
                        city,
                        country,
                        pincode,
                        state
                    })
                } catch (err) {
                    setIspinCodeExist(false)
                    setForm({
                        ...form,
                        city: "",
                        country: "",
                        state: ""
                    })
                    console.log(err)
                }
            }
        }
        checkPin(pin)
    }, [pin])

    const handleSameAddress = () => {
        let address = "53 Shakti Vijay Society near Megh Dhanush Society piplod";
        let pincode = "395007"
        setSameAddress(true);
        setForm({
            ...form,
            address,
            pincode
        })
    };

    const handleNewAddress = () => {
        setSameAddress(false);
        setIspinCodeExist(false)
        setForm({
            ...form,
            address: "",
            pincode: "",
            city: "",
            country: "",
            state: ""
        })
    }

    const handleBack = () => {
        navigate("/")
    }

    return (
        <NomineeFormView
            handleChange={handleChange}
            handleSameAddress={handleSameAddress}
            sameAddress={sameAddress}
            handleNewAddress={handleNewAddress}
            handleSelect={handleSelect}
            form={form}
            AddNomineeDetail={AddNomineeDetail}
            handleBack={handleBack}
            isPinCodeExist={isPinCodeExist}
            isValid={isValid}
        />
    )
}

export default NomineeFormController;

