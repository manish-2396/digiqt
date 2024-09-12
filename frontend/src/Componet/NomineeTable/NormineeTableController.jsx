import React, { useCallback, useEffect, useState } from 'react'
import NormineeTableView from './NormineeTableView'
import api from '../../Axios'
import { useNavigate } from 'react-router-dom'

const NormineeTableController = () => {

  const [data, setData] = useState([])
  const [isEdit, setEdit] = useState(false)
  const [isPinCodeExist, setIspinCodeExist] = useState(false);

  const [showModal, setShowModal] = useState(false);



  const [id, setId] = useState("")
  const [isValid, setValid] = useState(true)

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const [sameAddress, setSameAddress] = React.useState(true);
  const [form, setForm] = useState({
    relationShip: "",
    nomineeName: "",
    DOB: "",
    address: "",
  })
  const [address , setAdress] = useState(
    {
      pin:"",
      add:""
    }
  )
  const navigate = useNavigate();

  const getData = useCallback(async () => {
    try {
      const response = await api.get(`/nominee/get`);
      setData(response?.data?.data)
    } catch (err) {
      console.error(err)
    }
  }, [])

  useEffect(() => {
    getData()
  }, [isEdit])

  const handleOpenModal = (nominee) => {
    setShowModal(true);
    setId(nominee._id)
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setId("")
  };

  const handleSelect = (event) => {
    setForm({
      ...form,
      relationShip: event?.target?.value
    })
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (handleValidation(name, value)) {
      setForm({
        ...form,
        [name]: value
      })
    }
  }

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
    console.log(name, value)
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
      console.log(obj[key], key)
      if (!obj[key] && obj[key] === "") {
        return true;
      }
    }
    return false;
  }

  const EditNomineeDetail = async (event) => {
    event.preventDefault();
    if (isObjectEmpty(form)) return alert("enter all fields")
    if (id) {
      const response = await api.patch(`/nominee/update/${id}`, form);
      if (response?.status === 200) {
        setEdit(false)
        setId("")
      }
    }
  }

  let pin = form?.pincode?.trim();

  useEffect(() => {
    const checkPin = async () => {
      if (pin?.length === 6) {
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
          console.error(err)
        }
      }
    }
    checkPin(pin)
  }, [pin])

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }

  const handleEdit = (nominee) => {
    setEdit(true);
    setForm({
      ...form,
      ...nominee,
      DOB: formatDate(nominee?.DOB),
      pincode: nominee?.pincodeData[0]?.pincode,
    });
    setId(nominee._id)
    setAdress({
      pincode:nominee?.pincodeData[0]?.pincode,
      address:nominee?.address
    })
  }

  const handleBack = () => {
    setEdit(false);
  }

  const handleForm = () => {
    navigate("/form")
  }

  const handleDelete = async () => {
    if (id) {
      const data = await api.delete(`/nominee/remove/${id}`);
      handleCloseModal();
      getData();
    }
  }


  const handleSameAddress = (nominee) => {
    setSameAddress(true);
    setForm({
        ...form,
        address:address?.address,
        pincode: address.pincode,
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

  return (
    <NormineeTableView
      data={data}
      handleEdit={handleEdit}
      isEdit={isEdit}
      handleBack={handleBack}
      handleForm={handleForm}
      sameAddress={sameAddress}
      setSameAddress={setSameAddress}
      form={form}
      handleChange={handleChange}
      handleSelect={handleSelect}
      isPinCodeExist={isPinCodeExist}
      EditNomineeDetail={EditNomineeDetail}
      showModal={showModal}
      handleOpenModal={handleOpenModal}
      handleCloseModal={handleCloseModal}
      handleDelete={handleDelete}
      isValid={isValid}
      handleSameAddress={handleSameAddress}
      handleNewAddress={handleNewAddress}
      toggleDropdown={toggleDropdown}
      isDropdownOpen={isDropdownOpen}
    />
  )
}

export default NormineeTableController


