import { CambioIdioma } from '../../Componentes/Selector_Idioma/SelectorIdiom';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";


export default function TerminosCondiciones() {
    const [loading, setLoading] = useState(true);
    const [idioma, setIdioma] = useState(localStorage.getItem('idioma') || 'es');
    
      const cambiarIdioma = (nuevoIdioma) => {
        setIdioma(nuevoIdioma);
        localStorage.setItem('idioma', nuevoIdioma);
    }

    return (
      <div className="container p-4">
        <CambioIdioma idioma={idioma} onChangeIdioma={cambiarIdioma} />
        <div>
          <h2 className="mb-4">
            {idioma === 'es' ? 'Términos y Condiciones' : 'Terms and Conditions'}
          </h2>
  
          {idioma === 'es' ? (
            <>
              <p>
                Esta plataforma web es de propiedad de <strong>Víctor Ramírez</strong>. Al registrarte y utilizar nuestros servicios, aceptas expresamente estos Términos y Condiciones, los cuales regulan el acceso, uso y comportamiento dentro del sitio.
              </p>
  
              <h5>1. Servicios ofrecidos</h5>
              <p>
                Ofrecemos herramientas digitales para el seguimiento nutricional y de salud, incluyendo:
                <ul>
                  <li>Registro de datos personales como peso, altura, edad, género, etc.</li>
                  <li>Recomendaciones basadas en los objetivos personales (pérdida de peso, mantenimiento, ganancia).</li>
                  <li>Seguimiento de actividad física.</li>
                  <li>Recordatorios y notificaciones sobre hábitos saludables.</li>
                </ul>
                Estos servicios están orientados únicamente a fines informativos y de autoayuda. No sustituyen la opinión médica profesional.
              </p>
  
              <h5>2. Responsabilidad del usuario</h5>
              <p>
                El usuario se compromete a proporcionar información veraz y actualizada. El uso incorrecto o fraudulento de la plataforma puede resultar en la suspensión o eliminación de la cuenta.
              </p>
  
              <h5>3. Propiedad intelectual</h5>
              <p>
                Todo el contenido de esta plataforma, incluyendo textos, imágenes, código y diseño, es propiedad de Víctor Ramírez y está protegido por las leyes de propiedad intelectual. Queda prohibida su reproducción total o parcial sin consentimiento previo.
              </p>
  
              <h5>4. Privacidad y protección de datos</h5>
              <p>
                Nos comprometemos a proteger la privacidad de los usuarios conforme al Reglamento General de Protección de Datos (RGPD) de la Unión Europea. Consulta nuestra{' '}
                <Link to="/registro/PoliticaPrivacidad">Política de Privacidad</Link> para más información.
              </p>
  
              <h5>5. Cambios en los términos</h5>
              <p>
                Nos reservamos el derecho de modificar estos términos en cualquier momento. Se recomienda revisar periódicamente esta sección.
              </p>
            </>
          ) : (
            <>
              <p>
                This web platform is owned by <strong>Víctor Ramírez</strong>. By registering and using our services, you explicitly accept these Terms and Conditions, which govern access, usage, and behavior on the site.
              </p>
  
              <h5>1. Services Offered</h5>
              <p>
                We offer digital tools for health and nutrition tracking, including:
                <ul>
                  <li>Registration of personal data such as weight, height, age, gender, etc.</li>
                  <li>Recommendations based on personal goals (weight loss, maintenance, gain).</li>
                  <li>Physical activity tracking.</li>
                  <li>Reminders and notifications about healthy habits.</li>
                </ul>
                These services are intended solely for informational and self-help purposes. They do not replace professional medical advice.
              </p>
  
              <h5>2. User Responsibility</h5>
              <p>
                Users agree to provide accurate and up-to-date information. Misuse or fraudulent activity may result in account suspension or deletion.
              </p>
  
              <h5>3. Intellectual Property</h5>
              <p>
                All content on this platform, including text, images, code, and design, is the property of Víctor Ramírez and is protected by intellectual property laws. Reproduction, in whole or in part, is prohibited without prior consent.
              </p>
  
              <h5>4. Privacy and Data Protection</h5>
              <p>
                We are committed to protecting user privacy in accordance with the European Union’s General Data Protection Regulation (GDPR). Please refer to our{' '}
                <a href="/privacy-policy" target="_blank">Privacy Policy</a> for more information.
              </p>
  
              <h5>5. Changes to Terms</h5>
              <p>
                We reserve the right to modify these terms at any time. It is recommended to check this section periodically.
              </p>
            </>
          )}
        </div>
      </div>
    );
  }