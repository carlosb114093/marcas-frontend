"use client";

import { ChangeEvent, FormEvent } from 'react';
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link';
import { useFormContext } from '../../../app/context/FormContext'; 
import Layout from '../layout'; 
import Indicator from '../../Indicator'; 
interface CreateRegistroProps {
  params: { sequency: string };
}

const CreateRegistro = () => {
  const router = useRouter();
  const { formData, setFormData } = useFormContext();  
  
  const params = useParams();
  const currentStep = parseInt(params.sequency) || 1;
 
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;   
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    if (currentStep === 1 && !formData.brand_name) {
      alert('El nombre de la marca es obligatorio.');
      return;
    }
    if (currentStep === 2 && (!formData.brand_owner || !formData.date)) {
      alert('El nombre del propietario y la fecha son obligatorios.');
      return;
    }
    router.push(`/crear_registro/${currentStep + 1}`);
  };

  const handleBack = () => {
    router.back();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('https://marcas-backend.onrender.com/api/brands', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Registro creado exitosamente!');
        router.push('/');
      } else {
        alert('Hubo un error al crear el registro.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error de conexión con el servidor.');
    }
  };
 
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <form onSubmit={e => e.preventDefault()}>
            <h2 className="mb-4">1. Información de la Marca</h2>
            <div className="mb-3">
              <label htmlFor="brand_name" className="form-label">Nombre de la Marca</label>
              <input
                type="text"
                className="form-control"
                id="brand_name"
                name="brand_name"
                placeholder="Ej: Tech Innovations"
                value={formData.brand_name} 
                onChange={handleChange}     
                required
              />
            </div>
            <button className="btn btn-primary" onClick={handleNext}>
              Continuar <i className="bi bi-arrow-right"></i>
            </button>
          </form>
        );
      case 2:
        return (
          <form onSubmit={e => e.preventDefault()}>
            <h2 className="mb-4">2. Información del Propietario</h2>
            <div className="mb-3">
              <label htmlFor="brand_owner" className="form-label">Nombre del Propietario</label>
              <input
                type="text"
                className="form-control"
                id="brand_owner"
                name="brand_owner"
                placeholder="Ej: Carlos Pérez"
                value={formData.brand_owner} 
                onChange={handleChange}      
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="date" className="form-label">Fecha de Solicitud</label>
              <input
                type="date"
                className="form-control"
                id="date"
                name="date"
                value={formData.date} 
                onChange={handleChange} 
                required
              />
            </div>
            <div className="d-flex justify-content-between">
              <button type="button" className="btn btn-secondary" onClick={handleBack}>
                <i className="bi bi-arrow-left"></i> Atrás
              </button>
              <button className="btn btn-primary" onClick={handleNext}>
                Continuar <i className="bi bi-arrow-right"></i>
              </button>
            </div>
          </form>
        );
      case 3:
        return (
          <form onSubmit={handleSubmit}>
            <h2 className="mb-4">3. Resumen y Creación</h2>
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Resumen de Registro</h5>
                
                <p><strong>Nombre de Marca:</strong> {formData.brand_name}</p>
                <p><strong>Propietario:</strong> {formData.brand_owner}</p>
                <p><strong>Fecha de Solicitud:</strong> {formData.date}</p>
                <p><strong>Estado:</strong> {formData.brand_status}</p>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <button type="button" className="btn btn-secondary" onClick={handleBack}>
                <i className="bi bi-arrow-left"></i> Atrás
              </button>
              <button type="submit" className="btn btn-success">
                <i className="bi bi-check-lg"></i> Crear Registro
              </button>
            </div>
          </form>
        );
      default:
        return <div>Paso no válido.</div>;
    }
  };

  return (
    <Layout>
      <div className="container mt-5">
        <h1 className="text-center mb-4">Crear Nuevo Registro</h1>
        <Indicator currentStep={currentStep} />
        <div className="card">
          <div className="card-body">
            {renderStepContent()}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateRegistro;
