import { DELIVERY_ZONE } from "@/constants";

export const metadata = { title: "Términos y Condiciones" };

const sections = [
  {
    title: "1. Aceptación de los términos",
    body: "Al usar este sitio y realizar un pedido aceptás estos términos y condiciones en su totalidad. Si no estás de acuerdo, por favor no utilices la plataforma.",
  },
  {
    title: "2. Edad mínima",
    body: "La venta y entrega de bebidas alcohólicas está restringida a personas mayores de 18 años. Al registrarte y comprar declarás ser mayor de edad; nos reservamos el derecho de solicitar identificación al momento de la entrega.",
  },
  {
    title: "3. Productos y precios",
    body: "Los precios y la disponibilidad de los productos pueden cambiar sin previo aviso y están sujetos a existencias. Hacemos nuestro mejor esfuerzo por mantener la información actualizada, pero puede haber variaciones puntuales.",
  },
  {
    title: "4. Pedidos y pago",
    body: "Los pedidos se confirman una vez recibido el pago o comprobante correspondiente (SINPE Móvil, tarjeta o pago al recibir, según la zona). Nos reservamos el derecho de cancelar pedidos con información de entrega incompleta o pago no verificado.",
  },
  {
    title: "5. Entregas",
    body: `Entregamos en ${DELIVERY_ZONE} en 1-2 horas y a nivel nacional en 2-4 días hábiles, según la tarifa de envío indicada en el checkout. Los tiempos son estimados y pueden variar por tráfico, clima o disponibilidad logística.`,
  },
  {
    title: "6. Cancelaciones y reembolsos",
    body: "Podés solicitar la cancelación de un pedido antes de que sea despachado contactándonos por WhatsApp. Si el pedido ya fue entregado con productos dañados o incorrectos, contactanos dentro de las 24 horas para coordinar la solución.",
  },
  {
    title: "7. Consumo responsable",
    body: "Promovemos el consumo responsable de alcohol. No nos hacemos responsables por el uso indebido de los productos adquiridos ni por su reventa a terceros, incluyendo menores de edad.",
  },
  {
    title: "8. Cuentas de usuario",
    body: "Sos responsable de mantener la confidencialidad de tu contraseña y de toda actividad realizada desde tu cuenta.",
  },
  {
    title: "9. Ley aplicable",
    body: "Estos términos se rigen por las leyes de la República de Costa Rica.",
  },
];

export default function TermsPage() {
  return (
    <div className="section-padding" style={{ background: "#12110F" }}>
      <div className="container-max max-w-3xl">
        <p className="text-sm font-semibold mb-2" style={{ color: "#C9984A" }}>Legal</p>
        <h1 className="text-4xl font-black mb-2" style={{ color: "#F5F2EC" }}>Términos y Condiciones</h1>
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
