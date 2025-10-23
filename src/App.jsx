import React, { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

export default function App() {
  const [activeSection, setActiveSection] = useState('current')
  const [showGrowthDetails, setShowGrowthDetails] = useState(false)

  const growthScenarios = [
    { scenario: 'Hoy', profit: 2300, color: '#8B4513' },
    { scenario: '+1 día', profit: 7060, color: '#A0522D' },
    { scenario: '+Precios 15%', profit: 3380, color: '#CD853F' },
    { scenario: 'Ambos', profit: 8140, color: '#D2691E' }
  ]

  const productMix = [
    { name: 'Pozol', value: 3900, color: '#8B4513' },
    { name: 'Frasquitos', value: 2600, color: '#A0522D' },
    { name: 'Barras', value: 700, color: '#D2691E' }
  ]

  // URL del PDF (archivo agregado en el repo raíz). Usamos BASE_URL para que funcione en GitHub Pages.
  const pdfFileName = 'ANÁLISIS DEL NEGOCIO DE CACAO.pdf'
  const pdfUrl = `${import.meta.env.BASE_URL}${encodeURIComponent(pdfFileName)}`

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <div className="text-6xl mb-2">🍫</div>
          </div>
          <h1 className="text-5xl font-bold text-amber-950 mb-3">Tu Negocio de Cacao</h1>
          <p className="text-xl text-amber-800">Un vistazo a lo que has construido y todo lo que se puede lograr</p>
        </div>

        {/* Pestañas de navegación */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {['current', 'bottleneck', 'growth', 'risks'].map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                activeSection === section
                  ? 'bg-amber-900 text-amber-50 shadow-lg scale-105'
                  : 'bg-white text-amber-900 hover:bg-amber-100'
              }`}
            >
              {section === 'current' && '🌱 Estado actual'}
              {section === 'bottleneck' && '🔍 El hallazgo'}
              {section === 'growth' && '📈 Oportunidades'}
              {section === 'risks' && '⚠️ Consideraciones'}
            </button>
          ))}
        </div>

        {/* Secciones de contenido */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-4 border-amber-200">
          {/* Estado actual */}
          {activeSection === 'current' && (
            <div className="space-y-8 animate-fade-in">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-amber-950 mb-4">Tu operación hoy</h2>
                <p className="text-lg text-amber-800">Vendes 1 día a la semana (domingos)</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 my-8">
                <div className="bg-gradient-to-br from-amber-100 to-orange-100 p-6 rounded-2xl border-2 border-amber-300">
                  <h3 className="text-2xl font-bold text-amber-950 mb-4">💰 Números semanales</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-amber-800">Ingresos brutos</span>
                      <span className="text-2xl font-bold text-amber-950">$7,200</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-amber-800">Gastos operativos</span>
                      <span className="text-xl font-semibold text-amber-900">-$1,300</span>
                    </div>
                    <div className="border-t-2 border-amber-300 pt-2 flex justify-between items-center">
                      <span className="font-bold text-amber-900">Utilidad neta</span>
                      <span className="text-3xl font-bold text-green-700">$2,300</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-100 to-amber-100 p-6 rounded-2xl border-2 border-amber-300">
                  <h3 className="text-2xl font-bold text-amber-950 mb-4">📅 Proyección anual</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-amber-800">Semanas operativas</span>
                      <span className="text-xl font-semibold text-amber-950">52</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-amber-800">Días de venta/semana</span>
                      <span className="text-xl font-semibold text-amber-950">1</span>
                    </div>
                    <div className="border-t-2 border-amber-300 pt-2 flex justify-between items-center">
                      <span className="font-bold text-amber-900">Utilidad anual</span>
                      <span className="text-3xl font-bold text-green-700">$119,600</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 p-6 rounded-2xl border-2 border-amber-200">
                <h3 className="text-xl font-bold text-amber-950 mb-4">Tu mezcla de productos</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={productMix}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({name, value}) => `${name}: $${value}`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {productMix.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <p className="text-center text-amber-700 mt-4">
                  <span className="font-semibold">Margen del 50%</span> — muy saludable para productos artesanales
                </p>
              </div>
            </div>
          )}

          {/* Hallazgo (cuello de botella) */}
          {activeSection === 'bottleneck' && (
            <div className="space-y-8 animate-fade-in">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-amber-950 mb-4">🔍 El hallazgo clave</h2>
                <p className="text-lg text-amber-800">Tu cuello de botella no está donde creías</p>
              </div>

              <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-8 rounded-2xl border-2 border-amber-300 my-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-3xl font-bold text-amber-950 mb-4">✅ Lo que NO es problema</h3>
                    <ul className="space-y-3 text-lg text-amber-800">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">✓</span>
                        <span>Producción: puedes hacer todo el cacao que necesitas</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">✓</span>
                        <span>Calidad: tus márgenes del 50% lo confirman</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">✓</span>
                        <span>Eficiencia: gastos bien controlados</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-red-50 p-6 rounded-xl border-2 border-red-200">
                    <h3 className="text-3xl font-bold text-red-900 mb-4">❌ El verdadero cuello de botella</h3>
                    <p className="text-2xl font-bold text-red-700 mb-3">DISTRIBUCIÓN</p>
                    <p className="text-lg text-red-800">
                      Produces 7 días pero solo vendes 1. Es como tener el taller abierto toda la semana, pero la tienda solo abre el domingo.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-900 text-amber-50 p-8 rounded-2xl text-center">
                <p className="text-2xl font-bold mb-2">La buena noticia</p>
                <p className="text-xl">Ya tienes la capacidad. Solo falta abrir más días.</p>
              </div>
            </div>
          )}

          {/* Oportunidades de crecimiento */}
          {activeSection === 'growth' && (
            <div className="space-y-8 animate-fade-in">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-amber-950 mb-4">📈 Oportunidades de crecimiento</h2>
                <p className="text-lg text-amber-800">Crecimiento sostenible sin perder tu esencia</p>
              </div>

              <div className="bg-amber-50 p-6 rounded-2xl border-2 border-amber-200">
                <h3 className="text-2xl font-bold text-amber-950 mb-6 text-center">Comparación de escenarios (utilidad semanal)</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={growthScenarios}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#D2691E" />
                    <XAxis dataKey="scenario" stroke="#8B4513" />
                    <YAxis stroke="#8B4513" />
                    <Tooltip contentStyle={{ backgroundColor: '#FFF8DC', border: '2px solid #D2691E' }} formatter={(value) => `$${value}`} />
                    <Bar dataKey="profit" radius={[10, 10, 0, 0]}>
                      {growthScenarios.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border-2 border-green-300">
                  <div className="text-3xl mb-3">📅</div>
                  <h3 className="text-xl font-bold text-green-900 mb-3">Agregar 1 día (sábado)</h3>
                  <p className="text-green-800 mb-4">Sin cambiar nada más en tu operación</p>
                  <div className="text-3xl font-bold text-green-700">+$4,760/semana</div>
                  <p className="text-sm text-green-700 mt-2">≈ +$247,000 al año</p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border-2 border-blue-300">
                  <div className="text-3xl mb-3">💵</div>
                  <h3 className="text-xl font-bold text-blue-900 mb-3">Subir precios 15%</h3>
                  <p className="text-blue-800 mb-4">Tus productos lo valen</p>
                  <div className="text-3xl font-bold text-blue-700">+$1,080/semana</div>
                  <p className="text-sm text-blue-700 mt-2">≈ +$56,000 al año</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-300">
                  <div className="text-3xl mb-3">🚚</div>
                  <h3 className="text-xl font-bold text-purple-900 mb-3">Servicio de entregas</h3>
                  <p className="text-purple-800 mb-4">Ya lo haces de vez en cuando</p>
                  <div className="text-3xl font-bold text-purple-700">+$2,000/semana</div>
                  <p className="text-sm text-purple-700 mt-2">Potencial conservador</p>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-6 rounded-2xl border-2 border-amber-300">
                  <div className="text-3xl mb-3">✨</div>
                  <h3 className="text-xl font-bold text-amber-900 mb-3">Productos premium</h3>
                  <p className="text-amber-800 mb-4">Ediciones especiales y ceremoniales</p>
                  <div className="text-3xl font-bold text-amber-700">+$2,000/semana</div>
                  <p className="text-sm text-amber-700 mt-2">Diferenciación de marca</p>
                </div>
              </div>

              <button
                onClick={() => setShowGrowthDetails(!showGrowthDetails)}
                className="w-full bg-amber-900 text-amber-50 py-4 rounded-xl font-bold text-lg hover:bg-amber-800 transition-all"
              >
                {showGrowthDetails ? '▼ Ocultar' : '▶ Ver'} Proyección a 24 meses
              </button>

              {showGrowthDetails && (
                <div className="bg-gradient-to-br from-amber-900 to-orange-900 text-amber-50 p-8 rounded-2xl animate-fade-in">
                  <h3 className="text-3xl font-bold mb-6 text-center">Crecimiento sostenible a 2 años</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <p className="text-amber-300 mb-2">Hoy</p>
                      <p className="text-4xl font-bold">$119k</p>
                      <p className="text-sm text-amber-300">utilidad anual</p>
                    </div>
                    <div className="text-center">
                      <p className="text-amber-300 mb-2">6 meses</p>
                      <p className="text-4xl font-bold">$338k</p>
                      <p className="text-sm text-amber-300">utilidad anual</p>
                    </div>
                    <div className="text-center">
                      <p className="text-amber-300 mb-2">24 meses</p>
                      <p className="text-4xl font-bold">$620k+</p>
                      <p className="text-sm text-amber-300">utilidad anual</p>
                    </div>
                  </div>
                  <p className="text-center text-amber-200 mt-6 text-lg">
                    Sin sacrificar calidad ni autenticidad
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Riesgos y consideraciones */}
          {activeSection === 'risks' && (
            <div className="space-y-8 animate-fade-in">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-amber-950 mb-4">⚠️ Consideraciones importantes</h2>
                <p className="text-lg text-amber-800">Para crecer de forma sostenible y consciente</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-orange-50 p-6 rounded-2xl border-2 border-orange-300">
                  <div className="text-3xl mb-3">👤</div>
                  <h3 className="text-xl font-bold text-orange-900 mb-3">Punto único de falla</h3>
                  <p className="text-orange-800">
                    El negocio depende de ti. Considera entrenar a tu asistente para que pueda operar de forma independiente.
                  </p>
                </div>

                <div className="bg-red-50 p-6 rounded-2xl border-2 border-red-300">
                  <div className="text-3xl mb-3">⚖️</div>
                  <h3 className="text-xl font-bold text-red-900 mb-3">Trámites y regulación</h3>
                  <p className="text-red-800">
                    Al crecer, asegúrate de tener en regla los permisos y la regulación para operar con tranquilidad.
                  </p>
                </div>

                <div className="bg-yellow-50 p-6 rounded-2xl border-2 border-yellow-300">
                  <div className="text-3xl mb-3">🏪</div>
                  <h3 className="text-xl font-bold text-yellow-900 mb-3">Bajas barreras de entrada</h3>
                  <p className="text-yellow-800">
                    Otros pueden replicar tu modelo. Tu verdadera protección es la autenticidad, la calidad constante y la relación con tus clientes.
                  </p>
                </div>

                <div className="bg-amber-50 p-6 rounded-2xl border-2 border-amber-300">
                  <div className="text-3xl mb-3">🌱</div>
                  <h3 className="text-xl font-bold text-amber-900 mb-3">Calidad vs. escala</h3>
                  <p className="text-amber-800">
                    Crecer demasiado rápido puede comprometer la calidad artesanal. Crece de manera deliberada, preservando lo que hace especial tu cacao.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-8 rounded-2xl text-center">
                <h3 className="text-2xl font-bold mb-4">🎯 Camino recomendado</h3>
                <div className="text-left max-w-2xl mx-auto space-y-3 text-lg">
                  <p>✓ <strong>Mes 1-2:</strong> Entrenar a tu asistente para vender de forma independiente</p>
                  <p>✓ <strong>Mes 2-4:</strong> Agregar ventas los sábados</p>
                  <p>✓ <strong>Mes 3-6:</strong> Subir precios 10-15%</p>
                  <p>✓ <strong>Mes 6-12:</strong> Desarrollar un servicio de entregas estructurado</p>
                  <p>✓ <strong>Mes 9-18:</strong> Crear una línea de productos premium/ceremoniales</p>
                </div>
                <p className="mt-6 text-xl font-semibold">
                  Meta: triplicar utilidad en 24 meses manteniendo tu esencia
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer CTA */}
        <div className="mt-12 text-center bg-white p-8 rounded-2xl shadow-lg border-2 border-amber-200">
          <h3 className="text-2xl font-bold text-amber-950 mb-4">¿Quieres ver el reporte completo?</h3>
          <p className="text-amber-800 mb-6">
            Este es solo un resumen visual. El reporte detallado incluye proyecciones financieras completas,
            análisis FODA, evaluación de la competencia y una hoja de ruta estratégica paso a paso.
          </p>
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-amber-900 text-amber-50 px-8 py-4 rounded-full font-bold text-lg hover:bg-amber-800"
            aria-label="Abrir reporte completo en PDF"
          >
            📄 Reporte completo disponible
          </a>
        </div>
      </div>
    </div>
  )
}
