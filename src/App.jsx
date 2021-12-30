
import { useState, useEffect } from 'react'
import Header from './components/Header'
import Modal from './components/Modal'
import ListadoGastos from './img/ListadoGastos'
import Filtros from './components/Filtros'
import { generarId } from './helpers'
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import { object } from 'prop-types'

function App() {

   const [presupuesto, setPresupuesto] = useState(    
       Number(localStorage.getItem('presupuesto') ?? 0)
   )

   const [gastos, setGastos] = useState(
       localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
    )

   const [validPresupuesto, setValidPresupuesto] = useState(false)
   const [modal, setmodal] = useState(false)
   const [animarModal, setAnimarModal] = useState(false)
   const [gastoEditar, setGastoEditar] = useState({})
   const [filtro, setFiltro] = useState('')
   const [gastosFiltrados, setGastosFiltrados] = useState([])


   useEffect(() =>{
    if( Object.keys(gastoEditar).length > 0 ) {
        setmodal(true)
      
        setTimeout(() => {
            setAnimarModal(true)
        }, 500); 
     }
         
   },[gastoEditar])


   useEffect(() => {
       localStorage.setItem('presupuesto', presupuesto ?? 0)
   }, [presupuesto])


   useEffect(() => {
       localStorage.setItem('gastos', JSON.stringify(gastos) ?? []) 
   }, [gastos])


   useEffect(() => {
       const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0
       
       if(presupuestoLS > 0){
         setValidPresupuesto(true)
     }  
   }, [])

   useEffect(() =>{

       if (filtro){
            const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)
            setGastosFiltrados(gastosFiltrados)
       }
   }, [filtro])

   const handleNuevoGasto = () =>{
       setmodal(true)
       setGastoEditar({})

       setTimeout(() => {
           setAnimarModal(true)
       }, 500);
   }
   
   const guardarGasto = (gasto) =>{
     if(gasto.id){
        //Actualizar gasto
        const gastosActualizados = gastos.map(gastosState => gastosState.id === gasto.id ? gasto : gastosState)
        setGastos(gastosActualizados)
        setGastoEditar({})

     }else{
        //Nuevo gasto
        gasto.id = generarId()  
        gasto.fecha = Date.now()
        setGastos([...gastos, gasto])
     }

     setAnimarModal(false)
       setTimeout(() =>{
          setmodal(false)     
       },500)
   }

   const eliminarGasto = (id) =>{
      const gastosActualizados = gastos.filter(gasto => gasto.id !== id)
      setGastos(gastosActualizados)
   }

  return (
      <div className={modal ? 'fijar' : ''}>
          <Header
             presupuesto = {presupuesto}
             setPresupuesto = {setPresupuesto}
             validPresupuesto = {validPresupuesto}
             setValidPresupuesto = {setValidPresupuesto}
             gastos = {gastos}
             setGastos = {setGastos}
           />

           {
             validPresupuesto ? (
             <>
               <main>
                 <Filtros
                   filtro = {filtro}
                   setFiltro = {setFiltro}
                 />


                 <ListadoGastos
                   gastos = {gastos}
                   setGastoEditar = {setGastoEditar}
                   eliminarGasto = {eliminarGasto}
                   filtro = {filtro}
                   gastosFiltrados = {gastosFiltrados}
                 />
               </main>
               <div className="nuevo-gasto">
                  <img 
                    src={IconoNuevoGasto} 
                    alt="icono nuevo gasto"
                    onClick={handleNuevoGasto}
                  />
                 </div>
             </>
            ) : null
          }

          {
             modal && 
             <Modal 
                setmodal={setmodal}
                animarModal={animarModal}
                setAnimarModal={setAnimarModal}
                guardarGasto={guardarGasto}
                gastoEditar={gastoEditar}
                setGastoEditar={setGastoEditar}
                
             />}
           
      </div>
  )
}

export default App
