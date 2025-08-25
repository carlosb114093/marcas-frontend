"use client";
import { useEffect, useState } from "react";
import { Table, Badge, Button, Form, InputGroup, Navbar, Offcanvas, Nav } from "react-bootstrap";
import { PencilSquare, Trash, HouseDoor, Speedometer2, Briefcase, FileEarmarkText, Bell, QuestionCircle, Gear } from "react-bootstrap-icons";
import Image from "next/image";
import Link from "next/link";

export default function BrandsPage() {
  const [brands, setBrands] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetch("https://marcas-backend.onrender.com/api/brands")
      .then((res) => res.json())
      .then((data) => setBrands(data))
      .catch((err) => console.error("Error al cargar:", err));
  }, []);

  const filteredBrands = brands.filter((b) => {
    return (
      b.brand_name.toLowerCase().includes(search.toLowerCase()) &&
      (filter ? b.brand_status === filter : true)
    );
  });

  const renderStatus = (status: string) => {
    switch (status) {
      case "Activo":
        return <Badge bg="success">Activo</Badge>;
      case "Inactivo":
        return <Badge bg="warning">Inactivo</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  const handleDelete = async (id: string) => {
    await fetch(`https://marcas-backend.onrender.com/api/brands/${id}`, { method: "DELETE" });
    setBrands(brands.filter((b) => b.id !== id));
  };

  const handleUpdate = (id: string) => {
    alert(`Actualizar registro con id: ${id}`);
  };

  return (
    <div className="container-fluid">
      <div className="row">        
        <div className="d-none d-md-block col-md-3 col-lg-2 bg-light vh-100 p-3">
          <h5 className="mb-4">Menú</h5>
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link text-muted" href="#">
                <HouseDoor className="me-2" /> Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-bold" href="#">
                <Speedometer2 className="me-2" /> Panel
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-muted" href="#">
                <Briefcase className="me-2" /> Servicios
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active fw-bold text-white bg-danger rounded px-2" href="#">
                <FileEarmarkText className="me-2" /> Registro de Marca
              </a>
            </li>
          </ul>
        </div>
       
        <div className="col-12 col-md-9 col-lg-10 p-0">          
          <Navbar expand="md" bg="dark" variant="dark" className="d-md-none">
            <Button variant="dark" onClick={handleShow} className="me-2">
              Menú
            </Button>
            <Navbar.Brand href="#">Gestión de Marcas</Navbar.Brand>
            <Navbar.Toggle aria-controls="offcanvasNavbar" />
            <Navbar.Offcanvas
              id="offcanvasNavbar"
              aria-labelledby="offcanvasNavbarLabel"
              placement="start"
              show={show}
              onHide={handleClose}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id="offcanvasNavbarLabel">Menú</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="#">Dashboard</Nav.Link>
                  <Nav.Link href="#">Panel</Nav.Link>
                  <Nav.Link href="#">Servicios</Nav.Link>
                  <Nav.Link href="#">Registro de Marca</Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Navbar>
          
          <div className="d-flex justify-content-end align-items-center px-3 py-2 bg-dark text-white">
            <Bell className="me-3" size={18} />
            <QuestionCircle className="me-3" size={18} />
            <Gear className="me-3" size={18} />
            <div className="d-flex align-items-center">
              <span className="me-2 d-none d-sm-block">carlosb05</span>
              <Image
                src="/avatar.png"
                alt=" "
                width={32}
                height={32}
                className="rounded-circle border border-light"
              />
            </div>
          </div>
          
          <h2 className="mb-4 px-3 pt-3">Gestión de Marcas</h2>
         
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center px-3 mb-3">  
          <InputGroup className="w-100 me-md-2 mb-2 mb-md-0">
            <Form.Control
              placeholder="Buscar marca..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
          
          <Form.Select className="w-100 w-md-auto me-md-2 mb-2 mb-md-0">
            <option value="">Todos</option>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </Form.Select>
          
          <Link href="/crear_registro/${sequency}" passHref>
            <Button variant="danger" className="w-100 w-md-auto py-2 px-4">
              Nuevo Registro
            </Button>
          </Link>
        </div>          
        
          <div className="table-responsive px-3">
            <Table hover bordered className="align-middle shadow-sm">
              <thead className="table-light">
                <tr>
                  <th>Marca</th>
                  <th>Propietario</th>
                  <th className="d-none d-sm-table-cell">Fecha creación</th>
                  <th>Estado</th>
                  <th className="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
              {filteredBrands.length > 0 ? (
                filteredBrands.map((brand) => (
                  <tr key={brand.id}>
                    <td>{brand.brand_name}</td>
                    <td>{brand.brand_owner}</td>
                    <td className="d-none d-sm-table-cell">{brand.date}</td>
                    <td>{renderStatus(brand.brand_status)}</td>
                    <td className="text-center">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                        onClick={() => handleUpdate(brand.id)}
                      >
                        <PencilSquare />
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(brand.id)}
                      >
                        <Trash />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center">
                    No hay registros disponibles
                  </td>
                </tr>
              )}
            </tbody>
              
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
