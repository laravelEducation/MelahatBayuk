import React from 'react';
import {Link} from "react-router-dom";


const Register = () =>{
    return  (
        <div className="login-register-container">
            <form className="form-signin">
                <img className="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt=""
                     width="72" height="72" />
                <h1 className="h3 mb-3 font-weight-normal">Hemen Kayıt Ol</h1>
                <div className="form-group">
                    <label htmlFor="inputEmail" className="sr-only">Ad-Soyad</label>
                    <input type="email" id="inputEmail" className="form-control" placeholder="Ad Soyad Giriniz" required=""
                           autoFocus="" />
                </div>
                <div className="form-group">
                <label htmlFor="inputEmail" className="sr-only">Email Adres</label>
                <input type="email" id="inputEmail" className="form-control" placeholder="Email Adresi Giriniz" required=""
                       autoFocus="" />
                </div>
                <div className="form-group">
                <label htmlFor="inputPassword" className="sr-only">Şifre</label>
                <input type="password" id="inputPassword" className="form-control" placeholder="Şifre Giriniz"
                       required="" />
                </div>
                <div className="form-group">
                    <label htmlFor="inputPassword" className="sr-only">Şifre Tekrarı</label>
                    <input type="password" id="inputPassword" className="form-control" placeholder="Tekrar Şifreyi Giriniz"
                           required="" />
                </div>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Kayıt Ol</button>
                <Link className="mt-3" style={{display:'block'}} to="/login">Giriş</Link>
                <p className="mt-5 mb-3 text-muted">© 2017-2018</p>
            </form>
        </div>
    )
};
export default Register;
