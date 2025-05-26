import './SelectorIdioma.css';
// CambioIdioma.jsx
import Select from 'react-select';

export function CambioIdioma({ idioma, onChangeIdioma, className }) {
  const opciones = [
    { value: 'es', label: '🇪🇸 Español' },
    { value: 'en', label: '🇺🇸 English' },
  ];

const estilosPersonalizados = {
  control: (base, state) => ({
    ...base,
    border: `1.5px solid ${state.isHovered ? '#E4B363' : '#4CAF87'}`,
    backgroundColor: 'transparent',
    fontSize: '0.9rem',
    fontWeight: 600,
    borderRadius: 4,
    cursor: 'pointer',
    boxShadow: 'none',
    color: state.isHovered ? '#E4B363' : '#4CAF87',
    transition: 'all 0.2s ease',
    '&:hover': {
      borderColor: '#E4B363',
      color: '#E4B363',
    },
  }),

  singleValue: (base, state) => ({
    ...base,
    color: '#4CAF87',
    transition: 'color 0.2s ease',
    '.react-select__control:hover &': {
      color: '#E4B363',
    },
  }),

  dropdownIndicator: (base, state) => ({
    ...base,
    color: '#4CAF87',
    transition: 'color 0.2s ease',
    '&:hover': {
      color: '#E4B363',
    },
    '.react-select__control:hover &': {
      color: '#E4B363',
    },
  }),

  indicatorSeparator: () => ({
    display: 'none',
  }),

  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? '#4CAF87' : state.isSelected ? 'transparent' : 'white',
    color: state.isFocused ? 'white' : '#4CAF87',
    fontWeight: state.isSelected ? 600 : 400,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    paddingTop: '4px',       // 🔽 Ajusta espacio superior
    paddingBottom: '4px',    // 🔼 Ajusta espacio inferior
    paddingLeft: '10px',
    paddingRight: '10px',
    minHeight: 'unset', 
  }),

  menu: (base) => ({
    ...base,
    border: '1px solid #4CAF87',
    zIndex: 100,
  }),
};



  return (
    <div className={`cambioIdioma-container ${className}`}>
      <Select
        options={opciones}
        defaultValue={opciones.find((o) => o.value === idioma)}
        onChange={(opcion) => onChangeIdioma(opcion.value)}
        classNamePrefix="custom-select"
        styles={estilosPersonalizados}
        isSearchable={false}
      />
    </div>
  );
}

