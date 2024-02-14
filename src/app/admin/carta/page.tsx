'use client'
import styles from "@/app/usuario/usuario.module.css"
import style from "@/app/admin/admin.module.css"
import axios from "axios";
import { useEffect, useState } from "react";
export default function Carta(){
    const [imagen, setImagen] = useState("");
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState(0);
    const [cantidad, setCantidad] = useState(0);
const [editar, setEditar] = useState (false)
    const [productosList,setProductos] = useState([])
    useEffect(() =>{
      axios.get("http://localhost:3001/productos",).then((response)=>{
          setProductos(response.data);
      });
    }, [])
      console.log(productosList)
    const editarProducto = (val)=>{
        setEditar(true);
        setImagen(val.imagen);
        setNombre(val.nombre);
        setDescripcion(val.descripcion);
        setPrecio(val.precio);
        setCantidad(val.cantidad);
    }
 return(<>
    <div className="row my-4">
        <div className="text_nav text-center"><a className="tittle">Carta</a></div>
    </div>
    <div className="row justify-content-center">
    <button className={`${styles.ingresar} col-2 text-center align-items-center p-1 `} type="submit"><a href="/admin/registroCarta" className={`${styles.text_form}`}>Adicionar</a></button>      
    </div>
   <div className={`${style.input_carta} col-6 mx-3 my-1 align-items-center`}><input type="search" placeholder="buscar"></input></div>      
    <div className="row pt-2 mx-3">
    {productosList.map((val,key)=>{
        return <>
        <div className={`${style.carta} col-5 mt-2 mx-2`}>
            <div key={val.codigo}></div>
            <div className="col-12 text-center"><b>{val.nombre}</b></div>
            <div className={`${styles.img_inicio} col-12 text-center`}>{val.imagen}</div>
            <div className="col-12">{val.descripcion}</div>
            <div className="col-12 text-center"><b>Precio </b>{val.precio}</div>
        <div className="col-12 justify-content-center">
            <button className={`${styles.ingresar} col-5 text-center align-items-center m-3 p-1 `} 
            onClick={()=>{
                editarProducto(val);
            }}
            type="submit"><a href="/admin/registroCarta" className={`${styles.text_form}`}>Editar</a></button>
            <button className={`${styles.ingresar} col-5 text-center align-items-center p-1 `} type="submit"><a href="/admin/registroCarta" className={`${styles.text_form}`}>Dar de baja</a></button>      
        </div>
        </div>
        </>})
        }
    </div>
 </>)
}