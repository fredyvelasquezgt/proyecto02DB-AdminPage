import React, { useState } from 'react'
import { Button, Dropdown, Form, DropdownButton, Table } from 'react-bootstrap'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import { useForm } from '../../hooks/useForm'
import api from '../../Apis/api'

const Dashboard = () => {
  const [value, setValue] = useForm({})
  const [value1, setValue1] = useForm({})
  const [value7, setValue7] = useForm({}) //eliminar pelicula
  const [value2, setValue2] = useForm({}) //modificar usuario
  const [value6, setValue6] = useForm({}) //dar de baja usuario
  const [value3, setValue3] = useForm({}) //agregar anunciante
  const [value4, setValue4] = useForm({}) //modificar anuncio
  const [value5, setValue5] = useForm({}) //eliminar anunciante
  const [value8, setValue8] = useForm({}) //Pregunta 2 - reporteria
  const [value9, setValue9] = useForm({}) //Pregunta 5 - reporteria

  const enviarInfo = async () => {
    let datos = await api.agregarPelicula.agregar({
      titulo: value.titulo,
      descripcion: value.descripcion,
      actores: value.actores,
      director: value.director,
      categoria: value.categoria,
      premios: value.premios,
      fechaEstreno: value.fechaEstreno,
      linkPelicula: value.linkPelicula,
      duracion: value.duracion,
      portada: value.portada,
      idGeneros: value.idGeneros,
      portada: value.portada,
    })
    if (datos.error != '') {
      alert('Pelicula agregada correctamente')
    } else {
      alert('Error al agregar la pelicula')
    }
  }

  const enviarInfo1 = async () => {
    let datos1 = await api.agregarPelicula.modificar({
      titulo: value1.titulo1,
      descripcion: value1.descripcion1,
      actores: value1.actores1,
      director: value1.director1,
      categoria: value1.categoria1,
      premios: value1.premios1,
      fechaEstreno: value1.fechaEstreno1,
      linkPelicula: value1.linkPelicula1,
      duracion: value1.duracion1,
      portada: value1.portada1,
      idGeneros: value1.idGeneros1,
      portada: value1.portada1,
    })
    if (datos1.error != '') {
      alert('Pelicula modificada correctamente')
    } else {
      alert('Error al modificar la pelicula')
    }
  }

  const enviarInfo2 = async () => {
    let datos2 = await api.usuarios.modificar({
      nombre: value2.nombre2,
      correo: value2.correo2,
    })
    if (datos2.error != '') {
      alert('Usuario modificado correctamente')
    } else {
      alert('El usuario no se pudo modificar')
    }
  }

  const enviarInfo3 = async () => {
    let datos3 = await api.anunciate.agregar({
      titulo: value3.titulo3,
      link: value3.link3,
    })
    if (datos3.error != '') {
      alert('Anunciante agregado correctamente')
    } else {
      alert('No se pudo agregar al anunciante')
    }
  }

  const enviarInfo4 = async () => {
    let datos4 = await api.anunciate.modificar({
      titulo: value4.titulo4,
      link: value4.link4,
    })
    if (datos4.error != '') {
      alert('Anuncio modificado correctamente')
    } else {
      alert('El anuncio no se pudo modificar')
    }
  }

  const enviarInfo5 = async () => {
    //eliminar anunciante
    let datos5 = await api.anunciate.eliminar({
      idAnuncio: value5.anuncio,
    })
    if (datos5.error != '') {
      alert('Anuncio eliminado correctamente')
    } else {
      alert('El anuncio no se pudo eliminar')
    }
  }

  const enviarInfo6 = async () => {
    //dar de baja usuario
    let datos6 = await api.usuarios.darDeBaja({
      idUsuario: value6.usuario6,
    })
    if (datos6.error != '') {
      alert('Usuario eliminado correctamente')
    } else {
      alert('El usuario no se elimino correctamente')
    }
  }

  const enviarInfo7 = async () => {
    //dar de baja usuario
    let datos7 = await api.agregarPelicula.eliminar({
      idPelicula: value7.usuario7,
    })
    if (datos7.error != '') {
      alert('Pelicula eliminada correctamente')
    } else {
      alert('La pelicula no se elimino correctamente')
    }
  }

  //Funciones para los botones

  //Faltaria crear el querie 1

  const [resultado2, setResultado2] = useState([]) //querie 2
  const mostrarQuerie2 = async () => {
    let datos7 = await api.reportes.mostrar({
      querie: `select p.categoria , count(*)  as cuenta_categoria
      from estadocontenido e
      inner join pelicula p
      on p.idpelicula = e.idpelicula 
      inner join perfil p2
      on p2.idperfil = e.idperfil
      inner join usuario u
      on u.idusuario = p2.idusuario 
      where e.estado = 1 and u.tipocuenta = '${value8.categoriaReporteria}' and fechainicio 
      between '${value8.fechaInicio}' and '${value8.fechaFinal}'
      group by p.categoria; `,
    })
    if (datos7.error != '') {
      setResultado2(datos7.body)
    } else {
      alert('La pelicula no se elimino correctamente')
    }
  }

  const [resultado3, setResultado3] = useState([]) //querie 3
  const mostrarQuerie3 = async () => {
    let datos7 = await api.reportes.mostrar({
      querie: `select aD.nombre, aD.tipo, iP.idIntegrante, count(iP.idIntegrante)
      as cantidad_veces_que_aparecen
      from integrantesPelicula iP 
      inner join actoresDirectores aD
      on iP.idIntegrante = aD.idIntegrante
      where iP.idPelicula in  (
      select  eC.idPelicula
      from estadoContenido eC
      inner join usuario u
      on eC.idUsuario = u.idUsuario
      where u.tipoCuenta = 2 or u.tipoCuenta = 3
      and eC.estado = 2)
      group by aD.nombre, aD.tipo, iP.idIntegrante
      order by cantidad_veces_que_aparecen desc limit 10;`,
    })
    if (datos7.error != '') {
      setResultado3(datos7.body)
    } else {
      alert('Error')
    }
  }

  const [resultado4, setResultado4] = useState([]) //querie 4
  const mostrarQuerie4 = async () => {
    let datos7 = await api.reportes.mostrar({
      querie: `select tipoCuenta, count(tipocuenta) as cuenta_tipoCuenta
      from usuario  
      where tipoCUenta = 3 
      and fechacreacion > '2021-09-25'
      group by tipocuenta`,
    })
    if (datos7.error != '') {
      setResultado4(datos7.body)
    } else {
      alert('Error')
    }
  }

  const [resultado5, setResultado5] = useState([]) //querie 4
  const mostrarQuerie5 = async () => {
    let datos7 = await api.reportes.mostrar({
      querie: `select horaConectar, 
      count(horaConectar) as horas
      from inicioSesion
      where horaConectar = '${value9.fechaQuerie5}' 
      group by horaConectar
      order by horas desc limit 1`,
    })
    if (datos7.error != '') {
      setResultado5(datos7.body)
    } else {
      alert('Error')
    }
  }

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Contenido</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={12} md={6} xl={6}>
                  <h2>Agregar pelicula</h2>
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Titulo pelicula</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Titulo"
                        name="titulo"
                        onChange={setValue}
                        value={value.titulo}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Genero</Form.Label>
                      <DropdownButton
                        id="dropdown-basic-button"
                        title="Genero"
                        name="idGeneros"
                        onChange={setValue}
                        value={value.idGeneros}
                      >
                        <Dropdown.Item href="#/action-1">1</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">2</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">3</Dropdown.Item>
                      </DropdownButton>
                      <h1></h1>
                      <p>1: Accion 2:Comedia 3: Romance</p>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Descripcion</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Descripcion"
                        name="descripcion"
                        onChange={setValue}
                        value={value.descripcion}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Actores</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Actores"
                        name="actores"
                        onChange={setValue}
                        value={value.actores}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Director</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Director"
                        name="director"
                        onChange={setValue}
                        value={value.director}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Categoria</Form.Label>
                      <DropdownButton
                        id="dropdown-basic-button"
                        title="Categoria"
                        name="categoria"
                        onChange={setValue}
                        value={value.categoria}
                      >
                        <Dropdown.Item href="#/action-1">Accion</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Drama</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Comedia</Dropdown.Item>
                      </DropdownButton>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Premios</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Premios"
                        name="premios"
                        onChange={setValue}
                        value={value.premios}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Fecha estreno</Form.Label>
                      <Form.Control
                        type="date"
                        placeholder="Premios"
                        name="fechaEstreno"
                        onChange={setValue}
                        value={value.fechaEstreno}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Link pelicula</Form.Label>
                      <Form.Control
                        type="link"
                        placeholder="Link"
                        name="linkPelicula"
                        onChange={setValue}
                        value={value.linkPelicula}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Duracion (mins) </Form.Label>
                      <Form.Control
                        type="link"
                        placeholder="Duracion"
                        name="duracion"
                        onChange={setValue}
                        value={value.duracion}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Foto para la portada </Form.Label>
                      <h2></h2>
                      <input
                        type="link"
                        placeholder="Link "
                        name="portada"
                        onChange={setValue}
                        value={value.portada}
                      />
                    </Form.Group>
                    <Button variant="primary" type="submit" onChange={enviarInfo}>
                      Agregar nueva pelicula
                    </Button>
                    <h1></h1>
                    <hr></hr>
                  </Form>
                </CCol>

                <br></br>

                <CCol xs={12} md={6} xl={6}>
                  <h2>Modificar pelicula</h2>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Seleccionar categoria</Form.Label>
                    <DropdownButton
                      id="dropdown-basic-button"
                      title="Pelicula"
                      name="pelicula1"
                      onChange={setValue1}
                      value={value1.pelicula1}
                    >
                      <Dropdown.Item href="#/action-1">Pelicula 1</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">Pelicula 2</Dropdown.Item>
                      <Dropdown.Item href="#/action-3">Pelicula 3</Dropdown.Item>
                    </DropdownButton>
                  </Form.Group>
                  <h2></h2>
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Titulo pelicula</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Titulo"
                        name="titulo1"
                        onChange={setValue1}
                        value={value1.titulo1}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Descripcion</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Descripcion"
                        name="descripcion1"
                        onChange={setValue1}
                        value={value1.descripcion1}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Genero</Form.Label>
                      <DropdownButton
                        id="dropdown-basic-button"
                        title="Genero"
                        name="idGeneros1"
                        onChange={setValue1}
                        value={value1.idGeneros1}
                      >
                        <Dropdown.Item href="#/action-1">1</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">2</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">3</Dropdown.Item>
                      </DropdownButton>
                      <h1></h1>
                      <p>1: Accion 2:Comedia 3: Romance</p>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Actores</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Actores"
                        name="actores1"
                        onChange={setValue1}
                        value={value1.actores1}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Director</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Director"
                        name="director1"
                        onChange={setValue1}
                        value={value1.director1}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Categoria</Form.Label>
                      <DropdownButton
                        id="dropdown-basic-button"
                        title="Categoria"
                        name="categoria1"
                        onChange={setValue1}
                        value={value1.categoria1}
                      >
                        <Dropdown.Item href="#/action-1">Accion</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Drama</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Comedia</Dropdown.Item>
                      </DropdownButton>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Premios</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Premios"
                        name="premios1"
                        onChange={setValue1}
                        value={value1.premios1}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Fecha estreno</Form.Label>
                      <Form.Control
                        type="date"
                        placeholder="Premios"
                        name="fechaEstreno1"
                        onChange={setValue1}
                        value={value1.fechaEstreno1}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Link pelicula</Form.Label>
                      <Form.Control
                        type="link"
                        placeholder="Link"
                        name="linkPelicula1"
                        onChange={setValue1}
                        value={value1.linkPelicula1}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Duracion (mins) </Form.Label>
                      <Form.Control
                        type="link"
                        placeholder="Duracion"
                        name="duracion1"
                        onChange={setValue1}
                        value={value1.duracion1}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Foto para la portada </Form.Label>
                      <h2></h2>
                      <input
                        type="link"
                        placeholder="Link"
                        name="portada1"
                        onChange={setValue1}
                        value={value1.portada1}
                      />
                    </Form.Group>

                    <Button variant="primary" type="submit" onChange={enviarInfo1}>
                      Modificar
                    </Button>
                    <h1></h1>
                    <hr></hr>
                  </Form>
                </CCol>

                <CCol xs={12} md={6} xl={6}>
                  <h2>Eliminar pelicula</h2>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Eliminar pelicula</Form.Label>
                    <DropdownButton
                      id="dropdown-basic-button"
                      title="Seleccionar anuncio"
                      name="usuario7"
                      onChange={setValue7}
                      value={value7.usuario7}
                    >
                      <Dropdown.Item href="#/action-1">Pelicula 1</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">Pelicula 2</Dropdown.Item>
                      <Dropdown.Item href="#/action-3">Pelicula 3</Dropdown.Item>
                    </DropdownButton>
                  </Form.Group>
                  <h2></h2>
                  <Button variant="primary" type="submit" onChange={enviarInfo7}>
                    Eliminar
                  </Button>
                </CCol>
              </CRow>
              <hr></hr>

              <br />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Usuarios</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={12} md={6} xl={6}>
                  <h2>Modificar usuario</h2>

                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Nombre usuario</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Nombre"
                        name="nombre2"
                        onChange={setValue2}
                        value={value2.nombre2}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Correo</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Correo"
                        name="correo2"
                        onChange={setValue2}
                        value={value2.correo2}
                      />
                    </Form.Group>

                    <Form>
                      <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="Reiniciar
                      intentos fallidos"
                      />
                    </Form>

                    <h1></h1>
                    <Button variant="primary" type="submit" onChange={enviarInfo2}>
                      Modificar
                    </Button>
                    <h1></h1>
                    <hr></hr>
                  </Form>
                </CCol>

                <CCol xs={12} md={6} xl={6}>
                  <h2>Dar de baja usuarios</h2>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Dar de baja usuario</Form.Label>
                    <DropdownButton
                      id="dropdown-basic-button"
                      title="Seleccionar usuario"
                      name="usuario6"
                      onChange={setValue6}
                      value={value6.usuario6}
                    >
                      <Dropdown.Item href="#/action-1">Usuario 1</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">Usuario 2</Dropdown.Item>
                      <Dropdown.Item href="#/action-3">Usuario 3 3</Dropdown.Item>
                    </DropdownButton>
                  </Form.Group>
                  <h1> </h1>

                  <Button variant="primary" type="submit" onChange={enviarInfo6}>
                    Dar de baja
                  </Button>
                  <hr></hr>
                </CCol>
              </CRow>

              <br />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Anunciantes</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={12} md={6} xl={6}>
                  <h2>Agregar anunciante</h2>
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Nombre anunciante</Form.Label>
                      <Form.Control
                        placeholder="Nombre"
                        name="titulo3"
                        onChange={setValue3}
                        value={value3.titulo3}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Link del anuncio</Form.Label>
                      <Form.Control
                        placeholder="Link"
                        name="link3"
                        onChange={setValue3}
                        value={value3.link3}
                      />
                    </Form.Group>

                    <Button variant="primary" type="submit" onChange={enviarInfo3}>
                      Agregar
                    </Button>
                    <h1></h1>
                    <hr></hr>
                  </Form>
                </CCol>

                <CCol xs={12} md={6} xl={6}>
                  <h2>Modificar anunciante</h2>
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Nombre anuncio</Form.Label>
                      <DropdownButton
                        id="dropdown-basic-button"
                        title="Seleccionar anuncio"
                        name="categoria1"
                        onChange={setValue4}
                        value={value4.categoria}
                      >
                        <Dropdown.Item href="#/action-1">Anunciante 1</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Anunciante 2</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Anunciante 3</Dropdown.Item>
                      </DropdownButton>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Nombre anuncio</Form.Label>
                      <Form.Control type="email" placeholder="Nombre" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Link del anuncio</Form.Label>
                      <Form.Control type="email" placeholder="Link" />
                    </Form.Group>

                    <Button variant="primary" type="submit" onChange={enviarInfo4}>
                      Modificar
                    </Button>
                    <h1></h1>
                    <hr></hr>
                  </Form>
                </CCol>

                <CCol xs={12} md={6} xl={6}>
                  <h2>Eliminar anunciante</h2>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Seleccionar anunciante</Form.Label>
                    <DropdownButton
                      id="dropdown-basic-button"
                      title="Anunciante"
                      name="anuncio"
                      onChange={setValue5}
                      value={value5.anuncio}
                    >
                      <Dropdown.Item href="#/action-1">Anunciante 1</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">Anunciante 2</Dropdown.Item>
                      <Dropdown.Item href="#/action-3">Anunciante 3</Dropdown.Item>
                    </DropdownButton>
                  </Form.Group>
                  <h2></h2>
                  <Button variant="primary" type="submit" onChange={enviarInfo5}>
                    Eliminar
                  </Button>
                </CCol>
              </CRow>
              <hr></hr>

              <br />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Reporteria</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                      <div className="text-medium-emphasis small">Pregunta 2</div>
                      <div className=" fw-semibold">
                        Cantidad de reproducciones por cada categoría, por tipo de cuenta para un
                        rango de fechas dado.
                      </div>
                    </div>
                  </CRow>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Categorias</Form.Label>
                    <DropdownButton
                      id="dropdown-basic-button"
                      title="Categorias"
                      name="categoriaReporteria"
                      onSelect={setValue8.categoriaReporteria}
                    >
                      <Dropdown.Item>Basico</Dropdown.Item>
                      <Dropdown.Item>Estandar</Dropdown.Item>
                      <Dropdown.Item>Avanzado</Dropdown.Item>
                    </DropdownButton>

                    <h1></h1>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Fecha inicio</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="Fecha"
                      name="fechaInicio"
                      onChange={setValue8}
                      value={value8.fechaInicio}
                    />
                    <h1></h1>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Fecha final</Form.Label>
                      <Form.Control
                        type="date"
                        placeholder="Fecha"
                        name="fechaFinal"
                        onChange={setValue8}
                        value={value8.fechaFinal}
                      />
                    </Form.Group>
                  </Form.Group>
                  <div className="mb-5">
                    <button type="button" className="btn btn-primary" onClick={mostrarQuerie2}>
                      {' '}
                      Mostrar{' '}
                    </button>
                    <h1></h1>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Categoria</th>
                          <th>Veces que aparece</th>
                        </tr>
                      </thead>
                      <tbody>
                        {resultado2.map((item) => (
                          <tr key={item.categoria}>
                            <td>{item.categoria}</td>
                            <td>{item.cuenta_categoria}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </CCol>

                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">Pregunta 1</div>
                        <div className=" fw-semibold">
                          El top 10 de géneros de contenido más visto, y los minutos consumidos para
                          un rango de fechas dado
                        </div>
                      </div>
                    </CCol>
                  </CRow>

                  <div className="mb-5">
                    <button type="button" className="btn btn-primary">
                      {' '}
                      Mostrar{' '}
                    </button>
                    <h1></h1>

                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>id Genero</th>
                          <th>Genero</th>
                          <th>Vistas por genero</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </CCol>

                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                      <div className="text-medium-emphasis small">Pregunta 3</div>
                      <div className=" fw-semibold">
                        El top 10 de los directores y actores principales de las películas que los
                        perfiles estándar y avanzados han visto.
                      </div>
                    </div>
                  </CRow>
                  <div className="mb-5">
                    <button type="button" className="btn btn-primary" onClick={mostrarQuerie3}>
                      {' '}
                      Mostrar{' '}
                    </button>
                    <h1></h1>

                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Nombre</th>
                          <th>Tipo</th>
                          <th>id Integrante</th>
                          <th>Cantidad de veces que aparece</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tbody>
                          {resultado3.map((item) => (
                            <tr key={item.nombre}>
                              <td>{item.nombre}</td>
                              <td>{item.tipo}</td>
                              <td>{item.idIntegrante}</td>
                              <td>{item.cantidad_veces_que_aparecen}</td>
                            </tr>
                          ))}
                        </tbody>
                      </tbody>
                    </Table>
                  </div>
                </CCol>

                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                      <div className="text-medium-emphasis small">Pregunta 4</div>
                      <div className=" fw-semibold">
                        La cantidad de cuentas avanzadas se han creado en los últimos 6 meses.
                      </div>
                    </div>
                  </CRow>
                  <div className="mb-5">
                    <button type="button" className="btn btn-primary" onClick={mostrarQuerie4}>
                      {' '}
                      Mostrar{' '}
                    </button>
                    <h1></h1>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>id Cuenta</th>
                          <th>Cantidad del tipo de cuenta</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          {resultado4.map((item) => (
                            <tr key={item.nombre}>
                              <td>{item.tipoCuenta}</td>
                              <td>{item.cuenta_tiempoCuenta}</td>
                            </tr>
                          ))}
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </CCol>

                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                      <div className="text-medium-emphasis small">Pregunta 5</div>
                      <div className=" fw-semibold">
                        Para una fecha específica, ¿cuál es la hora pico donde el servicio es más
                        utilizado?{' '}
                      </div>
                    </div>
                  </CRow>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Fecha</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="Fecha"
                      name="fechaQuerie5"
                      onChange={setValue9}
                      value={value9.fechaQuerie5}
                    />
                  </Form.Group>
                  <div className="mb-5">
                    <button type="button" className="btn btn-primary" onClick={mostrarQuerie5}>
                      {' '}
                      Mostrar{' '}
                    </button>
                    <h1></h1>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Hora</th>
                          <th>Cantidad de conexiones</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <tr>
                            {resultado5.map((item) => (
                              <tr key={item.nombre}>
                                <td>{item.horaConectar}</td>
                                <td>{item.horas}</td>
                              </tr>
                            ))}
                          </tr>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </CCol>
              </CRow>

              <br />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
