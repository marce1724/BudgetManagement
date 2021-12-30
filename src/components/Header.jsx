
import NuevoPresupuesto from './NuevoPresupuesto'
import ControlPresupuesto from './ControlPresupuesto'


const Header = ({presupuesto, setPresupuesto, validPresupuesto, setValidPresupuesto, gastos, setGastos}) => {
    return (
        <header>
             <h1>Planificador de Gastos</h1>
             
             {validPresupuesto ? (
                  <ControlPresupuesto
                     presupuesto = {presupuesto}
                     gastos = {gastos}
                     setGastos = {setGastos}
                     setPresupuesto = {setPresupuesto}
                     setValidPresupuesto = {setValidPresupuesto}
                  
                  />

             ) : (
                 <NuevoPresupuesto
                     presupuesto = {presupuesto}
                     setPresupuesto = {setPresupuesto}
                     setValidPresupuesto = {setValidPresupuesto}
                  />
             )}
             
        </header>
    )
}

export default Header
