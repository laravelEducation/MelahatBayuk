import React from 'react';
import {Route,Switch} from 'react-router-dom';
import PrivateRoute from "./Views/PrivateRoute";
/*Sayfalar */
import FrontIndex from './Views/Index';
import FrontLogin from './Views/Login';
import FrontRegister from './Views/Register';
/* Ürünler    */
import ProductIndex from './Views/Product/index';
import ProductCreate from './Views/Product/create';
import ProductEdit from './Views/Product/edit';
/* Kategoriler  */
import CategoryIndex from './Views/Category/index';
import CategoryCreate from './Views/Category/create';
import CategoryEdit from './Views/Category/edit';
const Main=()=>(
    <Switch>
        <PrivateRoute exact path="/" component={FrontIndex} />
        <Route path="/login" component={FrontLogin} />
        <Route path="/register" component={FrontRegister} />


        <PrivateRoute exact path="/urunler" component={ProductIndex} />
        <PrivateRoute exact path="/urunler/ekle" component={ProductCreate} />
        <PrivateRoute exact path="/urunler/duzenle/:id" component={ProductEdit} />

        <PrivateRoute exact path="/kategoriler" component={CategoryIndex} />
        <PrivateRoute exact path="/kategori/ekle" component={CategoryCreate} />
        <PrivateRoute exact path="/kategori/duzenle/:id" component={CategoryEdit} />

    </Switch>
);
export default Main;
