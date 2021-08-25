import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {inject,observer} from "mobx-react";
import {InvalidTokenError} from "jwt-decode";
import {useHistory} from 'react-router-dom';
import {Navbar,Nav,NavDropdown,Container,FormControl,Button,Form} from 'react-bootstrap'
const Layout=(props)=>{
        const[user,setUser]=useState({});
        const [isLoggedIn,setIsLoggedIn]=useState(false);
        props.AuthStore.getToken();
        const history=useHistory();

        useEffect(()=>{
            const token=(props.AuthStore.appState != null) ? props.AuthStore.appState.user.access_token:null;
            axios.post(`/api/authenticate`,{},{
         headers:{
             Authorization:'Bearer ' + token
         }
     }).then((res)=>{
         if (!res.data.isLoggedIn){
             history.push('login');
         }
                setUser(res.data.user);
                setISLoggedIn(res.data.isLoggedIn);

            }).catch(e=>{
             //   history.push('login');

            });
        },[])
    const logout =()=>{
        axios.post(`/api/logout`,{},{
            headers:{
                Authorization:'Bearer ' +  props.AuthStore.appState.user.access_token
            }
        }).then(res=>console.log(res)).catch(e=>console.log(e));

            props.AuthStore.removeToken();

            history.push('/login');
        }
    return(
        <>
            <Navbar collapseOnSelect variant="dark" bg="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">mStock</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/">Yönetim Paneli</Nav.Link>
                            <Nav.Link href="/urunler">Ürünler</Nav.Link>
                        </Nav>
                        <Nav className>
                            <NavDropdown title={user.name} id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Profil Düzenle</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Şifre Değiştir</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={logout}>Çıkış</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        <div>{props.children}</div>
        </>
    )

}
export default inject("AuthStore")(observer(Layout));
