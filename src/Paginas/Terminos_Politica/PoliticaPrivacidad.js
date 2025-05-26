import { CambioIdioma } from '../../Componentes/Selector_Idioma/SelectorIdiom';
import { useState, useEffect } from 'react';

export default function PoliticaPrivacidad(){
    const [idioma, setIdioma] = useState(localStorage.getItem('idioma') || 'es');
    
    const cambiarIdioma = (nuevoIdioma) => {
      setIdioma(nuevoIdioma);
      localStorage.setItem('idioma', nuevoIdioma);
  }
  return(
    <div className="container p-4">
        <CambioIdioma idioma={idioma} onChangeIdioma={cambiarIdioma} />
        <div>
        <h2 className="mb-4">
          {idioma === 'es' ? 'Política de Privacidad' : 'Privacy Policy'}
        </h2>

        {idioma === 'es' ? (
          <>
            <p>
              Esta Política de Privacidad describe cómo recopilamos, utilizamos y protegemos la información personal que proporcionas cuando accedes y usas nuestra plataforma. Al usar nuestro servicio, aceptas esta política.
            </p>

            <h5>1. Información que recopilamos</h5>
            <p>
              Recopilamos diferentes tipos de información cuando te registras en nuestra plataforma, incluyendo:
              <ul>
                <li><strong>Información personal:</strong> Nombre, dirección de correo electrónico, género, edad, etc.</li>
                <li><strong>Información de uso:</strong> Datos relacionados con cómo usas nuestra plataforma, como las páginas que visitas y la duración de tu actividad.</li>
                <li><strong>Información técnica:</strong> Dirección IP, tipo de dispositivo, navegador, sistema operativo, entre otros.</li>
              </ul>
            </p>

            <h5>2. Cómo utilizamos tu información</h5>
            <p>
              Usamos la información recopilada para:
              <ul>
                <li>Proporcionarte nuestros servicios de manera efectiva.</li>
                <li>Mejorar tu experiencia en nuestra plataforma.</li>
                <li>Enviar notificaciones relacionadas con la plataforma (si has optado por recibirlas).</li>
                <li>Responder a tus consultas y brindar soporte.</li>
                <li>Realizar análisis y mejorar la calidad de nuestros servicios.</li>
              </ul>
            </p>

            <h5>3. Cómo protegemos tu información</h5>
            <p>
              Tomamos medidas de seguridad razonables para proteger tu información personal, como cifrado de datos y acceso restringido. Sin embargo, debes tener en cuenta que ningún sistema es 100% seguro.
            </p>

            <h5>4. Compartir tu información</h5>
            <p>
              No compartimos tu información personal con terceros, excepto en las siguientes circunstancias:
              <ul>
                <li>Cuando sea necesario para proporcionarte nuestros servicios (por ejemplo, procesadores de pagos).</li>
                <li>Cuando sea requerido por la ley o en respuesta a una solicitud legal.</li>
                <li>Con proveedores de servicios de confianza que nos ayuden a operar la plataforma.</li>
              </ul>
            </p>

            <h5>5. Tus derechos sobre la información</h5>
            <p>
              Tienes derecho a:
              <ul>
                <li>Acceder a tu información personal.</li>
                <li>Solicitar la corrección o eliminación de tu información.</li>
                <li>Solicitar que dejemos de procesar tu información, bajo ciertas condiciones.</li>
              </ul>
            </p>

            <h5>6. Cookies</h5>
            <p>
              Utilizamos cookies para mejorar la experiencia del usuario y realizar análisis sobre el uso de nuestra plataforma. Puedes configurar tu navegador para bloquear las cookies, pero algunas funciones pueden no estar disponibles.
            </p>

            <h5>7. Cambios en esta política</h5>
            <p>
              Nos reservamos el derecho de modificar esta política en cualquier momento. Las actualizaciones serán publicadas en esta página, y la fecha de la última actualización será indicada al final del documento.
            </p>

            <h5>8. Contacto</h5>
            <p>
              Si tienes alguna pregunta o inquietud sobre nuestra Política de Privacidad, puedes contactarnos a través de la dirección de correo electrónico: <strong>calkal685@gmail.com</strong>.
            </p>
          </>
        ) : (
          <>
            <p>
              This Privacy Policy describes how we collect, use, and protect the personal information you provide when accessing and using our platform. By using our service, you agree to this policy.
            </p>

            <h5>1. Information We Collect</h5>
            <p>
              We collect various types of information when you register on our platform, including:
              <ul>
                <li><strong>Personal information:</strong> Name, email address, gender, age, etc.</li>
                <li><strong>Usage information:</strong> Data related to how you use our platform, such as pages you visit and the duration of your activity.</li>
                <li><strong>Technical information:</strong> IP address, device type, browser, operating system, and others.</li>
              </ul>
            </p>

            <h5>2. How We Use Your Information</h5>
            <p>
              We use the collected information to:
              <ul>
                <li>Provide our services to you effectively.</li>
                <li>Improve your experience on our platform.</li>
                <li>Send notifications related to the platform (if you have opted to receive them).</li>
                <li>Respond to your inquiries and provide support.</li>
                <li>Perform analysis and improve the quality of our services.</li>
              </ul>
            </p>

            <h5>3. How We Protect Your Information</h5>
            <p>
              We take reasonable security measures to protect your personal information, such as data encryption and restricted access. However, you should be aware that no system is 100% secure.
            </p>

            <h5>4. Sharing Your Information</h5>
            <p>
              We do not share your personal information with third parties, except in the following circumstances:
              <ul>
                <li>When necessary to provide our services (e.g., payment processors).</li>
                <li>When required by law or in response to a legal request.</li>
                <li>With trusted service providers who help us operate the platform.</li>
              </ul>
            </p>

            <h5>5. Your Rights Over Your Information</h5>
            <p>
              You have the right to:
              <ul>
                <li>Access your personal information.</li>
                <li>Request correction or deletion of your information.</li>
                <li>Request that we stop processing your information, under certain conditions.</li>
              </ul>
            </p>

            <h5>6. Cookies</h5>
            <p>
              We use cookies to enhance the user experience and perform analysis on the use of our platform. You can configure your browser to block cookies, but some features may not be available.
            </p>

            <h5>7. Changes to This Policy</h5>
            <p>
              We reserve the right to modify this policy at any time. Updates will be posted on this page, and the date of the last update will be indicated at the end of the document.
            </p>

            <h5>8. Contact</h5>
            <p>
              If you have any questions or concerns about our Privacy Policy, you can contact us at: <strong>calkal685@gmail.com</strong>.
            </p>
          </>
        )}
      </div>
    </div>
  )
}