import './App.scss';
import { useEffect, useState } from 'react';

const options = ["Avion", "Automovil", "Crucero", "Monopatin"]

function App() {
  const [vehicle, setVehicle] = useState("Avion");
  const [data, setData] = useState({ name: "", email: "", phone: "", age: 18 });
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (modal) {
      setTimeout(() => {
        setModal(false)
        setData({ name: "", email: "", phone: "", age: 18 })
      }, 5000)
    }
  }, [modal])

  // fetch to back in heroku
  const create = async (e) => {
    e.preventDefault()
    console.log('data', data)
    try {
      let response = await fetch("https://ekoomediaback.herokuapp.com/users", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "Accept": "application/json" },
        body: JSON.stringify(data)
      })
      let res = await response.json()
      console.log('res', res)
      if (res.error) alert(res.error)
      else setModal(true)
    } catch (error) {
      console.log('error', error)
    }
  }

  const handleChange = (e, field) => {
    let obj = { ...data }
    obj[field] = e?.target?.value
    setData(obj)
  }

  return (
    <div className="app">
      <div className={`modal ${modal ? "show" : "hidden"}`}>
        <div className='modal-container'>
          <h2>Completado!!</h2>
        </div>
      </div>
      <ul className='menu'>
        {options.map((v, i) =>
          <li key={`li-${i}`} className={vehicle === v ? "select" : ""} onClick={() => setVehicle(v)}>{v}</li>
        )}
      </ul>
      <div className='container-title'>
        <h2>{`Hola bienvenido sabemos que quieres viajar en un ${vehicle} por favor diligencia el formulario`}</h2>
      </div>
      <div className='cont-form'>
        <form className='form' onSubmit={(e) => create(e)}>
          <label>Nombre :</label>
          <input required type="text" value={data?.name} onChange={(e) => handleChange(e, "name")} />
          <label>Correo :</label>
          <input required type="email" value={data?.email} onChange={(e) => handleChange(e, "email")} />
          <label>Telefono :</label>
          <input required type="text" value={data?.phone} onChange={(e) => handleChange(e, "phone")} />
          <label>Edad :</label>
          <input required type="number" min="18" max="100" value={data?.age} onChange={(e) => handleChange(e, "age")} />
          <button type='submit'>Guardar</button>
        </form>
      </div>
    </div>
  );
}

export default App;
