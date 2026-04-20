import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, ShoppingBag, Star, Clock, X, CheckCircle2, Truck, ChevronRight, CreditCard, Smartphone, Check, LayoutGrid, Package, ArrowRight, Sparkles, Eye, Timer, Sun, Moon, MessageCircle, Send, Plus, Minus, Scale, Lock, Search } from 'lucide-react';
import Markdown from 'react-markdown';

const CATEGORIES = ["Todo", "Tendencias", "Calzado", "Abrigos Racing", "Belleza y Salud", "Hogar"];

const ALL_PRODUCTS = [
  // TENDENCIAS & HOGAR
  { id: 1, title: "Nube Tulipanes Infinitos", desc: "Lámpara mágica infinita. Crea una atmósfera relajante y romántica imposible de ignorar. ¡El regalo perfecto que todos envidiarán!", img: "https://ugc.production.linktr.ee/079fafb7-a07d-416f-98db-5d548be7492b_image.png", stock: 12, tag: "Viral", price: "$89.900", fakeOldPrice: "$150.000", category: ["Hogar", "Tendencias"], aida: { attention: "¿Cansada de espacios aburridos y sin vida?", interest: "Esta lámpara mágica de tulipanes infinitos crea una ilusión óptica hipnotizante, transformando cualquier cuarto en un santuario de paz y romance.", desire: "Diseño premium, luces LED de larga duración y un efecto espejo 3D que dejará a todos tus invitados con la boca abierta. ¡Tu espacio soñado a un click!", action: "¡STOCK LIMITADO! Obtén Envío Gratis a toda Colombia solo por hoy."} },
  { id: 2, title: "Humidificador Fogata 🔥", desc: "Convierte tu cuarto en un spa de lujo. Aromaterapia con fuego visual que elimina el estrés al instante. ¡Siente la paz hoy!", img: "https://ugc.production.linktr.ee/d26967e0-704c-4022-bf4a-782563466152_image.png", stock: 5, tag: "Envío Gratis", price: "$99.900", fakeOldPrice: "$180.000", category: ["Hogar", "Tendencias"], aida: { attention: "¿Ansiedad y estrés después de un largo día?", interest: "Sumérgete en aromaterapia de alto nivel con este humidificador que simula una reconfortante fogata visual 100% segura y fría.", desire: "Alivia problemas de sueño, humecta tu piel y perfuma cada rincón con elegancia inigualable.", action: "¡Últimas 5 unidades con 45% OFF + Garantía de Satisfacción Total!"} },
  { id: 3, title: "Pop Puck", desc: "El juguete antiestrés #1 mundialmente. Magnético, ultra satisfactorio y adictivo. ¡Alivia la ansiedad con estilo a donde vayas!", img: "https://ugc.production.linktr.ee/6ccf676d-6afb-44a7-964e-fe2744989874_image.png", stock: 24, tag: "Top Ventas", price: "$79.900", fakeOldPrice: "$120.000", category: ["Tendencias"], aida: { attention: "¿Tus manos no pueden estar quietas?", interest: "Descubre el gadget magnético del que todo TikTok está hablando. Satisfactorio, adictivo y perfecto para combatir el estrés diario.", desire: "Aumenta tu enfoque mientras te diviertes lanzando sus imanes de neodimio que te darán la satisfacción táctil que tu cerebro necesita.", action: "Aprovecha el 2x1 y no pagues envío. ¡Corre antes de que se agoten!"} },
  
  // BELLEZA Y SALUD
  { id: 4, title: "Combo Cabello Perfecto", desc: "Resultados de salón sin salir de casa. Repara, da brillo extremo y sedosidad en 4 pasos. ¡Tu cabello nunca se vio tan radiante!", img: "https://ugc.production.linktr.ee/200b9fba-25e9-4b9a-8038-b0dee9de95ef_image.png", stock: 8, tag: "Oferta", price: "$149.900", fakeOldPrice: "$250.000", category: ["Belleza y Salud", "Tendencias"], aida: { attention: "¿Tu cabello luce apagado, seco o con frizz?", interest: "Este combo premium de 4 pasos reconstruye cada hebra de cabello desde adentro hacia afuera, dándote calidad de salón.", desire: "Queratina activa, libre de parabenos y resultados visibles desde la primera aplicación. Deslumbra con una melena de revista garantizada.", action: "¡Lleva el KIT COMPLETO hoy con descuento especial y paga en casa!"} },
  { id: 5, title: "Masajeador Facial LED", desc: "El secreto de la eterna juventud. Terapia LED que borra las finas líneas de edad y multiplica el efecto de tus cremas. ¡Luce tu mejor versión!", img: "https://ugc.production.linktr.ee/00d7c4d8-ed4a-4f3e-9adf-dab6fe5789c1_image.png", stock: 3, tag: "Agotándose", price: "$129.900", fakeOldPrice: "$210.000", category: ["Belleza y Salud"], aida: { attention: "¿Notas que tus cremas ya no hacen el mismo efecto?", interest: "La fototerapia LED rompe barreras permitiendo que el colágeno natural regrese y tus sueros penetren a profundidad.", desire: "Elimina ojeras, papada y líneas finas con solo 5 minutos al día. Consigue la piel de porcelana que mereces.", action: "¡Solo 3 en bodega! Consíguelo ya con Envío Prioritario Gratis."} },
  { id: 6, title: "Uro Probiotics + Regalo", desc: "Salud íntima y digestiva premium. Siéntete ligera, desinflamada y segura todos los días. ¡Tu bienestar es lo central de ti, incluye regalo!", img: "https://ugc.production.linktr.ee/43fae65b-feea-425f-9162-a4122d7dfdfd_image.png", stock: 15, tag: "Salud", price: "$125.000", fakeOldPrice: "$195.000", category: ["Belleza y Salud", "Tendencias"], aida: { attention: "¿Hinchazón abdominal constante o molestias íntimas?", interest: "La flora intestinal e íntima dicta cómo te sientes. Regula tu organismo con probióticos de ultra-acción rápida.", desire: "Piel más limpia, barriga plana y cero preocupaciones bacterianas. Siéntete ligera, confiada e imparable todos los días.", action: "¡Promo lanzamiento: Incluye Jabón Íntimo Especial de Regalo + Envío 0$!"} },

  // CALZADO
  { id: 7, title: "Nike Zoom X", desc: "Alcanza tu máximo potencial. Zapatillas ultra ligeras diseñadas para correr más rápido cansándote menos. ¡Siente que vuelas sobre la calle!", img: "https://ugc.production.linktr.ee/448f66bf-774e-41ae-8969-6c2a30e1f0dc_image.png", stock: 4, tag: "Deportivo", price: "$145.000", fakeOldPrice: "$280.000", category: ["Calzado", "Tendencias"], aida: { attention: "¿Sientes dolor articular después de caminar o entrenar?", interest: "Descubre la tecnología de cámara Zoom. Absorben el impacto para que tus rodillas no sufran y tus pasos fluyan.", desire: "Súper transpirables, estéticas e impulsan tu pie hacia adelante. Aumenta tu rendimiento logrando tus metas.", action: "¡OFERTA FLASH! Obtén el tuyo antes de que se agoten (Solo 4 Tallas)." } },
  { id: 8, title: "Nike Jordan Air Retro 1", desc: "El ícono indiscutible del streetwear. Calidad AAA, comodidad absoluta y el estilo que te hará destacar en donde pises.", img: "https://ugc.production.linktr.ee/8c63c901-915e-4be2-96ea-cc92b6d4503d_image.png", stock: 7, tag: "VIP", price: "$149.900", fakeOldPrice: "$300.000", category: ["Calzado"], aida: { attention: "¿Quieres dominar la calle con el mejor estilo?", interest: "Las Retro 1 no son solo zapatos, son un símbolo de lujo urbano y exclusividad que se roban las miradas.", desire: "Acabados premium AAA, costuras reforzadas y una estética que combina con todo tu armario sin esfuerzo.", action: "Edición Limitada. Haz tu pedido y págalo seguro en la puerta de tu casa." } },
  { id: 9, title: "Adidas Samba", desc: "La silueta agotada en todo el mundo. Un diseño clásico de lujo para elevar cualquier outfit urbano. ¡No te quedes sin las tuyas!", img: "https://ugc.production.linktr.ee/2b49eb43-d7ac-4322-8943-badc093b97de_image.png", stock: 2, tag: "Últimas", price: "$139.900", fakeOldPrice: "$230.000", category: ["Calzado"], aida: { attention: "¿Buscando el modelo imposible de encontrar?", interest: "Las Samba han vuelto y están sold out en todas partes. Ahora tienes la oportunidad de tener el par que todos envidian.", desire: "Polo a tierra del Old Money y el Streetwear. Completamente versátil y atemporales.", action: "⚠️ ¡ALERTA! Solo nos quedan 2 pares. ¡Asegúralas AHORA!" } },
  { id: 10, title: "New Balance 530", desc: "Confort extremo con estética chunky fenomenal. La tendencia que domina Instagram, perfecta para caminar horas sin perder el estilo.", img: "https://ugc.production.linktr.ee/530fcf18-5692-4449-9f82-cab0746271bb_image.png", stock: 12, tag: "Tendencia", price: "$142.900", fakeOldPrice: "$240.000", category: ["Calzado"], aida: { attention: "¿Pasas horas de pie o caminando?", interest: "La revolución del confort ha llegado con una suela acolchada de otro planeta. Es como llevar nubes en los pies.", desire: "La tendencia más amada por influencers para lucir genial sin tener dolor de espalda ni fatiga en los pies.", action: "Disfruta de Envío Express Gratis ordenando en los próximos Minutos." } },
  { id: 11, title: "Puma X Ferrari", desc: "Elegancia a máxima velocidad. Diseño motorsport que fusiona lujo y aerodinámica para un look impecable. ¡Impón total respeto!", img: "https://ugc.production.linktr.ee/8b39af62-b20e-4213-9af9-6e32a708face_image.png", stock: 6, tag: "Exclusivo", price: "$135.000", fakeOldPrice: "$220.000", category: ["Calzado"], aida: { attention: "¿Te apasiona la estética Racing Exclusiva?", interest: "Calzado aerodinámico diseñado para el día a día pero inspirado en las pistas de Modena, Italia. Precisión pura.", desire: "Ajuste tipo guante y un perfil sofisticado que te separa de la multitud. Transmite velocidad y éxito.", action: "Haz la orden hoy con 30% OFF directo y paga contra entrega." } },
  { id: 12, title: "Sketchers Confort Flex", desc: "Como caminar sobre nubes de almohada. Soporte ortopédico disfrazado de diseño vanguardista. ¡Adiós a los dolores después de un largo día!", img: "https://ugc.production.linktr.ee/9bf779de-8e9c-458c-83dd-62a66de9f604_image.png", stock: 9, tag: "Nuevo", price: "$129.900", fakeOldPrice: "$180.000", category: ["Calzado"], aida: { attention: "¿Tus pies te ruegan un descanso?", interest: "Desarrollados con podólogos para alinear tu postura. No tienes que sacrificar estilo por comodidad extrema.", desire: "Plantilla Memory Foam Inmediata, material transpirable e hiper-flexible ideal para jornadas exhaustivas.", action: "Llévalos hoy mismo con Cobertura Extra y Envío Sin Costo." } },

  // ABRIGOS RACING
  { id: 13, title: "Chaqueta BMW Negro", desc: "Imponente, misteriosa y premium. Conquista el frío con esta chaqueta rompevientos edición Full Black. ¡Actitud de ganador indomable!", img: "https://ugc.production.linktr.ee/dff77405-2d89-4f13-9b77-b1382780a9fb_image.png", stock: 3, tag: "Premium", price: "$149.900", fakeOldPrice: "$290.000", category: ["Abrigos Racing", "Tendencias"], aida: { attention: "¿Quieres protegerte del frío con elegancia suprema?", interest: "Rompevientos ultraligero y térmico 100% impermeable con escudos premium de BMW. Siente el estatus de la liga superior.", desire: "Corte Slim-Fit que realza la figura y bolsillos de seguridad. Impondrás respeto allí donde vayas.", action: "⚠️ Edición Competizione casi agotada. ¡Cómprala con envío Priority Gratis!" } },
  { id: 14, title: "Chaqueta BMW Azul XDrive", desc: "Rompe la monotonía. Protección térmica absoluta con un tono vibrante que grita exclusividad y pura adrenalina racing para domar la noche.", img: "https://ugc.production.linktr.ee/58ffd69e-c7bb-4e4a-ab3e-4e596bb51dbb_image.png", stock: 5, tag: "Racing", price: "$145.000", fakeOldPrice: "$280.000", category: ["Abrigos Racing"], aida: { attention: "¿El negro te aburre y quieres sobresalir?", interest: "El color insignia 'Estoril Blue' Motorsport no pasa desapercibido. Repele agua y corta el viento en motocicleta o auto.", desire: "Siéntete dentro de un auto deportivo con cada detalle de la prenda. Costuras y cremalleras de alta durabilidad.", action: "¡Liquidación Especial Hoy! Añádela y paga seguro en casa." } },
  { id: 15, title: "Chaqueta BMW Rojo", desc: "Inmortaliza tu presencia. El intenso escarlata definitivo para quienes no temen ser el centro de atención. ¡Calidad insuperable, un fuego!", img: "https://ugc.production.linktr.ee/b0205ea4-baa8-420a-8881-d51d16232bcf_image.png", stock: 2, tag: "Últimas", price: "$149.900", fakeOldPrice: "$295.000", category: ["Abrigos Racing"], aida: { attention: "¿Listo para robarte absolutamente todas las miradas?", interest: "El rojo fuego es símbolo de poder. Esta chaqueta térmica premium será tu armadura en climas complejos.", desire: "Atrae la atención, refleja éxito y mantente cálido y cómodo por dentro. Tu guardarropa la necesita con urgencia.", action: "¡Pocas Unidades! Termina tu orden y activa tu Seguro de Envío 100% Gratis." } },
  { id: 16, title: "Chaqueta BMW Beige M4", desc: "El nuevo clásico. Neutra, ridículamente elegante e ideal para elevar tu guardarropa todos los días. ¡Sofisticación al máximo para lucir caro!", img: "https://ugc.production.linktr.ee/23b4d754-1b35-4007-964c-c5535aa12ad7_image.png", stock: 4, tag: "Elegante", price: "$146.900", fakeOldPrice: "$270.000", category: ["Abrigos Racing"], aida: { attention: "¿Fan de vestir en tonos neutros y verte muy 'Caro'?", interest: "Inspirada en los cueros interiores de la saga M4. Una pieza 'Old Money' Motorsport totalmente versátil para el día, tarde o noche.", desire: "Totalmente forrada, acabados suaves y repele la lluvia. Elevará cualquier outfit por más sencillo que sea.", action: "Promoción Irrepetible. ¡Llévate la sofisticación directo a casa hoy!" } },
  { id: 17, title: "Chaqueta BMW Gris Duna", desc: "Minimalismo industrial del olimpo automovilístico. Chaqueta abrigadora táctica, perfecta para rodar por la ciudad comodamente abrigado.", img: "https://ugc.production.linktr.ee/451cdf3d-0d88-46c7-9adb-84b0c8ac3794_image.png", stock: 7, tag: "Rebaja", price: "$139.900", fakeOldPrice: "$250.000", category: ["Abrigos Racing"], aida: { attention: "¿Buscas una rompevientos moderna y sigilosa?", interest: "Gris nardo táctico, una tonalidad exclusiva para un estilo industrial y limpio. Capota incluida y múltiples compartimentos.", desire: "Combina a la perfección con tenis y pantalón de vestir o jeans. Mantente aislado térmicamente y libre de humedad.", action: "¡Precio Caído Solo Por Hoy! Cómprala con un solo clic abajo." } },

  // HOGAR EXTRAS
  { id: 18, title: "Moledora en Tendencia", desc: "El chef privado de tu cocina. Procesa especias y aliños en segundos, sin ensuciarte las manos y a la perfección. ¡Sabor maximizado!", img: "https://ugc.production.linktr.ee/aa67f292-f7a9-4f85-ab49-f28305bc0f05_image.png", stock: 15, tag: "Hogar", price: "$85.000", fakeOldPrice: "$140.000", category: ["Hogar"], aida: { attention: "¿Cansada de picar cilantro, cebolla y ajo a mano?", interest: "Olvídate de dedos con olor e irritación ocular. Este mini procesador eléctrico tritura en cuestión de 5 segundos.", desire: "Diseño premium, cuchillas de acero inoxidable y fácil limpieza. Ahorra hasta media hora al día preparando tus comidas.", action: "Aprovecha el 40% OFF. ¡Promoción por Cierre de Bodega!" } },
  { id: 19, title: "Dispensador de Aceite", desc: "El gran secreto fitness de hoy. Controla las porciones exactas en spray, reduce calorías y ahorra hasta el último peso. ¡Salud indispensable!", img: "https://ugc.production.linktr.ee/9a4e6227-4ab1-47d3-baf4-cee8a8c7a53f_image.png", stock: 20, tag: "Cocina", price: "$79.900", fakeOldPrice: "$120.000", category: ["Hogar"], aida: { attention: "¿Sabías que añades hasta 500 calorías 'invisibles' en aceite?", interest: "Usa solo lo necesario con este spray dispensador premium. Ideal para repostería, freidoras de aire y ensaladas saludables.", desire: "Ahorra 4 veces más aceite y reduce la grasa innecesaria de tu comida mientras proteges tu freidora y tu figura.", action: "¡Paga seguro y obtén nuestra garantía contra daños!" } },
  { id: 20, title: "Girochef 360 PRO 🔪", desc: "Revoluciona tu tiempo de cocinar. Corta, lamina y ralla vegetales en tiempo récord protegiendo tus manos. ¡Una real magia en la cocina!", img: "https://ugc.production.linktr.ee/d580672b-3bc3-451a-8000-7c4c32eb6c41_image.png", stock: 8, tag: "Oferta", price: "$99.900", fakeOldPrice: "$190.000", category: ["Hogar"], aida: { attention: "¿Hacer ensalada te roba muchísimo tiempo?", interest: "Ralla queso, rebana papas finas y pica verduras sin riesgo a cortarte, todo en segundos haciéndolo girar suavemente.", desire: "Incluye 3 cilindros intercambiables profesionales. Base adherente de seguridad y un mecanismo increíblemente rápido.", action: "¡Llévate el Pack 3 en 1 con Envío Gratis hoy!" } },
  { id: 21, title: "Bati Mezcladora 2 en 1 🥣", desc: "Crea repostería de campeonato sin estrés. Potente, recargable y multifuncional. ¡Tus postres y panes quedarán impecables siempre!", img: "https://ugc.production.linktr.ee/762044e6-5b4d-4973-9906-809388f859de_image.png", stock: 11, tag: "Recomendado", price: "$89.900", fakeOldPrice: "$150.000", category: ["Hogar"], aida: { attention: "¿Cansada de las batidoras pesadas, ruidosas y con cables cortos?", interest: "Batidora Inalámbrica Premium con 2 brazos intercambiables. Ligera, mega potente y con carga USB de larga vida.", desire: "Haz merengues, masa o salsas sin anclarte a un tomacorriente. Pesa poquísimo, no mancha y se limpia súper fácil.", action: "Disfruta de esta oferta limitada. Paga seguro al recibirla." } },
  { id: 22, title: "Dispensador Antibacterial UV", desc: "El guardián leal de tu sonrisa esteriliza cepillos eliminando el 99% de bacterias mientras dispensa crema sin gota de desperdicio. ¡VIP!", img: "https://ugc.production.linktr.ee/b3577217-5ee3-4ca8-bd9e-6c5af34ffd3d_image.png", stock: 6, tag: "Bioseguridad", price: "$110.000", fakeOldPrice: "$180.000", category: ["Hogar"], aida: { attention: "¿Sabías que los cepillos acumulan millones de gérmenes del baño?", interest: "Protege tu salud bucal con una cúpula UV que esteriliza cada rincón de tus cepillos bloqueando bacterias peligrosas.", desire: "Exprime la crema automáticamente ahorrando dinero y evita los contagios intrafamiliares de gripa e infecciones.", action: "Tu familia merece lo mejor. ¡Cómpralo hoy con Envío Gratis Priority!" } },
  { id: 23, title: "LavaFácil Magic", desc: "El gadget indispensable del futuro ya llegó. Lava cristalería y tazas en dos segundos con cero esfuerzo. ¡La solución que necesitabas!", img: "https://ugc.production.linktr.ee/e34a8579-6f3b-4528-a87e-3d22e69bd57a_image.png", stock: 18, tag: "Práctico", price: "$85.000", fakeOldPrice: "$130.000", category: ["Hogar"], aida: { attention: "¿Te fastidia lavar termos o tazas profundas donde no llega la esponja?", interest: "Instala en tu lavaplato este limpiador a presión y remueve residuos de leche, café o vino al instante.", desire: "Ahorra litros de agua, cuida tu vajilla y libérate de fregar con las manos. Instalación rápida sin requerir plomero.", action: "¡Llévate a casa el invento del año con nuestro Descuento Especial!" } },
  { id: 24, title: "Flex Tape Ultra", desc: "El salvavidas definitivo en el hogar. Cinta ultra impermeable y robusta que sella cualquier fuga letal al instante. ¡Sello profesional!", img: "https://ugc.production.linktr.ee/39463ea5-cc12-4120-9049-3ea16d4b2a8a_image.png", stock: 30, tag: "Útil", price: "$79.900", fakeOldPrice: "$140.000", category: ["Hogar", "Tendencias"], aida: { attention: "¿Fugas de tuberías inesperadas causando daños costosos?", interest: "Esta súper cinta americana funciona incluso bajo el agua. Detén goteras de inmediato en tubos, plásticos o paredes.", desire: "Fuerte como el metal y flexible como la goma. Ahórrate los arreglos caros y soluciona cualquier accidente casero al instante tú misma.", action: "¡Aprovecha y lleva x2 Unidades y asegura la tranquilidad de tu hogar!" } }
];

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(3600 * 2 + 24 * 60 + 15);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 3600 * 2);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const h = Math.floor(timeLeft / 3600).toString().padStart(2, '0');
  const m = Math.floor((timeLeft % 3600) / 60).toString().padStart(2, '0');
  const s = (timeLeft % 60).toString().padStart(2, '0');

  return <span className="font-mono font-bold tracking-widest bg-black/20 px-2 py-0.5 rounded backdrop-blur-sm ml-1">{h}:{m}:{s}</span>
};

const VIPPersonalShopperBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user'|'model', text: string}[]>([
    { role: 'model', text: '¡Hola hermosa! ✨ Soy tu Personal Shopper VIP de Tati Moda Express. ¿Qué estilo buscas hoy? Tenemos moda, belleza y envíos Contra Entrega.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newMessages = [...messages, { role: 'user' as const, text: input }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    // Simulate high-conversion AI response
    setTimeout(() => {
      setMessages([...newMessages, { role: 'model', text: '¡Excelente elección! 🛍️ Para darte una asesoría ultra personalizada y confirmarte el inventario de bodega, dale tap al botón de abajo y hablemos por WhatsApp. ¡Te daré prioridad VIP! 💖' }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-tr from-amber-500 to-yellow-400 rounded-full shadow-lg shadow-amber-500/30 flex items-center justify-center text-gray-900 transition-all z-40 hover:scale-110 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100 badge-pulse'}`}
      >
        <MessageCircle size={28} />
        <span className="absolute -top-1 -left-1 w-4 h-4 bg-red-500 border-2 border-white dark:border-black rounded-full block"></span>
      </button>

      {/* Chat Interface Drawer */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[90vw] max-w-[360px] h-[500px] max-h-[80vh] bg-white dark:bg-[#0a0a0a] rounded-3xl shadow-2xl flex flex-col overflow-hidden z-50 border border-gray-200 dark:border-gray-800 transition-colors animate-modal-enter">
          <div className="bg-gradient-to-r from-gray-900 to-black dark:from-amber-500 dark:to-yellow-400 p-4 flex items-center justify-between text-amber-200 dark:text-gray-900 shadow-sm z-10">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 bg-white/20 dark:bg-black/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 font-serif font-bold text-lg italic">T</div>
              <div>
                <h4 className="font-bold text-sm tracking-tight leading-tight">Asesora VIP Tati Moda</h4>
                <p className="text-[10px] font-medium opacity-80 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse block"></span> En línea ahora</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 dark:hover:bg-black/10 rounded-full transition-colors"><X size={18} /></button>
          </div>
          
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-[#121214] custom-scroll">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm font-medium ${msg.role === 'user' ? 'bg-amber-100 dark:bg-amber-500 text-gray-900 rounded-br-sm' : 'bg-white dark:bg-[#1f1f22] border border-gray-100 dark:border-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-sm shadow-sm'}`}>
                  <Markdown>{msg.text}</Markdown>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                 <div className="bg-white dark:bg-[#1f1f22] border border-gray-100 dark:border-gray-800 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1 shadow-sm">
                   <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                   <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                   <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                 </div>
              </div>
            )}
            {messages.length > 1 && !isTyping && (
              <a href="https://api.whatsapp.com/send?phone=573204918142&text=Hola Asesora VIP! Quiero confirmar un pedido." target="_blank" rel="noreferrer" className="block w-full text-center bg-[#25D366] text-white font-bold py-3 rounded-xl shadow-lg hover:scale-[1.02] transition-transform animate-modal-enter text-sm flex items-center justify-center gap-2">
                 📲 Asesoría Rápida por WhatsApp
              </a>
            )}
          </div>

          <form onSubmit={sendMessage} className="p-3 bg-white dark:bg-[#0a0a0a] border-t border-gray-100 dark:border-gray-800 flex gap-2">
             <input type="text" value={input} onChange={e=>setInput(e.target.value)} placeholder="Escribe aquí..." className="flex-1 bg-gray-50 dark:bg-[#121214] border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-2 text-sm outline-none focus:border-amber-400 transition-colors dark:text-white" />
             <button type="submit" disabled={!input.trim()} className="bg-gray-900 dark:bg-amber-500 text-white dark:text-gray-900 p-2.5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors"><Send size={18} /></button>
          </form>
        </div>
      )}
    </>
  );
};

const ProductCardComponent = ({ item, selectProduct }: { item: any, selectProduct: (item: any) => void }) => {
  const [views, setViews] = useState(Math.floor(Math.random() * 40) + 15);

  useEffect(() => {
    const interval = setInterval(() => {
      setViews(prev => {
        const change = Math.floor(Math.random() * 5) - 2;
        return Math.max(8, prev + change);
      });
    }, Math.random() * 4000 + 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div onClick={() => selectProduct(item)} className="glass-panel p-3 rounded-[2rem] cursor-pointer hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] transition-all duration-300 group flex flex-col bg-white/70 dark:bg-[#0a0a0a]/80 border border-white/40 dark:border-white/5">
      <div className="relative overflow-hidden rounded-[1.5rem] aspect-square w-full mb-4 bg-gray-100/50 dark:bg-gray-800">
        <div className="absolute top-4 left-4 z-10 bg-white/90 dark:bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm border border-black/5 dark:border-white/10">
          <span className="text-[10px] font-bold text-gray-800 dark:text-gray-100 uppercase tracking-widest">{item.tag}</span>
        </div>
        <div className="absolute top-4 right-4 z-10 bg-black/60 dark:bg-amber-500/80 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm border border-white/10 text-white flex items-center gap-1.5 animate-pulse">
           <Eye size={12} /> <span className="text-[10px] font-bold">{views} viendo</span>
        </div>
        <img src={item.img} alt={item.title} className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform duration-700" loading="lazy" />
        
        {item.stock < 10 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-red-600/90 dark:bg-red-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-widest whitespace-nowrap shadow-xl border border-red-500/50 dark:border-red-400/30 flex items-center gap-1">
            🔥 Quedan solo {item.stock}
          </div>
        )}
      </div>
      
      <div className="px-3 pb-3 flex flex-col flex-1">
        <div className="flex justify-between items-start gap-4 mb-2">
          <h3 className="text-[17px] font-bold leading-snug tracking-tight text-gray-900 dark:text-white">{item.title}</h3>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4 flex-1 line-clamp-2">{item.desc}</p>
        
        <div className="flex items-center justify-between mt-auto">
          <p className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700 dark:from-amber-200 dark:to-amber-500 text-xl">{item.price}</p>
          <button className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 text-brand-dark dark:text-amber-400 flex items-center justify-center group-hover:bg-gray-900 dark:group-hover:bg-amber-400 dark:group-hover:text-gray-900 group-hover:text-amber-300 transition-colors duration-300">
             <ShoppingBag size={18} className="group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300"/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("Todo");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [compareProduct, setCompareProduct] = useState<any>(null);
  const [isComparing, setIsComparing] = useState(false);
  const [itemQuantity, setItemQuantity] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    // Simulate initial network fetch delay for skeletons
    const timer = setTimeout(() => setInitialLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const [checkoutStep, setCheckoutStep] = useState<'aida' | 'form' | 'success' | null>(null);
  const [formState, setFormState] = useState({ nombre: '', telefono: '', ciudad: '', direccion: '', metodoPago: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showExportGuide, setShowExportGuide] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const filteredProducts = ALL_PRODUCTS.filter(p => {
    const matchesCategory = selectedCategory === "Todo" || p.category.includes(selectedCategory);
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const calculateDynamicPrice = () => {
    if (!selectedProduct) return { total: 0, savings: 0, label: '' };
    const basePrice = parseInt(selectedProduct.price.replace(/\D/g, ''));
    if (itemQuantity === 1) return { total: basePrice, savings: 0, label: 'Precio Normal' };
    if (itemQuantity === 2) {
      const discountPrice = Math.floor(basePrice * 1.75); // 12.5% off total
      const savings = (basePrice * 2) - discountPrice;
      return { total: discountPrice, savings, label: '¡Gran Descuento!' };
    }
    const bulkPrice = Math.floor(basePrice * (itemQuantity * 0.75)); // 25% off 3+
    const bulkSavings = (basePrice * itemQuantity) - bulkPrice;
    return { total: bulkPrice, savings: bulkSavings, label: 'Mayorista + Envío Gratis' };
  };

  // Download hidden handler
  const handleHiddenDownload = () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Tati Moda Express - Export</title>
</head>
<body>
    <h1>Exportación Vía TATI MODA</h1>
    <p>Has exportado correctamente la base. Para que el proyecto React de Vite funcione en GitHub/Netlify sin errores, te recomendamos usar el botón azul "Settings ⚙️ -> Export to GitHub" dentro de AI Studio.</p>
    <script>
       alert("Sube tu repositorio vía AI Studio para evitar problemas de Vite y Netlify.");
    </script>
</body>
</html>`;
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const selectProduct = (product: any) => {
    if (isComparing) {
      setCompareProduct(product);
      setCheckoutStep('aida');
      return;
    }
    setSelectedProduct(product);
    setItemQuantity(1);
    setCheckoutStep('aida');
  };

  const closeCheckout = () => {
    setSelectedProduct(null);
    setCompareProduct(null);
    setIsComparing(false);
    setCheckoutStep(null);
  };

  const toggleCompareMode = () => {
    if (isComparing) {
      setIsComparing(false);
      setCompareProduct(null);
    } else {
      setIsComparing(true);
      setCheckoutStep(null);
    }
  };

  const selectPaymentAndProceed = (metodo: 'contraentrega' | 'online') => {
    setFormState({ ...formState, metodoPago: metodo });
    setCheckoutStep('form');
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.metodoPago) {
      alert("Por favor, selecciona un método de pago antes de continuar.");
      return;
    }
    setIsSubmitting(true);
    try {
      const isComparingBuy = compareProduct !== null;
      const productTitle = isComparingBuy 
        ? `${itemQuantity}x ${selectedProduct.title} + ${compareProduct.title}`
        : `${itemQuantity}x ${selectedProduct.title}`;
      
      const pricingConfig = calculateDynamicPrice();
      const ofertaValue = `$${pricingConfig.total.toLocaleString('es-CO')}`;
        
      const searchParams = new URLSearchParams();
      searchParams.append('nombre', formState.nombre);
      searchParams.append('whatsapp', formState.telefono);
      searchParams.append('ciudad', formState.ciudad);
      searchParams.append('direccion', formState.direccion);
      searchParams.append('producto', productTitle);
      searchParams.append('oferta', ofertaValue);
      searchParams.append('metodoPago', formState.metodoPago);

      // Using a plain GET request with no-cors creates URL params that Google Apps Script doPost/doGet will receive identically.
      // This mathematically eliminates preflight POST errors. The URL naturally encodes the payload.
      
      const targetUrl = `https://script.google.com/macros/s/AKfycbwHkH4yBX7qFUGGiPUF45qFIUwPKGlzj8Oe2NzsWfNyAmJ25JGTUr4VzbQMboLKdA0H/exec?${searchParams.toString()}`;

      await fetch(targetUrl, {
        method: 'GET',
        mode: 'no-cors'
      });
      
      setFormState({ nombre: '', telefono: '', ciudad: '', direccion: '', metodoPago: '' });
      setCheckoutStep('success');
    } catch (e) {
      alert("Hubo un problema de conexión. Por favor contacta directo a nuestro WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f8] dark:bg-[#050505] relative selection:bg-amber-200 selection:text-gray-900 font-sans text-brand-dark dark:text-gray-100 transition-colors duration-500">
      
      {/* Top Banner Liquidation */}
      <div className="fixed top-0 w-full bg-gradient-to-r from-gray-900 via-black to-gray-900 dark:from-black dark:via-gray-900 dark:to-black text-amber-300 border-b border-amber-500/20 py-1.5 sm:py-2 text-center text-[10px] sm:text-xs font-bold uppercase tracking-wide flex items-center justify-center gap-2 z-50 shadow-md">
         <Timer size={14} className="animate-pulse text-amber-500" /> MEGA LIQUIDACIÓN DE BODEGA TERMINA EN: <CountdownTimer />
      </div>

      {/* Decorative Web Glass Orbs Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none mt-8">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-pink-200/40 dark:bg-pink-900/10 blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-amber-200/30 dark:bg-amber-900/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[50%] rounded-full bg-rose-200/30 dark:bg-rose-900/10 blur-[120px]" />
      </div>

      {/* Global Navigation */}
      <nav className="fixed top-[32px] sm:top-[36px] w-full z-40 bg-white/70 dark:bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-white/5 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setShowExportGuide(true)}>
            {/* Tati Moda - Luxury Bag Logo CSS */}
            <div className="relative w-10 h-10 group-hover:scale-105 transition-transform flex items-end justify-center pt-2">
               {/* Golden Handle */}
               <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-4 h-3.5 border-2 border-amber-300 dark:border-amber-400 rounded-t-full border-b-0 shadow-inner z-0"></div>
               {/* Pink Bag Body */}
               <div className="relative z-10 w-full h-[28px] bg-gradient-to-b from-pink-200 to-pink-300 dark:from-pink-400 dark:to-pink-600 rounded-lg shadow-sm border border-pink-100 dark:border-pink-500 overflow-hidden flex items-center justify-center">
                 {/* Mini Sparkles */}
                 <div className="absolute top-0.5 left-1 text-white/70 text-[6px] animate-pulse">✨</div>
                 <div className="absolute bottom-0 right-1 text-amber-200/80 text-[7px] animate-pulse">✨</div>
                 {/* The Golden T */}
                 <span className="font-serif italic font-black text-xl text-transparent bg-clip-text bg-gradient-to-br from-amber-500 to-yellow-600 dark:from-amber-200 dark:to-amber-500 drop-shadow-sm leading-none mt-0.5">T</span>
               </div>
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:block bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-amber-200 dark:to-amber-500 group-hover:opacity-80">Tati Moda Express</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#catalogo" className="text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors hidden sm:block">Ver Catálogo Completo</a>
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-amber-50 dark:hover:bg-gray-800 transition-colors">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <a href="#catalogo" className="bg-gradient-to-r from-gray-900 to-black dark:from-amber-500 dark:to-yellow-300 text-white dark:text-gray-900 px-5 py-2.5 rounded-full text-sm font-bold hover:scale-105 transition-transform flex items-center gap-2 shadow-lg shadow-black/10 dark:shadow-amber-500/20 border border-gray-800 dark:border-amber-400">
              <ShoppingBag size={16}/> Comprar
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="relative z-10 pt-32 pb-12 w-full">
        
        {/* Full Web Responsive Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-20 flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/50 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-widest mb-6 transition-colors">
               <span className="relative flex h-2 w-2">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
               </span>
               Tu moda favorita a un clic
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif tracking-tight text-brand-dark dark:text-white leading-[1.05] mb-6 transition-colors italic">
              El catálogo más viral. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-amber-500 dark:from-amber-200 dark:to-amber-500 not-italic font-sans font-bold">
                Paga en tu casa.
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 font-medium leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0 transition-colors">
              Desde Zapatillas, Belleza Premium, hasta increíbles Gadgets de Hogar y Abrigos Racing.
              <strong className="text-brand-dark dark:text-amber-100 block mt-2 transition-colors">Envío GRATIS en Colombia con opción de Pago Contra Entrega.</strong>
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a href="#catalogo" className="w-full sm:w-auto bg-brand-dark dark:bg-amber-400 text-white dark:text-gray-900 px-8 py-4 rounded-full text-base font-semibold hover:bg-black dark:hover:bg-amber-300 transition-colors flex items-center justify-center gap-2 shadow-xl shadow-black/10 dark:shadow-amber-500/10">
                Ver Todo El Catálogo <ArrowRight size={18}/>
              </a>
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest transition-colors">
                 <CheckCircle2 size={18} className="text-green-500 dark:text-green-400"/> Sin Adelantos
              </div>
            </div>
          </div>
          
          <div className="flex-1 w-full relative">
             <div className="aspect-[4/3] w-full rounded-[2rem] sm:rounded-[3rem] overflow-hidden bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/40 dark:border-gray-700 p-2 sm:p-3 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] relative group transition-colors">
               <img src="https://ugc.production.linktr.ee/96ed0ced-5b0f-4c23-a8b6-5ea79b1d20aa_diferentes-planos-en-3d-con-acercamientos-y-alejam.gif?io=true&size=avatar-v3_0" alt="Fashion Luxury" className="w-full h-full object-cover rounded-[1.5rem] sm:rounded-[2.5rem] group-hover:scale-105 transition-transform duration-700 bg-gray-100" />
               <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-sm font-bold text-brand-dark">
                  <Sparkles size={16} fill="#f59e0b" className="text-amber-500"/> Selección Curada
               </div>
             </div>
          </div>
        </section>


        {/* Testimonials */}
        <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-8">
             <h2 className="text-3xl font-serif italic text-brand-dark dark:text-white mb-2">Lo que dicen nuestras clientas</h2>
             <div className="flex items-center justify-center gap-1 text-amber-500">
                {[...Array(5)].map((_,i) => <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
                <span className="text-sm font-bold text-gray-900 dark:text-amber-100 ml-2">4.9/5 (1.2k reseñas)</span>
             </div>
           </div>
           
           <div className="flex overflow-x-auto gap-5 pb-6 hide-scrollbar snap-x">
             {[
               { name: "Carolina M.", loc: "Bogotá", text: "Me encantó la calidad de los perfumes. Llegaron súper rápido y pagué al recibir. La presentación es de lujo, full recomendada.", date: "Hace 2 días" },
               { name: "Andrea V.", loc: "Medellín", text: "Tenía dudas por comprar online, pero el pago contra entrega me dio confianza. Los tenis son idénticos a los de la foto. ¡Vuelvo a comprar fijo!", date: "Hace 1 semana" },
               { name: "Sofia T.", loc: "Cali", text: "Todo llegó empacado hermoso. Era un regalo y quedé súper bien. Excelente servicio de WhatsApp también, resolvieron mis dudas.", date: "Hace 3 días" },
               { name: "Valentina G.", loc: "Barranquilla", text: "La mejor tienda para encontrar cosas top. Compré las joyas y no se ponen negras, excelente calidad premium.", date: "Hace 1 mes" }
             ].map((review, i) => (
                <div key={i} className="min-w-[280px] sm:min-w-[320px] snap-start glass-panel bg-white/70 dark:bg-[#0a0a0a]/80 p-6 rounded-[2rem] border border-gray-200/50 dark:border-white/5 flex flex-col shadow-sm">
                   <div className="flex text-amber-500 mb-3 gap-0.5">
                     {[...Array(5)].map((_,j) => <svg key={j} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
                   </div>
                   <p className="text-gray-600 dark:text-gray-300 font-medium text-sm leading-relaxed mb-6 flex-1">"{review.text}"</p>
                   <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-4">
                     <div>
                       <p className="font-bold text-brand-dark dark:text-white text-sm">{review.name}</p>
                       <p className="text-xs text-gray-500 dark:text-gray-400">{review.loc}</p>
                     </div>
                     <div className="flex items-center gap-1 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded text-[10px] text-green-600 dark:text-green-400 font-bold uppercase">
                       <CheckCircle2 size={10} /> Comprador
                     </div>
                   </div>
                </div>
             ))}
           </div>
        </section>

        {/* Trust Badges */}
        <section className="border-y border-amber-200/40 dark:border-amber-900/40 bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm py-10 my-12 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-12">
            <div className="flex flex-col items-center gap-3 text-center">
               <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 dark:from-gray-800 dark:to-gray-700 text-amber-600 dark:text-amber-400 flex items-center justify-center transition-colors shadow-sm border border-amber-200/50 dark:border-gray-600"><Lock size={28}/></div>
               <div>
                 <h4 className="font-bold text-gray-900 dark:text-white mb-1">Pago 100% Seguro</h4>
                 <p className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 font-medium leading-tight">Transacciones cifradas SSL punto a punto</p>
               </div>
            </div>
            <div className="flex flex-col items-center gap-3 text-center">
               <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-gray-800 dark:to-gray-700 text-emerald-600 dark:text-emerald-400 flex items-center justify-center transition-colors shadow-sm border border-emerald-200/50 dark:border-gray-600"><Truck size={28}/></div>
               <div>
                 <h4 className="font-bold text-gray-900 dark:text-white mb-1">Envío Gratis</h4>
                 <p className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 font-medium leading-tight">A principales ciudades de Colombia</p>
               </div>
            </div>
            <div className="flex flex-col items-center gap-3 text-center">
               <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700 text-blue-600 dark:text-blue-400 flex items-center justify-center transition-colors shadow-sm border border-blue-200/50 dark:border-gray-600"><CheckCircle2 size={28}/></div>
               <div>
                 <h4 className="font-bold text-gray-900 dark:text-white mb-1">Pago Contra Entrega</h4>
                 <p className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 font-medium leading-tight">Revisa y paga tranquilamente en casa</p>
               </div>
            </div>
            <div className="flex flex-col items-center gap-3 text-center">
               <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-800 dark:to-gray-700 text-purple-600 dark:text-purple-400 flex items-center justify-center transition-colors shadow-sm border border-purple-200/50 dark:border-gray-600"><ShieldCheck size={28}/></div>
               <div>
                 <h4 className="font-bold text-gray-900 dark:text-white mb-1">Calidad Premium</h4>
                 <p className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 font-medium leading-tight">Garantía total sin riesgos en tus compras</p>
               </div>
            </div>
          </div>
        </section>

          {/* Product Grid */}
          <section id="catalogo" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 border-t border-gray-200/50 dark:border-gray-800/50 transition-colors">
            <div className="text-center md:text-left mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h2 className="text-3xl sm:text-4xl font-serif italic tracking-tight mb-3 dark:text-white text-brand-dark">Encuentra Tu Estilo</h2>
                <p className="text-gray-500 dark:text-gray-400 font-medium text-base sm:text-lg max-w-2xl font-sans">Dale tap a cualquier producto para tramitar tu pedido rápido.</p>
              </div>
              
              <div className="flex-1 max-w-md mx-auto w-full relative mb-4 lg:mb-0 lg:ml-6 mt-4 lg:mt-0">
                 <div className="relative group">
                    <input 
                      type="text" 
                      placeholder="Busca tu estilo..." 
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        if(!isSearching) setIsSearching(true);
                        setTimeout(() => setIsSearching(false), 500);
                      }}
                      className="w-full bg-white/40 dark:bg-gray-800/40 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 rounded-full px-6 py-3 outline-none focus:ring-2 focus:ring-[#d8b4a0] transition-all text-[#4a4a4a] dark:text-gray-100 placeholder:text-gray-400 font-medium shadow-sm"
                    />
                 </div>
              </div>
              
              <div className="flex items-center gap-3">
               <button 
                 onClick={toggleCompareMode}
                 className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold border shadow-sm transition-all ${
                   isComparing 
                   ? 'bg-amber-100 border-amber-300 text-amber-700 dark:bg-amber-900/50 dark:border-amber-700/50 dark:text-amber-400 scale-[1.02] shadow-amber-500/20' 
                   : 'bg-white dark:bg-[#1a1a1c] border-gray-200 dark:border-gray-800 text-brand-dark dark:text-white hover:border-amber-300'
                 }`}
               >
                 <Scale size={16}/> {isComparing ? 'Cancelar Comparación' : 'Comparar Artículos'}
               </button>

               <div className="inline-flex items-center gap-2 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 px-4 py-2 mt-1 md:mt-0 rounded-full text-sm font-bold border border-red-100 dark:border-red-900/50 shadow-sm badge-pulse uppercase tracking-widest transition-colors hidden sm:inline-flex">
                  <Clock size={16}/> Promos Exclusivas
               </div>
            </div>
          </div>

          {/* Categories Tab Bar */}
          <div className="flex overflow-x-auto gap-3 pb-6 mb-4 hide-scrollbar snap-x">
            {CATEGORIES.map((cat, idx) => (
              <button 
                key={idx}
                onClick={() => setSelectedCategory(cat)}
                className={`snap-start whitespace-nowrap px-6 py-3 rounded-full text-sm font-bold transition-all shadow-sm ${
                  selectedCategory === cat 
                  ? 'bg-gradient-to-r from-gray-900 to-black dark:from-amber-500 dark:to-yellow-400 text-amber-300 dark:text-gray-900 scale-[1.02] shadow-black/20 dark:shadow-amber-500/10 border border-amber-500/30 dark:border-transparent' 
                  : 'bg-white dark:bg-[#0a0a0a] text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8 min-h-[40vh]">
            {(isSearching || initialLoading) ? (
               [...Array(8)].map((_, idx) => (
                 <div key={idx} className="w-full rounded-[2.5rem] bg-gray-100 dark:bg-gray-800 animate-pulse h-96"></div>
               ))
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((item, i) => (
                <ProductCardComponent key={i} item={item} selectProduct={selectProduct} />
              ))
            ) : (
               <div className="col-span-full py-20 flex flex-col items-center">
                  <div className="w-20 h-20 bg-gray-50 dark:bg-[#111] rounded-full flex items-center justify-center text-gray-300 mb-4"><Search size={32}/></div>
                  <h3 className="text-xl font-bold text-brand-dark dark:text-white mb-2">Sin resultados</h3>
                  <p className="text-gray-500 font-medium">No encontramos "{searchQuery}" dentro de esta categoría.</p>
               </div>
            )}
          </div>
        </section>

      </main>

      {/* Clean Desktop/Mobile Footer */}
      <footer className="border-t border-gray-200/60 dark:border-gray-800/60 bg-white/60 dark:bg-[#050505]/60 backdrop-blur-md py-12 mt-12 w-full text-center transition-colors">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <div className="relative w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-2xl mb-6 shadow-sm border border-gray-100 dark:border-gray-800 bg-pink-50/80 overflow-hidden">
             <img src="/logo.png" alt="Tati Moda Express Logo" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display='none'; e.currentTarget.nextElementSibling!.classList.remove('hidden'); e.currentTarget.nextElementSibling!.classList.add('flex'); }} />
             <div className="hidden absolute inset-0 bg-gradient-to-br from-pink-100 to-amber-100 dark:from-gray-800 dark:to-gray-900 text-brand-dark dark:text-amber-200 items-center justify-center">T</div>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium max-w-sm mb-6">Operación Logística Premium.<br/>Llevando las mejores tendencias a la puerta de tu casa con total seguridad.</p>
          <div className="flex gap-6 justify-center mb-10">
            <a href="https://instagram.com/tatimodaexpress" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 font-semibold transition-colors">Instagram</a>
            <a href="https://tiktok.com/@tati.moda.express" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-brand-dark dark:hover:text-white font-semibold transition-colors">TikTok</a>
            <a href="https://www.facebook.com/profile.php?id=61585411426636" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-600 font-semibold transition-colors">Facebook</a>
          </div>
          <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest">
             © 2026 <span onClick={handleHiddenDownload} className="cursor-pointer hover:text-amber-500 dark:hover:text-amber-400 transition-colors">TATI</span> MODA EXPRESS COLOMBIA
          </p>
        </div>
      </footer>

      {/* CHECKOUT MODAL / DRAWER */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/60 backdrop-blur-md animate-modal-enter transition-colors">
          <div className="w-full max-w-xl bg-white dark:bg-[#0a0a0a] sm:rounded-[2.5rem] rounded-t-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[95vh] sm:max-h-[85vh] relative transition-colors border-0 dark:border dark:border-white/5">
            
            <div className="sm:hidden flex justify-center pt-4 pb-2 cursor-pointer w-full" onClick={closeCheckout}>
              <div className="w-16 h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
            </div>
            
            <button onClick={closeCheckout} className="absolute top-6 right-6 bg-gray-100 dark:bg-gray-800 p-2.5 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors hidden sm:block z-10 hover:rotate-90 duration-300">
              <X size={18} />
            </button>

            <div className="overflow-y-auto px-6 sm:px-10 pb-12 pt-2 sm:pt-10 w-full custom-scroll flex-1">
              
              {/* STEP 0: AIDA Product Info (High Conversion Modal) */}
              {checkoutStep === 'aida' && selectedProduct && (
                <div className="space-y-6">
                  <div className="relative">
                    <img src={selectedProduct.img} alt={selectedProduct.title} className="w-full h-80 sm:h-96 object-cover rounded-[2rem] shadow-md bg-gray-50 dark:bg-gray-800 mix-blend-multiply dark:mix-blend-normal"/>
                    <div className="absolute top-4 right-4 bg-red-600 dark:bg-red-500 text-white font-black text-sm uppercase tracking-widest px-4 py-2 rounded-full shadow-xl shadow-red-500/30 transform rotate-12 scale-110 badge-pulse">
                      ¡{selectedProduct.tag}!
                    </div>
                    {isComparing && !compareProduct ? (
                      <div className="absolute top-4 left-4 bg-brand-dark text-amber-400 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-2 animate-bounce">
                        <Scale size={14}/> Selecciona otro producto para comparar
                      </div>
                    ) : null}
                  </div>

                  {compareProduct ? (
                     <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-4 text-center">
                           <img src={selectedProduct.img} className="w-full h-32 object-cover rounded-2xl mb-3 shadow-sm bg-white dark:bg-gray-800 mix-blend-multiply dark:mix-blend-normal"/>
                           <h4 className="font-bold text-sm text-gray-900 dark:text-white leading-tight mb-2 h-10">{selectedProduct.title}</h4>
                           <p className="font-black text-brand-dark dark:text-amber-400">{selectedProduct.price}</p>
                           <p className="text-[10px] text-gray-500 line-through">{selectedProduct.fakeOldPrice}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-4 text-center relative overflow-hidden transition-all shadow-[0_0_15px_rgba(251,191,36,0.3)] dark:shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                           <div className="absolute top-0 right-0 bg-amber-500 text-white text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-bl-lg z-10">VS</div>
                           <img src={compareProduct.img} className="w-full h-32 object-cover rounded-2xl mb-3 shadow-sm bg-white dark:bg-gray-800 mix-blend-multiply dark:mix-blend-normal"/>
                           <h4 className="font-bold text-sm text-gray-900 dark:text-white leading-tight mb-2 h-10">{compareProduct.title}</h4>
                           <p className="font-black text-brand-dark dark:text-amber-400">{compareProduct.price}</p>
                           <p className="text-[10px] text-gray-500 line-through">{compareProduct.fakeOldPrice}</p>
                        </div>
                     </div>
                  ) : (
                  <div className="text-center space-y-1 mt-2">
                    <h3 className="font-extrabold text-3xl text-gray-900 dark:text-white leading-tight tracking-tight">{selectedProduct.title}</h3>
                    <div className="flex items-center justify-center gap-2 mt-2">
                       <span className="text-gray-400 line-through text-lg font-bold">{selectedProduct.fakeOldPrice}</span>
                       <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-dark to-gray-700 dark:from-amber-200 dark:to-amber-500 font-black text-4xl">{selectedProduct.price}</span>
                    </div>
                    <div className="w-full flex justify-center py-2">
                      <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full flex gap-1 items-center">
                        <Truck size={14}/> Envío Gratis a toda Colombia 🇨🇴
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center gap-4 py-4">
                      <p className="text-xs uppercase font-bold text-gray-500 tracking-widest">Cantidad:</p>
                      <div className="flex items-center border-2 border-gray-200 dark:border-gray-800 rounded-full bg-gray-50 dark:bg-gray-900/50 shadow-inner">
                         <button onClick={() => setItemQuantity(prev => Math.max(1, prev - 1))} className="p-2.5 text-gray-400 hover:text-brand-dark dark:hover:text-amber-400 transition-colors">
                           <Minus size={18}/>
                         </button>
                         <span className="w-8 text-center font-black text-lg text-gray-900 dark:text-white">{itemQuantity}</span>
                         <button onClick={() => setItemQuantity(prev => Math.min(10, prev + 1))} className="p-2.5 text-gray-400 hover:text-brand-dark dark:hover:text-amber-400 transition-colors">
                           <Plus size={18}/>
                         </button>
                      </div>
                    </div>
                  </div>
                  )}

                  {/* AIDA Text Render */}
                  <div className="bg-gray-50 dark:bg-[#151515] p-5 sm:p-6 rounded-3xl border border-gray-100 dark:border-gray-800 text-gray-800 dark:text-gray-200 font-medium leading-[1.6]">
                     <div className="space-y-4 text-sm sm:text-base">
                        <p>✨ {selectedProduct.aida?.attention || selectedProduct.desc}</p>
                        <p>💡 {selectedProduct.aida?.interest || "Un producto diseñado con la más alta calidad y estándares modernos."}</p>
                        <p>⭐ {selectedProduct.aida?.desire || "Alcanza la excelencia y roba las miradas de todos. Tú te mereces lo mejor de lo mejor."}</p>
                     </div>
                     <div className="pt-5">
                       <p className="text-center font-bold text-brand-dark dark:text-white bg-amber-200/50 dark:bg-amber-500/20 py-3 rounded-xl border border-amber-300 dark:border-amber-500/30 text-sm">🔥 {selectedProduct.aida?.action || "¡Aprovecha antes de que se agoten las unidades en bodega!"}</p>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                     <div className="bg-white dark:bg-[#0a0a0a] border border-green-100 dark:border-green-900/40 rounded-2xl p-3 flex items-center justify-center flex-col text-center shadow-sm">
                       <CheckCircle2 size={24} className="text-green-500 mb-1" />
                       <span className="text-[10px] font-bold text-green-700 dark:text-green-500 uppercase tracking-wide">Pagas al recibir</span>
                     </div>
                     <div className="bg-white dark:bg-[#0a0a0a] border border-blue-100 dark:border-blue-900/40 rounded-2xl p-3 flex items-center justify-center flex-col text-center shadow-sm">
                       <ShieldCheck size={24} className="text-blue-500 mb-1" />
                       <span className="text-[10px] font-bold text-blue-700 dark:text-blue-500 uppercase tracking-wide">Compra Segura</span>
                     </div>
                  </div>

                  <button onClick={() => setCheckoutStep('form')} className="w-full relative overflow-hidden bg-gradient-to-r from-gray-900 to-black dark:from-amber-500 dark:to-yellow-400 hover:scale-[1.02] text-white dark:text-gray-900 font-black text-xl py-6 rounded-[2rem] transition-transform shadow-2xl flex items-center justify-center gap-3 group">
                     {compareProduct ? '¡LLEVAR AMBOS EN OFERTA!' : '¡SI, LO QUIERO COMPRAR!'} <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                     <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
                  </button>
                  <div className="flex items-center justify-center gap-2 mt-3 text-gray-500 dark:text-gray-400">
                    <Lock size={12} /> <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest">Garantía de Satisfacción Total</span>
                  </div>
                  <p className="text-center text-xs font-semibold text-gray-400 uppercase tracking-widest mt-2">{selectedProduct.stock} Personas comprando en este momento</p>
                </div>
              )}

              {/* STEP 1: DEL DISCARD */}

              {checkoutStep === 'details' && (
                <div className="space-y-8">
                  <div className="flex gap-5 items-center">
                    <img src={selectedProduct.img} alt={selectedProduct.title} className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-[1.5rem] shadow-sm bg-gray-50 dark:bg-gray-800 mix-blend-multiply dark:mix-blend-normal"/>
                    <div>
                      <span className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Resumen del pedido</span>
                      <h3 className="font-bold text-xl sm:text-2xl leading-tight text-gray-900 dark:text-white mb-2">{compareProduct ? 'Oferta x2 Combos' : selectedProduct.title}</h3>
                      <p className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700 dark:from-amber-200 dark:to-amber-500 font-extrabold text-2xl">
                         {itemQuantity > 1 ? `${itemQuantity}x ` : ''} 
                         {compareProduct ? 'Precio Especial ✨' : selectedProduct.price}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                     <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Selecciona Modalidad de Pago</p>
                     
                     {/* Method 1: Contraentrega */}
                     <button onClick={() => selectPaymentAndProceed('contraentrega')} className="w-full bg-white dark:bg-[#1a1a1c] border-2 border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-lg text-gray-900 dark:text-white p-5 rounded-[2rem] flex items-center justify-between transition-all group duration-300">
                       <div className="text-left flex items-center gap-5">
                         <div className="w-14 h-14 bg-gray-50 dark:bg-gray-800/80 rounded-2xl shadow-sm flex items-center justify-center text-gray-700 dark:text-gray-300 group-hover:scale-110 transition-transform">
                           <Package size={26}/>
                         </div>
                         <div>
                           <p className="font-bold text-base sm:text-lg">Pago Contra Entrega</p>
                           <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">Recibe y paga en efectivo directo en tu casa.</p>
                         </div>
                       </div>
                       <ChevronRight size={24} className="text-gray-300 dark:text-gray-600 group-hover:text-brand-dark dark:group-hover:text-white transition-colors"/>
                     </button>

                     {/* Method 2: Online (Bancolombia/Bre-B) */}
                     <button onClick={() => selectPaymentAndProceed('online')} className="w-full bg-purple-50/50 dark:bg-purple-900/10 border-2 border-purple-100 dark:border-purple-800/50 hover:border-purple-300 dark:hover:border-purple-600 text-brand-dark dark:text-white p-5 rounded-[2rem] flex items-center justify-between transition-all relative group shadow-sm hover:shadow-lg duration-300 badge-pulse">
                       <div className="absolute -top-3 -right-2 bg-red-500 text-white text-[10px] sm:text-[11px] uppercase font-bold tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                         +20% Descuento 🎁
                       </div>
                       <div className="text-left flex items-center gap-5">
                         <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl shadow-md shadow-purple-500/30 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                           <CreditCard size={26}/>
                         </div>
                         <div className="flex-1 pr-4">
                           <p className="font-bold text-base sm:text-lg text-purple-900 dark:text-purple-300">Pago en Línea Anticipado</p>
                           <p className="text-xs text-purple-800/60 dark:text-purple-300/60 mt-1 font-medium">Transfiere vía QR (Bancolombia, Bre-B).</p>
                         </div>
                       </div>
                       <ChevronRight size={24} className="text-purple-300 dark:text-purple-600/50 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors"/>
                     </button>
                  </div>
                </div>
              )}


              {/* STEP 2: The Data Form - CLEAN LUXURY UNIFIED */}
              {checkoutStep === 'form' && (
                 <div className="bg-[#fcf9f6] dark:bg-[#0a0a0a] min-h-full sm:min-h-0 sm:py-6 relative z-10 w-full overflow-y-auto pb-10">
                   <div className="flex items-center gap-3 cursor-pointer text-gray-400 hover:text-[#d8b4a0] transition-colors mb-6 w-max group" onClick={()=>setCheckoutStep('aida')}>
                     <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-2 rounded-full group-hover:border-[#d8b4a0] transition-colors"><ChevronRight size={18} className="rotate-180"/></div>
                   </div>
                   
                   <div className="mb-6 border-b border-[#f0e6e0] dark:border-[#222] pb-6">
                      <div className="flex gap-4 items-center mb-6">
                         <div className="w-20 h-20 bg-white dark:bg-gray-900 rounded-[1.2rem] shadow-sm flex items-center justify-center overflow-hidden border border-[#f0e6e0] dark:border-gray-800">
                           <img src={selectedProduct.img} alt="Product" className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal"/>
                         </div>
                         <div className="flex-1">
                           <p className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-1">Tu selección</p>
                           <h4 className="font-bold text-[#4a4a4a] dark:text-white leading-tight">{selectedProduct.title}</h4>
                           
                           {/* Dynamic Price Display */}
                           <div className="mt-2 flex items-center justify-between">
                              <span className="font-bold text-lg text-brand-dark dark:text-amber-400">${calculateDynamicPrice().total.toLocaleString('es-CO')}</span>
                              {calculateDynamicPrice().savings > 0 && (
                                <span className="bg-[#d8b4a0]/20 text-[#c8a490] px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide">
                                  Ahorras: ${calculateDynamicPrice().savings.toLocaleString('es-CO')}
                                </span>
                              )}
                           </div>
                         </div>
                      </div>

                      <div className="flex items-center justify-between bg-white dark:bg-[#111] border border-[#f0e6e0] dark:border-gray-800 p-2 rounded-[1rem]">
                        <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500 ml-2">Cantidad</p>
                        <div className="flex items-center border border-[#e0e0e0] dark:border-[#333] rounded-[0.8rem] overflow-hidden">
                           <button onClick={(e) => { e.preventDefault(); setItemQuantity(prev=>Math.max(1,prev-1)) }} className="px-3 py-1.5 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"><Minus size={14}/></button>
                           <span className="w-8 text-center font-bold text-sm text-[#4a4a4a] dark:text-gray-100">{itemQuantity}</span>
                           <button onClick={(e) => { e.preventDefault(); setItemQuantity(prev=>Math.min(10,prev+1)) }} className="px-3 py-1.5 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"><Plus size={14}/></button>
                        </div>
                      </div>
                   </div>

                   <form onSubmit={handleFormSubmit} className="space-y-4">
                       <h3 className="font-bold text-[#d8b4a0] text-xs tracking-[2px] uppercase">Datos de Envío</h3>
                       <input required type="text" value={formState.nombre} onChange={e=>setFormState({...formState, nombre: e.target.value})} className="w-full bg-transparent border-0 border-b border-[#e0e0e0] dark:border-[#333] focus:border-[#d8b4a0] dark:focus:border-[#d8b4a0] focus:ring-0 px-0 py-3 text-base outline-none transition-colors text-[#4a4a4a] dark:text-[#eaeaea] placeholder:text-gray-400" placeholder="Nombre completo"/>
                       <input required type="tel" value={formState.telefono} onChange={e=>setFormState({...formState, telefono: e.target.value})} className="w-full bg-transparent border-0 border-b border-[#e0e0e0] dark:border-[#333] focus:border-[#d8b4a0] dark:focus:border-[#d8b4a0] focus:ring-0 px-0 py-3 text-base outline-none transition-colors text-[#4a4a4a] dark:text-[#eaeaea] placeholder:text-gray-400" placeholder="WhatsApp / Celular"/>
                       <input required type="text" value={formState.ciudad} onChange={e=>setFormState({...formState, ciudad: e.target.value})} className="w-full bg-transparent border-0 border-b border-[#e0e0e0] dark:border-[#333] focus:border-[#d8b4a0] dark:focus:border-[#d8b4a0] focus:ring-0 px-0 py-3 text-base outline-none transition-colors text-[#4a4a4a] dark:text-[#eaeaea] placeholder:text-gray-400" placeholder="Ciudad / Municipio"/>
                       <input required type="text" value={formState.direccion} onChange={e=>setFormState({...formState, direccion: e.target.value})} className="w-full bg-transparent border-0 border-b border-[#e0e0e0] dark:border-[#333] focus:border-[#d8b4a0] dark:focus:border-[#d8b4a0] focus:ring-0 px-0 py-3 text-base outline-none transition-colors text-[#4a4a4a] dark:text-[#eaeaea] placeholder:text-gray-400" placeholder="Dirección exacta de entrega"/>
                       
                       <div className="pt-6 pb-2">
                           <h3 className="font-bold text-[#d8b4a0] text-xs tracking-[2px] uppercase mb-4">Método de Pago</h3>
                           <div className="grid grid-cols-1 gap-3">
                              <label className={`cursor-pointer flex items-center border ${formState.metodoPago === 'Contra Entrega' ? 'border-[#d8b4a0] bg-[#d8b4a0]/5 dark:bg-[#d8b4a0]/10' : 'border-[#e0e0e0] dark:border-[#333]'} p-4 rounded-[1rem] transition-colors`}>
                                 <input type="radio" name="metodopago" value="Contra Entrega" onChange={(e) => setFormState({...formState, metodoPago: e.target.value})} className="hidden" />
                                 <div className={`w-4 h-4 rounded-full border ${formState.metodoPago === 'Contra Entrega' ? 'border-[4px] border-[#d8b4a0]' : 'border-gray-300 dark:border-gray-600'} mr-4 transition-all`}></div>
                                 <div className="flex-1">
                                    <h4 className="font-bold text-[#4a4a4a] dark:text-gray-200 text-sm">Pago Contra Entrega</h4>
                                    <p className="text-[10px] text-gray-500 mt-0.5">Recibe y paga en efectivo directo en tu casa.</p>
                                 </div>
                              </label>
                              <label className={`relative cursor-pointer flex items-center border ${formState.metodoPago === 'Pago en Línea' ? 'border-[#d8b4a0] bg-[#d8b4a0]/5 dark:bg-[#d8b4a0]/10' : 'border-[#e0e0e0] dark:border-[#333]'} p-4 rounded-[1rem] transition-colors`}>
                                 <input type="radio" name="metodopago" value="Pago en Línea" onChange={(e) => setFormState({...formState, metodoPago: e.target.value})} className="hidden" />
                                 <div className={`w-4 h-4 rounded-full border ${formState.metodoPago === 'Pago en Línea' ? 'border-[4px] border-[#d8b4a0]' : 'border-gray-300 dark:border-gray-600'} mr-4 transition-all`}></div>
                                 <div className="flex-1">
                                    <h4 className="font-bold text-[#4a4a4a] dark:text-gray-200 text-sm">Pago en Línea</h4>
                                    <p className="text-[10px] text-gray-500 mt-0.5">Transferencia vía Bancolombia, Bre-B, o Nequi.</p>
                                 </div>
                              </label>
                           </div>
                       </div>
                       
                       <button disabled={isSubmitting || !formState.metodoPago} type="submit" className="w-full bg-[#d8b4a0] hover:bg-[#c8a490] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed text-white uppercase tracking-[3px] font-bold text-sm sm:text-base py-5 mt-4 transition-colors flex items-center justify-center shadow-sm">
                       {isSubmitting ? "ENVIANDO..." : "CONFIRMAR PEDIDO"}
                     </button>
                   </form>
                 </div>
              )}

              {/* STEP 3: Success Interface Clean Luxury */}
              {checkoutStep === 'success' && (
                <div className="text-center sm:py-10 space-y-8 flex flex-col items-center bg-[#fcf9f6] dark:bg-[#0a0a0a] w-full min-h-64 justify-center">
                  
                  <div className="animate-modal-enter w-full flex flex-col items-center">
                      <div className="font-bold text-[#d8b4a0] text-center mb-6 max-w-sm mt-4">
                        ¡Gracias por elegirnos!<br/>
                        Tu pedido ha sido registrado con éxito.
                      </div>
                      
                      {/* Truck Gamification in Success merged into elegant style */}
                      <div className="bg-white dark:bg-gray-900 border border-[#f0e6e0] dark:border-gray-800 rounded-none p-6 relative overflow-hidden w-full text-left my-2 shadow-sm">
                          <h4 className="font-bold text-sm text-[#4a4a4a] dark:text-gray-200 mb-2 text-center uppercase tracking-widest">En proceso de envío</h4>
                          
                          <div className="relative h-12 w-full border-b border-dashed border-[#e0e0e0] dark:border-gray-700 my-4">
                             <div className="absolute bottom-[-10px] left-0 animate-drive">
                                <Truck size={24} className="text-[#d8b4a0]" />
                             </div>
                             <div className="absolute bottom-[-4px] right-0 w-2 h-2 rounded-full bg-[#d8b4a0] shadow-sm"></div>
                          </div>

                          <p className="text-xs text-gray-500 dark:text-gray-400 text-center font-medium mt-4">
                             Tiempo estimado de entrega:<br/>
                             <span className="text-[#4a4a4a] dark:text-white text-sm font-bold tracking-wide">2 a 3 días hábiles</span>
                          </p>
                      </div>

                      <a href={`https://api.whatsapp.com/send?phone=573204918142&text=Hola! Acabo de finalizar un pedido de ${formState.productoManual || selectedProduct.title}. Mi nombre es ${formState.nombre}.`} target="_blank" rel="noreferrer" className="w-full bg-black dark:bg-white text-white dark:text-black font-semibold text-xs tracking-[2px] uppercase py-4 mt-6 shadow-md transition-colors hover:bg-gray-800 dark:hover:bg-gray-200">
                         Confirmar por WhatsApp
                      </a>
                      <button onClick={closeCheckout} className="mt-6 text-[10px] font-bold text-gray-400 hover:text-[#d8b4a0] transition-colors uppercase tracking-[2px] py-2 border-b border-transparent hover:border-[#d8b4a0]">Volver a la tienda</button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* Floating Chatbot */}
      <VIPPersonalShopperBot />

      {/* Sticky Mobile Navigation */}
      <div className="fixed bottom-0 left-0 w-full z-40 bg-white/80 dark:bg-black/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 md:hidden flex items-center justify-around py-3 px-2 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] pb-safe transition-colors duration-300 transform translate-y-0">
         <button onClick={() => document.getElementById('catalogo')?.scrollIntoView({behavior: 'smooth'})} className="flex flex-col items-center gap-1 p-2 text-gray-500 hover:text-brand-dark dark:hover:text-amber-400 transition-colors">
            <LayoutGrid size={22} />
            <span className="text-[10px] font-bold uppercase tracking-wider">Explorar</span>
         </button>
         <button onClick={() => {
            const firstProduct = filteredProducts[0];
            if(firstProduct) selectProduct(firstProduct);
         }} className="relative -mt-6 bg-brand-dark dark:bg-amber-400 text-white dark:text-gray-900 w-16 h-16 rounded-full flex items-center justify-center shadow-xl shadow-brand-dark/30 dark:shadow-amber-500/20 border-4 border-white dark:border-[#0a0a0a] animate-bounce-slow">
            <ShoppingBag size={24} />
         </button>
         <button onClick={() => setShowExportGuide(true)} className="flex flex-col items-center gap-1 p-2 text-gray-500 hover:text-brand-dark dark:hover:text-amber-400 transition-colors">
            <Star size={22} />
            <span className="text-[10px] font-bold uppercase tracking-wider">Promos</span>
         </button>
      </div>

      {/* Export to GitLab / Netlify Guide Modal */}
      {showExportGuide && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-modal-enter">
          <div className="bg-white dark:bg-[#111] p-6 sm:p-8 rounded-3xl max-w-sm w-full shadow-2xl border-2 border-amber-400 dark:border-amber-500 relative">
            <button onClick={() => setShowExportGuide(false)} className="absolute top-4 right-4 p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <X size={20} className="text-gray-900 dark:text-white" />
            </button>
            <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center text-amber-500 mb-6 mx-auto">
              <Package size={32} />
            </div>
            <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">Exportar Código</h3>
            <p className="text-sm text-center text-gray-600 dark:text-gray-300 mb-6">
              Para extraer todo este desarrollo en <b>React, Vite y Tailwind v4</b> listo para desplegar al instante en <span className="font-bold text-orange-500">GitLab & Netlify</span>:
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                <span className="w-6 h-6 rounded-full bg-gray-900 dark:bg-amber-500 text-white dark:text-gray-900 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</span>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200">Ve a la esquina superior derecha y presiona el botón <b>Settings ⚙️</b></p>
              </li>
              <li className="flex items-start gap-3 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                <span className="w-6 h-6 rounded-full bg-gray-900 dark:bg-amber-500 text-white dark:text-gray-900 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</span>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200">Selecciona <b>Download as ZIP</b> o "Export to GitHub/GitLab".</p>
              </li>
            </ul>
            <button onClick={() => setShowExportGuide(false)} className="w-full bg-gradient-to-r from-gray-900 to-black dark:from-amber-500 dark:to-yellow-400 text-white dark:text-gray-900 font-bold py-4 rounded-xl shadow-lg hover:scale-[1.02] transition-transform">
              ¡Entendido!
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
