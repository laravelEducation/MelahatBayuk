import React, {useEffect, useState} from 'react';
import {inject,observer} from 'mobx-react';
import Layout from "../../Components/Layout/front.layout";
import {Formik} from "formik";
import * as Yup from "yup";
import CustomInput from "../../Components/form/CustomInput";
import Select from 'react-select';
import swal from 'sweetalert';

const Edit = (props) =>{
    const {params}=props.match;
    const [loading,setLoading]=useState(true);
    const [customer,setCustomer]=useState({});
    const [customerTypes,setCustomerTypes]=useState([{id:0,name:'Tedarikçi'},{id:1,name:'Müşteri'}]);
    useEffect(()=>{
        axios.get(`/api/customer/${params.id}/edit`,{
            headers:{
                Authorization:'Bearer ' + props.AuthStore.appState.user.access_token
            }
        }).then((res)=>{
            if (res.data.success){
                setCustomer(res.data.customer);
                setLoading(false);
            }
            else{
                swal(res.data.message);
            }
        }).catch(e=>console.log(e));
    },[]);

    const handleSubmit=(values,{resetForm,setSubmitting})=>{

        values['_method']="put";

        axios.post(`/api/customer/${customer.id}`,{...values},{
            headers:{
                'Authorization':'Bearer ' + props.AuthStore.appState.user.access_token

            }
        })
            .then((res)=>{
                if(res.data.succes){
                    swal('İşlem başarı ile tamamlandı');
                    setSubmitting(false);

                }
                else{
                    swal(res.data.message);
                    setSubmitting(false);

                }
            })
            .catch(e =>{
                console.log(e)});
    };
      if(loading) return <div>Yükleniyorr</div>
    return  (
        <Layout>
            <div className="mt-5">
                <div className="container">
                    <Formik
                        initialValues={{
                            customerType:customer.customerType,
                            name:customer.name,
                            email:customer.email,
                            phone:customer.phone,
                            address:customer.address,
                            note:customer.note,
                        }}
                        onSubmit={handleSubmit}
                        validationSchema={
                            Yup.object().shape({
                                customerType:Yup.number().required('Hesap Seçimi Zorunludur'),
                                name:Yup.string().required('Ürün Adı Zorunludur'),
                                email:Yup.string().email().required('Email Alanı Zorunludur'),
                                phone:Yup.string().required('Telefon  Zorunludur'),

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
                                                value={customerTypes.find(item=>item.id==values.customerType)}
                                                onChange={(e) => setFieldValue('customerType',e.id)}
                                                placeholder={"Hesap Tipi Seçiniz"}
                                                getOptionLabel={option => option.name}
                                                getOptionValue={option => option.id}
                                                options={customerTypes} />
                                        </div>
                                        {(errors.customerType && touched.customerType) && <p className="form-error">{errors.customerType}</p>}

                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <CustomInput
                                            title="Hesap Adı"
                                            value={values.name}
                                            handleChange={handleChange('name')}
                                        />
                                        {(errors.name && touched.name) && <p className="form-error">{errors.name}</p>}

                                    </div>
                                    <div className="col-md-6">
                                        <CustomInput
                                            title="Email"
                                            value={values.email}
                                            handleChange={handleChange('email')}
                                        />
                                        {(errors.email && touched.email) && <p className="form-error">{errors.email}</p>}

                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <CustomInput
                                            title="Adres"
                                            value={values.address}
                                            handleChange={handleChange('address')}
                                        />
                                        {(errors.address && touched.address) && <p className="form-error">{errors.address}</p>}

                                    </div>
                                    <div className="col-md-6">
                                        <CustomInput
                                            title="Telefon"
                                            value={values.phone}
                                            handleChange={handleChange('phone')}
                                        />
                                        {(errors.phone && touched.phone) && <p className="form-error">{errors.phone}</p>}

                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <CustomInput
                                            title="Açıklama"
                                            value={values.text}
                                            type="text"
                                            handleChange={handleChange('text')}
                                        />
                                        {(errors.text && touched.text) && <p className="form-error">{errors.text}</p>}

                                    </div>
                                </div>
                                <button
                                    disabled={!isValid || isSubmitting}
                                    onClick={handleSubmit}
                                    className="btn btn-lg mt-3 col-md-12 btn-primary btn-block"
                                    type="button">
                                    Hesap Ekle
                                </button>
                            </div>
                        )}
                    </Formik>
                </div>
            </div>
        </Layout>
    )
};
export default inject("AuthStore")(observer(Edit));
