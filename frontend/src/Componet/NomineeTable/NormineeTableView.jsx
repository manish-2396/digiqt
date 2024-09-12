import React from 'react'
import styled from "./NomineeTable.module.css"

const NormineeTableView = (props) => {

  const {
    data,
    handleEdit,
    isEdit,
    EditNomineeDetail,
    handleChange,
    handleSelect,
    form,
    sameAddress,
    setSameAddress,
    handleCheckboxChange,
    handleBack,
    handleForm,
    isPinCodeExist,
    showModal,
    handleOpenModal,
    handleCloseModal,
    handleDelete,
    isValid,
    handleSameAddress,
    handleNewAddress,
  } = props

  return (
    <div>
      {
        !isEdit ? (
          <>
            <div>
              <button onClick={handleForm} className={styled.addNominee}>Add Nominee</button>
            </div>
            <table className={styled.nomineesTable}>
              <thead>
                <tr>
                  <th>Nominee Name</th>
                  <th>Relationship</th>
                  <th>Date of Birth</th>
                  <th>Address</th>
                  <th>Pincode</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Country</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data && data?.map((nominee) => (
                  <tr key={nominee._id}>
                    <td>{nominee.nomineeName}</td>
                    <td>{nominee.relationShip}</td>
                    <td>{new Date(nominee.DOB).toLocaleDateString()}</td>
                    <td>{nominee.address}</td>
                    <td>{nominee.pincodeData[0].pincode}</td>
                    <td>{nominee.pincodeData[0].city}</td>
                    <td>{nominee.pincodeData[0].state}</td>
                    <td>{nominee.pincodeData[0].country}</td>
                    <td>
                      <div className={styled.dropdown}>
                        <button onClick={() => handleEdit(nominee)}>Edit</button>
                        <button onClick={() => handleOpenModal(nominee)}>Remove</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <div>
            <div className={styled.formContainer}>
              <h2>Add Nominee</h2>
              <form onSubmit={EditNomineeDetail}>
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
                  <input type="date" name="DOB" required value={form?.DOB} onChange={handleChange} />
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
                    <input disabled={sameAddress} type="text" placeholder="Enter full address" name="address" value={form?.address} required onChange={handleChange} />
                    <div className={styled.addressDetails}>
                      <input disabled={sameAddress} type="text" placeholder="Pincode*" name="pincode" value={form?.pincode} required onChange={handleChange} />
                      <input disabled={isPinCodeExist} type="text" placeholder="City*" name="city" value={form?.city} required onChange={handleChange} />
                      <input disabled={isPinCodeExist} type="text" placeholder="State*" name="state" value={form?.state} required onChange={handleChange} />
                      <input disabled={isPinCodeExist} type="text" placeholder="Country" name="country" value={form?.country} onChange={handleChange} />
                    </div>
                  </div>
                </div>

                <div className={styled.formButton}>

                  <button type="button" onClick={handleBack} className={styled.saveButton}>
                    Back
                  </button>
                  <button type="submit" className={styled.saveButton}>
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        )
      }


      <div>
        {showModal && (
          <div className={styled.modal}>
            <div className={styled.modalContent}>
              are you sure removed this nominee?
              <div className={styled.formButton}>
                <button onClick={handleCloseModal} className={styled.saveButton}>Cancal</button>
                <button onClick={handleDelete} className={styled.saveButton}>Removed</button>
              </div>
            </div>
          </div>
        )}
      </div>


    </div>
  )
}

export default NormineeTableView
