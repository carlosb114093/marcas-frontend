import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Indicator {
  currentStep: number;
}

const Indicator: React.FC<Indicator> = ({ currentStep }) => {
  const steps = [
    "1.Información de la Marca",
    "2.Información del Titular",
    "3.Resumen y Creación"
  ];

  return (
    <div className="progress-indicator-container my-4">
      <div className="d-flex justify-content-between">
        {steps.map((step, index) => (
          <div key={index} className="text-center position-relative" style={{ width: '33.33%' }}>
            <div
              className={`rounded-circle d-inline-flex align-items-center justify-content-center border border-2 ${
                index + 1 === currentStep ? 'bg-primary border-primary text-white' : 'bg-light border-secondary text-secondary'
              }`}
              style={{ width: '40px', height: '40px', zIndex: '1' }}
            >
              {index + 1}
            </div>
            <p className="mt-2" style={{ fontSize: '0.9rem', color: index + 1 === currentStep ? '#0d6efd' : '#6c757d' }}>
              {step}
            </p>
            {index < steps.length - 1 && (
              <div
                className="progress-bar-line position-absolute top-50 translate-middle-y"
                style={{
                  height: '2px',
                  width: '100%',
                  left: '50%',
                  backgroundColor: index + 1 < currentStep ? '#0d6efd' : '#e9ecef',
                  zIndex: '0'
                }}
              ></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Indicator;