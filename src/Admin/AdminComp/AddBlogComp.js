import React, { useState } from 'react'

const AddBlogComp = () => {
    let [obj, set_obj] = useState({})

    let [input, set_input] = useState([])

    const set = (e) => {
        set_obj({ ...obj, [e.target.name]: e.target.value })
    }

    const set1 = (e, inp, index) => {
        const element = ({ ...inp, [e.target.name]: e.target.value })
        input.splice(index, 1, element)
        set_input([...input])
    }

    const create_inputs = () => {

        if (input.length < 5) {
            set_input(input => [...input, { id: input.length + 1 }])
        } else {
            alert('No More Inputs aree Allowed')
        }
    }

    const radio = (e) => {
        set_obj({ ...obj, Status: e.target.id })
    }

    return (
        <div>
            <div className="checkout-wrap ptb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-xxl-8 col-xl-7 col-lg-7">
                            <form action="#" className="checkout-form">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <h3 className="checkout-box-title">Add your blogs</h3>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <input type="text" name="Title" onChange={set} value={obj.Title ? obj.Title : ""} placeholder="Title" required />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <input type="text" name="Author" onChange={set} value={obj.Author ? obj.Author : ""} placeholder="Author" required />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <input type="text" name="Heading" onChange={set} value={obj.Heading ? obj.Heading : ""} placeholder="Heading" required />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <textarea name="Description" onChange={set} value={obj.Description ? obj.Description : ""} placeholder='Enter the Description'></textarea>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <input type="text" name="Category" onChange={set} value={obj.Category ? obj.Category : ""} placeholder="Category" required />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <a href="checkout.html" className="btn-two w-100 d-block">Upload Heading Image<i className="flaticon-right-arrow" /></a>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <input type="text" name="Tags" onChange={set} value={obj.Tags ? obj.Tags : ""} placeholder="Tags" required />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <a onClick={create_inputs} className="btn-two w-100 d-block">Create sub Heading<i className="flaticon-right-arrow" /></a>
                                        </div>
                                    </div>
                                    {
                                        input ? input.map((inputs, index) => {
                                            return (
                                                <div key={index} className='row'>
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <input type="text" onChange={(e) => set1(e, inputs, index)} name="Sub_heading" placeholder={`Sub Heading-${inputs.id}`} required />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <input type="text" onChange={(e) => set1(e, inputs, index)} name="Sub_Heading_Description" placeholder={`Sub Heading Description-${inputs.id}`} />
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }) : ""
                                    }


                                    <div className="col-lg-12">
                                        <div className="checkout-box" style={{ backgroundColor: 'transparent' }}>
                                            <div className="checkout-details">
                                                <div className="bill-details">
                                                    <div style={{ display: "flex", flexWrap: "nowrap" }} className="select-payment-method mt-20">
                                                        <div>
                                                            <span style={{ fontSize: "20px" }}>Status:</span>
                                                        </div>
                                                        <div>
                                                            <input type="radio" onClick={radio} id="Active" name="Status" />
                                                            <label htmlFor="Active">Active</label>
                                                        </div>
                                                        <div>
                                                            <input type="radio" onClick={radio} id="In-Active" name="Status" />
                                                            <label htmlFor="In-Active">In-Active</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-12 mt-4">
                                        <div className="form-group mb-0">
                                            <button type="submit" className="btn-one">Submit<i className="flaticon-right-arrow" /></button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-xxl-4 col-xl-5 col-lg-5">
                            <div className="sidebar">
                                <div className="checkout-box">
                                    <h4 className="cart-box-title">Your Order</h4>
                                    <div className="cart-total">
                                        <div className="cart-total-wrap">
                                            <div className="cart-total-item">
                                                <p>Product Name</p>
                                                <b>Total</b>
                                            </div>
                                            <div className="cart-total-item">
                                                <p>Subtotal</p>
                                                <span>$463.00</span>
                                            </div>
                                            <div className="cart-total-item">
                                                <p>Shipping</p>
                                                <span>$30.00</span>
                                            </div>
                                            <div className="cart-total-item">
                                                <p>Coupon</p>
                                                <span>$0.00</span>
                                            </div>
                                            <div className="cart-total-item">
                                                <p>Order Total</p>
                                                <span>$43.00</span>
                                            </div>
                                            <div className="cart-total-item">
                                                <p><b>Payable Total</b></p>
                                                <span>$450.00</span>
                                            </div>
                                        </div>
                                        <a href="checkout.html" className="btn-two w-100 d-block">Proceed To Checkout<i className="flaticon-right-arrow" /></a>
                                    </div>
                                </div>
                                <div className="checkout-box">
                                    <h4 className="cart-box-title">Direct Order By Bank</h4>
                                    <div className="checkout-details">
                                        <p>Make your payments directly to your bank account
                                            Use your order ID as the payment reference.
                                            Your order will not be sent until the funds
                                            in your account have been cleared.</p>
                                        <div className="bill-details">
                                            <div className="select-payment-method mt-20">
                                                <div>
                                                    <input type="radio" id="test3" name="radio-group" />
                                                    <label htmlFor="test3">Paypal</label>
                                                </div>
                                                <div>
                                                    <input type="radio" id="test2" name="radio-group" />
                                                    <label htmlFor="test2">Postpaid Payment</label>
                                                </div>
                                            </div>
                                            <div className="form-check checkbox style2">
                                                <input className="form-check-input" type="checkbox" id="test_2" />
                                                <label className="form-check-label" htmlFor="test_2">
                                                    I've read &amp; accept the <a href="terms-conditions.html">Terms &amp;
                                                        Conditions</a>
                                                </label>
                                            </div>
                                            <div className="checkout-footer mt-4">
                                                <button type="button" className="btn-one d-block w-100 mt-10">Place Order<i className="flaticon-right-arrow" /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AddBlogComp