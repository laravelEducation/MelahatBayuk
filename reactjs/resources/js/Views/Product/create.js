import React, {useEffect, useState} from 'react';
import {inject,observer} from 'mobx-react';
import Layout from "../../Components/Layout/front.layout";
import {Formik} from "formik";
import * as Yup from "yup";
import CustomInput from "../../Components/form/CustomInput";
import Select from 'react-select';

const Create = (props) =>{

    const [categories,setCategories]=useState([]);

    useEffect(()=>{
        console.log(props.AuthStore.appState.user.access_token);
        axios.get(`/api/product/create`,{
            headers:{
                Authorization:'Bearer ' + props.AuthStore.appState.user.access_token
            }
        }).then((res)=>{
             setCategories(res.data.categories);
        }).catch(e=>console.log(e));
    },[])
    const handleSubmit=()=>{

    }

    return  (
        <Layout>
            <div className="mt-5">
            <div className="container">
            <Formik
                initialValues={{
                    email:'',
                    password:'',
                }}
                onSubmit={handleSubmit}
                validationSchema={
                    Yup.object().shape({
                        email:Yup
                            .string()
                            .email('Email Formatı Hatalı')
                            .required('Email Zorunludur'),
                        password:Yup.string().required('Şifre Zorunludur'),

                    })
                }
            >
                {({
                      values,
                      handleChange,
                      handleSubmit,
                      handleBlur,
                      errors,
                      isValid,
                      setFieldValue,
                      isSubmitting,
                      touched
                  }) => (
                    <div>
                        <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                            <Select
                                onChange={(e) => setFieldValue('categoryId',e.id)}
                                placeholder={"Ürün Kategorisi Seçiniz"}
                                getOptionLabel={option => option.name}
                                getOptionValue={option => option.id}
                                options={categories} />
                            </div>
                        </div>
                        </div>
                        <div className="row">
                        <div className="col-md-6">
                            <CustomInput
                            title="Ürün Adı"
                            value={values.name}
                            handleChange={handleChange('name')}
                            />
                            {(errors.name && touched.name) && <p>{errors.name}</p>}

                        </div>
                        <div className="col-md-6">
                            <CustomInput
                                title="Ürün Model Kodu"
                                value={values.modelCode}
                                handleChange={handleChange('modelCode')}
                            />
                            {(errors.modelCode && touched.modelCode) && <p>{errors.modelCode}</p>}

                        </div>

                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <CustomInput
                                    title="Barkod"
                                    value={values.name}
                                    handleChange={handleChange('barcode')}
                                />
                                {(errors.barcode && touched.barcode) && <p>{errors.barcode}</p>}

                            </div>
                            <div className="col-md-6">
                                <CustomInput
                                    title="Marka"
                                    value={values.brand}
                                    handleChange={handleChange('brand')}
                                />
                                {(errors.brand && touched.brand) && <p>{errors.brand}</p>}

                            </div>

                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <CustomInput
                                    title="Stok"
                                    value={values.stock}
                                    type="number"
                                    handleChange={handleChange('stock')}
                                />
                                {(errors.stock && touched.stock) && <p>{errors.stock}</p>}

                            </div>
                            <div className="col-md-6">
                                <CustomInput
                                    title="KDV"
                                    value={values.tax}
                                    handleChange={handleChange('tax')}
                                />
                                {(errors.tax && touched.tax) && <p>{errors.tax}</p>}

                            </div>

                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <CustomInput
                                    title="Alış Fiyatı"
                                    value={values.buyingPrice}
                                    type="number"
                                    handleChange={handleChange('buyingPrice')}
                                />
                                {(errors.buyingPrice && touched.buyingPrice) && <p>{errors.buyingPrice}</p>}

                            </div>
                            <div className="col-md-6">
                                <CustomInput
                                    title="Satış Fiyatı"
                                    value={values.sellingPrice}
                                    type="number"
                                    handleChange={handleChange('sellingPrice')}
                                />
                                {(errors.sellingPrice && touched.sellingPrice) && <p>{errors.sellingPrice}</p>}

                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <CustomInput
                                        title="Açıklama"
                                        value={values.text}
                                        type="text"
                                        handleChange={handleChange('text')}
                                    />
                                    {(errors.text && touched.text) && <p>{errors.text}</p>}

                                </div>
                            </div>

                        </div>
                        <button
                            disabled={!isValid || isSubmitting}
                            onClick={handleSubmit}
                            className="btn btn-lg mt-3 col-md-12 btn-primary btn-block"
                            type="button">
                             Ürünü Ekle
                        </button>
                    </div>
                )}
            </Formik>
            </div>
            </div>
        </Layout>
    )
};
export default inject("AuthStore")(observer(Create));
