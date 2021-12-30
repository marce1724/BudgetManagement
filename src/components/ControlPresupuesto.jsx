
import { useState, useEffect } from "react"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
     
    const ControlPresupuesto = ({presupuesto, gastos, setGastos, setPresupuesto, setValidPresupuesto}) => {

     const [porcentaje, setPorcentaje] = useState(0)
     const [disponible, setDisponible] = useState(0)
     const [gastado, setGastado] = useState(0)
         
     useEffect(() =>{
         const TotalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0)
         const TotalDisponible = presupuesto - TotalGastado

         //calcular porcentaje gastado
         const NuevoPorcentaje = (((presupuesto - TotalDisponible) / presupuesto) * 100).toFixed(2)
   
         setGastado(TotalGastado)
         setDisponible(TotalDisponible)

         setTimeout(() => {
             setPorcentaje(NuevoPorcentaje)
         }, 700);
     
     }, [gastos])

    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
         })
    }

    const handleRestApp = () =>{
         const resultado = confirm('¿Deseas reiniciar presupuesto y gastos?')

         if(resultado){
             setGastos([])
             setPresupuesto(0)
             setValidPresupuesto(false)
         }
    }

     return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas"> 
            <div> 
                 <CircularProgressbar
                     styles={ buildStyles({
                         pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                         trailColor: '#F5F5F5',
                         textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                     })}

                     value={porcentaje}
                     text={`${porcentaje}% Gastado`}
                 
                 />
            </div>

            <div className="contenido-presupuesto">
                 <button
                     className="reset-app"
                     type="button"
                     onClick={handleRestApp}
                 >
                      Resetear App
                 </button>

                 <p>
                     <span>Presupuesto: </span>{formatearCantidad(presupuesto)}
                 </p>

                 <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                     <span>Disponible: </span>{formatearCantidad(disponible)}
                 </p>

                 <p>
                     <span>Gastado: </span>{formatearCantidad(gastado)}
                 </p>
            </div>
            
        </div>
    )
}
    
    export default ControlPresupuesto
    