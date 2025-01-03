import React, { useRef, useState } from 'react'
import imageCompression from 'browser-image-compression';
import Firebase from '../../Firebase';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddBlogComp = () => {
    let [obj, set_obj] = useState({})

    let [input, set_input] = useState([])

    let navigate = useNavigate()

    let [loader, set_loader] = useState(false)
    let [btn_disabler, set_btn_disabler] = useState(false)
    let [submit_string, set_submit_string] = useState("Submit")

    let heading_image_ref = useRef()
    let [heading_image, set_heading_image] = useState(null)

    let multi_image_ref = useRef()
    let [multi_image, set_multi_image] = useState([])
    let [multi_image_error, set_multi_image_error] = useState(null)

    let [user_key, set_user_key] = useState()

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("Usrs"))
        if (!user) {
            alert("Unauthorized User.")
            window.history.replaceState(null, null, "/login")
            return navigate('/', { replace: true })
        }
        set_user_key(JSON.parse(localStorage.getItem("Usrs")))
    }, [])

    useEffect(() => {
        multi_image_base64()
    }, [multi_image])

    async function multi_image_base64() {
        const options = {
            maxSizeMB: 2,
            useWebWorker: true,
        }

        if (multi_image.length !== 0) {
            let arr = []
            for (let i = 0; i < multi_image.length; i++) {

                var compressed_image = await imageCompression(multi_image[i], options)

                const read = new FileReader()
                read.readAsDataURL(compressed_image)
                read.onload = function () {
                    arr.push(read.result)
                    console.log(read)
                }
            }
            set_obj({ ...obj, "Multi_Images": arr })
        }
    }

    const set = (e) => {
        set_obj({ ...obj, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        set_obj({ ...obj, "Sub_headings": input })
    }, [input])

    const set1 = (e, inp, index) => {
        const element = ({ ...inp, [e.target.name]: e.target.value })
        input.splice(index, 1, element)
        set_input([...input])
    }

    const create_inputs = () => {

        if (input.length < 5) {
            set_input(input => [...input, { id: input.length + 1 }])
        } else {
            alert('No More Inputs are Allowed')
        }
    }

    const radio = (e) => {
        set_obj({ ...obj, Status: e.target.id })
    }

    const upload_heading_image = async () => {
        const image = heading_image_ref.current.files[0]
        if (!image) return

        const type = image.type.split("/")
        if (type[0] !== 'image') return alert("only Images are allowed.")
        if (type[1] === 'jpeg' || type[1] === 'jpg' || type[1] === 'png' || type[1] === 'PNG') {
            set_heading_image(image)

            const options = {
                maxSizeMB: 2,
                useWebWorker: true,
            }

            var compressed_heading_image = await imageCompression(image, options)

            const read = new FileReader()
            read.readAsDataURL(compressed_heading_image)
            read.onload = async function () {
                var base64 = read.result
                set_obj({ ...obj, "Heading_image": base64 })
            }
        } else {
            alert("only jpeg, jpg, png amd PNG Images format are allowed.")
        }
    }

    const upload_images = async () => {
        const multiple_img = multi_image_ref.current.files
        if (!multiple_img) return
        if (multiple_img.length > 10) return alert('Only 10 Files are allowed.')

        let error_count = 0
        let total_images = multi_image

        for (let i = 0; i < multiple_img.length; i++) {
            if (total_images.length > 9) {
                alert("Only 10 files are allowed.")
                break;
            }
            const type = multiple_img[i].type.split("/")
            if (type[0] !== 'image') return error_count++
            if (type[1] === 'jpeg' || type[1] === 'jpg' || type[1] === 'png' || type[1] === 'PNG') {
                total_images.push(multiple_img[i])
            }
            else { error_count++ }
        }
        set_multi_image([...total_images])
        set_multi_image_error(error_count)
    }

    const remove_image = (index) => {
        multi_image.splice(index, 1)
        set_multi_image([...multi_image])
    }

    const submit = async (e) => {
        e.preventDefault()
        set_btn_disabler(true)
        set_submit_string('Uploading')
        set_loader(true)

        try {
            if (!obj.Title || !obj.Heading || !obj.Author || !obj.Description || !obj.Category || !obj.Tags || !obj.Status) return alert("All Fields are Mandatory")

            if (!heading_image) return alert("Heading Image Is a Mendatory Field.")

            let count = 0

            for (let i = 0; i < input.length; i++) {
                if (!input[i].Sub_heading || !input[i].Sub_Heading_Description) {
                    count++
                }
            }

            if (count > 0) return alert('Sub Heading or Sub Heading Description is empty.')

            console.log(obj)

            Firebase.child(`Blogs/${user_key}`).push(obj, err => {
                if (err) return alert("Something gone wrong. Please try again later.")
                else {
                    alert("Blog Uploaded.")
                    set_loader(false)
                }
            })

        } catch (error) {
            alert("Something gone wrong. Please try again later.")
        } finally {
            set_input([])
            set_btn_disabler(false)
            set_heading_image(null)
            set_multi_image([])
            set_multi_image_error(null)
            set_submit_string('Submit')
            set_obj({})
        }
    }

    return (
        <div>
            {
                loader && (<div className='preloaders'>
                    <div className='loaders'></div>
                </div>)
            }
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
                                        <div className="checkout-box" style={{ backgroundColor: 'transparent', padding: "0px" }}>
                                            <div className="checkout-details" style={{ paddingLeft: "20px", paddingRight: "20px", marginTop: "-10px" }}>
                                                <div className="bill-details">
                                                    <div style={{ display: "flex", flexWrap: "nowrap", marginTop: "10px" }} className="select-payment-method mt-20">
                                                        <div>
                                                            <span style={{ fontSize: "18px" }}>Status:</span>
                                                        </div>
                                                        <div>
                                                            <input type="radio" checked={obj.Status === "Active" ? true : false} onClick={radio} id="Active" name="Status" />
                                                            <label htmlFor="Active" checked={obj.Status === "Active" ? true : false} style={{ fontSize: "13px" }}>Active</label>
                                                        </div>
                                                        <div>
                                                            <input type="radio" onClick={radio} id="In-Active" name="Status" />
                                                            <label htmlFor="In-Active" style={{ fontSize: "13px" }}>In-Active</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="col-lg-6">
                                        <div className="form-group">
                                            <a href="checkout.html" className="btn-two w-100 d-block">Upload Heading Image<i className="flaticon-right-arrow" /></a>
                                        </div>
                                    </div> */}
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <input type="text" name="Tags" onChange={set} value={obj.Tags ? obj.Tags : ""} placeholder="Tags" required />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <a onClick={create_inputs} disabled={btn_disabler} className="btn-two w-100 d-block">Create sub Heading<i className="flaticon-right-arrow" /></a>
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

                                    <div className="col-lg-12 mt-4">
                                        <div className="form-group mb-0">
                                            <button type="submit" disabled={btn_disabler} onClick={submit} className="btn-one">{submit_string}<i className="flaticon-right-arrow" /></button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-xxl-4 col-xl-5 col-lg-5">
                            <div className="sidebar">
                                <div className="checkout-box">
                                    <h4 className="cart-box-title">Heading Image</h4>
                                    <div className="cart-total">
                                        <div className="cart-total-wrap">
                                            <input type='file' onChange={upload_heading_image} accept='image/*' hidden ref={heading_image_ref} />
                                            <img className='img-thumbnail' height={"100%"} width={"100%"} src={heading_image ? URL.createObjectURL(heading_image) : "assets/img/newsletter-bg.webp"} alt="" />
                                        </div>
                                        <a disabled={btn_disabler} className="btn-two w-100 d-block" onClick={() => heading_image_ref.current.click()}>Upload Heading Image<i className="flaticon-right-arrow" /></a>
                                    </div>
                                </div>
                                <div className="checkout-box">
                                    <h4 className="cart-box-title">More Images</h4>
                                    <div className="checkout-details">
                                        {
                                            multi_image ? multi_image.map(function (img, index) {
                                                return (
                                                    <div className='myimages' key={index}>
                                                        <img src={img ? URL.createObjectURL(img) : "assets/img/newsletter-bg.webp"} alt="" />
                                                        <i onClick={() => remove_image(index)}>&times;</i>
                                                    </div>
                                                )
                                            }) : ""
                                        }
                                        {
                                            multi_image_error ?
                                                <div className='col-12'>
                                                    <br />
                                                    <br />
                                                    <br />
                                                    <br />
                                                    <br />
                                                    <br />
                                                    <p style={{ fontSize: "20px", color: "red", textAlign: "center" }}>{multi_image_error + " files are not of image type."}</p>
                                                </div> : ""
                                        }
                                        {/* <div className='myimages'>
                                            <img src="assets/img/newsletter-bg.webp" alt="" />
                                            <i>&times;</i>
                                        </div> */}

                                        <div className="bill-details">
                                            <div className="checkout-footer mt-4">
                                                <input ref={multi_image_ref} multiple={true} onChange={upload_images} accept='image/*' type="file" hidden />
                                                <button type="button" className="btn-two d-block w-100 mt-10" disabled={btn_disabler} onClick={() => multi_image_ref.current.click()}>Upload Images<i className="flaticon-right-arrow" /></button>
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