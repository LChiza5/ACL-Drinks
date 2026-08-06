import { SINPE_NAME } from "@/constants";

export const metadata = { title: "Política de Privacidad" };

const sections = [
  {
    title: "1. Datos que recopilamos",
    body: "Recopilamos la información que nos proporcionás al crear una cuenta o hacer un pedido: nombre, correo electrónico, teléfono, dirección de entrega e historial de compras. Nunca solicitamos datos de tarjetas u otra información financiera sensible dentro de la plataforma; los pagos con SINPE Móvil se coordinan directamente entre vos y nuestra cuenta.",
  },
  {
    title: "2. Cómo usamos tu información",
    body: "Usamos tus datos exclusivamente para procesar y entregar tus pedidos, darte soporte, enviarte actualizaciones sobre el estado de tu compra y, si lo autorizás, avisarte de promociones. No usamos tus datos para fines distintos a los que motivaron su recolección.",
  },
  {
    title: "3. Con quién compartimos datos",
    body: "Compartimos la dirección de entrega únicamente con el personal encargado de la logística del pedido. No vendemos ni alquilamos tu información personal a terceros bajo ninguna circunstancia.",
  },
  {
    title: "4. Seguridad",
    body: "Tu contraseña se almacena cifrada (hash) y nunca en texto plano. Aplicamos controles de acceso para que solo el personal autorizado pueda ver información de pedidos y clientes.",
  },
  {
    title: "5. Tus derechos",
    body: `Podés solicitar acceso, corrección o eliminación de tus datos personales escribiéndonos a nuestro correo o WhatsApp de contacto. Atendemos estas solicitudes como ${SINPE_NAME}.`,
  },
  {
    title: "6. Menores de edad",
    body: "Este sitio vende bebidas alcohólicas y su uso está restringido a personas mayores de 18 años. No recopilamos intencionalmente datos de menores de edad.",
  },
  {
    title: "7. Cambios a esta política",
    body: "Podemos actualizar esta política ocasionalmente. Los cambios importantes se reflejarán en esta misma página con la fecha de última actualización.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="section-padding" style={{ background: "#12110F" }}>
      <div className="container-max max-w-3xl">
        <p className="text-sm font-semibold mb-2" style={{ color: "#C9984A" }}>Legal</p>
        <h1 className="text-4xl font-black mb-2" style={{ color: "#F5F2EC" }}>Política de Privacidad</h1>
        <p className="text-sm mb-10" style={{ color: "#B8B1A7" }}>Última actualización: agosto 2026</p>

        <div className="space-y-8">
          {sections.map((s) => (
            <div key={s.title} className="glass-card rounded-xl p-6">
              <h2 className="text-lg font-bold mb-2" style={{ color: "#F5F2EC" }}>{s.title}</h2>
              <p className="text-sm leading-relaxed" style={{ color: "#B8B1A7" }}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
