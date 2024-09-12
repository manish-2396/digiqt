import React from 'react';
import styled from "./Norminee.module.css"

const NomineeFormView = (props) => {

  const { handleSameAddress,
    handleNewAddress,
    sameAddress,
    handleSelect,
    handleChange,
    form,
    AddNomineeDetail,
    handleBack,
    isPinCodeExist,
    isValid
  } = props


  return (
    <div className={styled.formContainer}>
      <h2>Add Nominee</h2>
      <form onSubmit={AddNomineeDetail}>
        <div className={styled.formGroup}>
          <label>Relationship*</label>
          <select onChange={handleSelect} defaultValue={form?.relationShip}>
            <option value="">Select</option>
            <option value="spouse">Spouse</option>
            <option value="child">Child</option>
            <option value="parent">Parent</option>
          </select>
        </div>

        <div className={styled.formGroup}>
          <label>Nominee Name*</label>
          <input type="text" name="nomineeName" placeholder="Enter nominee name" value={form?.nomineeName} required onChange={handleChange} />
        </div>

        <div className={styled.formGroup}>
          <label>Date of Birth*</label>
          <input type="date" name="DOB"  required onChange={handleChange} />
          {form?.DOB && !isValid && <span className={styled.error}>should be 18 year or above</span>}
        </div>

        <div className={styled.formGroup}>
          <label>Address*</label>
          <div className={styled.addressChoice}>
            <input
              type="radio"
              name="addressOption"
              checked={!sameAddress}
              onChange={handleNewAddress}
            />
            <label>Field to enter complete address</label>
            <input
              type="radio"
              name="addressOption"
              checked={sameAddress}
              onChange={handleSameAddress}
            />
            <label>Same as my address</label>
          </div>
            <div className={styled.addressField}>
              <input type="text" placeholder="Enter full address" disabled={sameAddress} name="address" value={form?.address} required onChange={handleChange} />
              <div className={styled.addressDetails}>
                <input disabled={sameAddress} type="text" placeholder="Pincode*" name="pincode" value={form?.pincode} required onChange={handleChange} />
                <input disabled={isPinCodeExist} type="text" placeholder="City*" name="city" value={form?.city} required onChange={handleChange} />
                <input disabled={isPinCodeExist} type="text" placeholder="State*" name="state" value={form?.state} required onChange={handleChange} />
                <input disabled={isPinCodeExist} type="text" placeholder="Country" name="country" value={form?.country} onChange={handleChange} />
              </div>
            </div>
        </div>

        <div className={styled.formButton}>
        <button type="button" onClick={handleBack}  className={styled.saveButton}>
            Back
          </button>
          <button type="submit" className={styled.saveButton}>
            Save Details
          </button>
        </div>
      </form>
    </div>
  )
}

export default NomineeFormView
