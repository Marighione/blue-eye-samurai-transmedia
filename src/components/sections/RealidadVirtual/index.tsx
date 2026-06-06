'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { staggerContainer, revealFromFog } from '@/lib/animations';
import { useUserState } from '@/context/UserStateContext';
import { rvExperiences } from '@/data/rv-experiences';
import { Divider } from '@/components/primitives/Divider';
import { Button } from '@/components/primitives/Button';

const PROFILE_LABELS: Record<string, string> = {
  llama: 'La Llama',
  balanza: 'La Balanza',
  rio: 'El Río',
  niebla: 'La Niebla',
};

const INTENSITY_COLORS: Record<string, string> = {
  Alta: '#C41E1E',
  Media: '#C58A2A',
  Baja: '#4A90C4',
};

interface FormData {
  nombre: string;
  email: string;
  fecha: string;
  recorrido: string;
}

interface FormErrors {
  nombre?: string;
  email?: string;
  fecha?: string;
  recorrido?: string;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function RealidadVirtualPage() {
  const { state } = useUserState();
  const formRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
    fecha: '',
    recorrido: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const recommended = state.quizMoralResult
    ? rvExperiences.find((e) => e.recommendedFor === state.quizMoralResult)
    : null;

  const scrollToForm = (preselect?: string) => {
    if (preselect) {
      setFormData((prev) => ({ ...prev, recorrido: preselect }));
    }
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!formData.nombre.trim()) e.nombre = 'El nombre es obligatorio';
    if (!formData.email.trim()) e.email = 'El email es obligatorio';
    else if (!validateEmail(formData.email)) e.email = 'Formato de email inválido';
    if (!formData.fecha) e.fecha = 'Elegí una fecha';
    if (!formData.recorrido) e.recorrido = 'Seleccioná un recorrido';
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  return (
    <div className="min-h-screen bg-night">
      {/* Hero */}
      <div className="relative min-h-[70vh] flex items-end">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/fire-scene.png"
            alt=""
            fill
            className="object-cover"
            quality={85}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night via-night/70 to-night/30" />
        </div>

        <div className="relative z-10 w-full px-8 md:px-20 pb-20">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.p
              variants={revealFromFog}
              className="font-ui text-xs font-semibold uppercase tracking-widest text-gold/60 mb-4"
            >
              Experiencia inmersiva
            </motion.p>
            <motion.h1
              variants={revealFromFog}
              className="font-display text-5xl md:text-7xl font-semibold text-snow tracking-wide mb-4"
            >
              Realidad Virtual
            </motion.h1>
            <motion.p
              variants={revealFromFog}
              className="font-narrative italic text-snow/70 text-lg md:text-xl max-w-xl leading-relaxed"
            >
              Tres recorridos. El tuyo depende de quién sos.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Banner personalizado */}
      {recommended && state.quizMoralResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mx-8 md:mx-20 -mt-6 mb-16 border border-gold/30 bg-deep-blue/60 p-8 md:p-10"
        >
          <p className="font-ui text-xs font-semibold uppercase tracking-widest text-gold/70 mb-3">
            Recomendación basada en tu perfil: {PROFILE_LABELS[state.quizMoralResult]}
          </p>
          <h2 className="font-display text-2xl md:text-3xl text-snow tracking-wide mb-3">
            {recommended.name}
          </h2>
          <p className="font-narrative text-snow/75 leading-relaxed max-w-2xl mb-6">
            {recommended.description}
          </p>
          <Button variant="primary" size="sm" onClick={() => scrollToForm(recommended.id)}>
            Reservar este recorrido
          </Button>
        </motion.div>
      )}

      {/* Recorridos */}
      <div className="px-8 md:px-20 py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
        >
          <motion.h2
            variants={revealFromFog}
            className="font-display text-3xl md:text-4xl text-snow tracking-wide mb-12"
          >
            Los tres caminos
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rvExperiences.map((exp) => {
              const isRecommended = recommended?.id === exp.id;
              return (
                <motion.div
                  key={exp.id}
                  variants={revealFromFog}
                  className={`border p-8 transition-all duration-500 hover:bg-deep-blue/30 ${
                    isRecommended
                      ? 'border-gold/40 bg-deep-blue/20'
                      : 'border-white/10 bg-transparent'
                  }`}
                >
                  {isRecommended && (
                    <p className="font-ui text-[10px] font-semibold uppercase tracking-widest text-gold mb-4">
                      Recomendado para vos
                    </p>
                  )}
                  <h3 className="font-display text-xl text-snow tracking-wide mb-4">
                    {exp.name}
                  </h3>
                  <p className="font-narrative text-snow/75 text-sm leading-relaxed mb-6">
                    {exp.description}
                  </p>

                  <div className="flex items-center gap-4 mb-6">
                    <span className="font-ui text-xs text-mist/70 uppercase tracking-wider">
                      {exp.duration}
                    </span>
                    <span
                      className="font-ui text-xs font-semibold uppercase tracking-wider"
                      style={{ color: INTENSITY_COLORS[exp.intensity] }}
                    >
                      Intensidad {exp.intensity}
                    </span>
                  </div>

                  <button
                    onClick={() => scrollToForm(exp.id)}
                    className="font-ui text-xs font-semibold uppercase tracking-widest text-gold/70 hover:text-gold transition-colors duration-300"
                  >
                    Reservar →
                  </button>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      <Divider variant="sword" className="mx-8 md:mx-20 opacity-20" />

      {/* Formulario de reserva */}
      <div ref={formRef} className="px-8 md:px-20 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
          className="max-w-2xl"
        >
          <motion.h2
            variants={revealFromFog}
            className="font-display text-3xl md:text-4xl text-snow tracking-wide mb-4"
          >
            Reservá tu experiencia
          </motion.h2>
          <motion.p
            variants={revealFromFog}
            className="font-narrative italic text-snow/60 mb-12"
          >
            El formulario no envía datos reales. Es una simulación dentro del universo narrativo.
          </motion.p>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                variants={revealFromFog}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -20, transition: { duration: 0.4 } }}
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                {/* Nombre */}
                <div>
                  <label
                    htmlFor="rv-nombre"
                    className="block font-ui text-xs font-semibold uppercase tracking-widest text-mist mb-3"
                  >
                    Nombre
                  </label>
                  <input
                    id="rv-nombre"
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => handleChange('nombre', e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 focus:border-gold/60 text-snow font-narrative text-lg py-3 outline-none transition-colors duration-300 placeholder:text-white/40"
                    placeholder="Tu nombre"
                  />
                  {errors.nombre && (
                    <p className="font-ui text-xs text-blood-bright mt-2">{errors.nombre}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="rv-email"
                    className="block font-ui text-xs font-semibold uppercase tracking-widest text-mist mb-3"
                  >
                    Email
                  </label>
                  <input
                    id="rv-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 focus:border-gold/60 text-snow font-narrative text-lg py-3 outline-none transition-colors duration-300 placeholder:text-white/40"
                    placeholder="tu@email.com"
                  />
                  {errors.email && (
                    <p className="font-ui text-xs text-blood-bright mt-2">{errors.email}</p>
                  )}
                </div>

                {/* Fecha */}
                <div>
                  <label
                    htmlFor="rv-fecha"
                    className="block font-ui text-xs font-semibold uppercase tracking-widest text-mist mb-3"
                  >
                    Fecha preferida
                  </label>
                  <input
                    id="rv-fecha"
                    type="date"
                    value={formData.fecha}
                    onChange={(e) => handleChange('fecha', e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 focus:border-gold/60 text-snow font-narrative text-lg py-3 outline-none transition-colors duration-300 [color-scheme:dark]"
                  />
                  {errors.fecha && (
                    <p className="font-ui text-xs text-blood-bright mt-2">{errors.fecha}</p>
                  )}
                </div>

                {/* Recorrido */}
                <div>
                  <label
                    htmlFor="rv-recorrido"
                    className="block font-ui text-xs font-semibold uppercase tracking-widest text-mist mb-3"
                  >
                    Recorrido
                  </label>
                  <select
                    id="rv-recorrido"
                    value={formData.recorrido}
                    onChange={(e) => handleChange('recorrido', e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 focus:border-gold/60 text-snow font-narrative text-lg py-3 outline-none transition-colors duration-300 [color-scheme:dark]"
                  >
                    <option value="" className="bg-night text-snow">
                      Seleccioná un recorrido
                    </option>
                    {rvExperiences.map((exp) => (
                      <option key={exp.id} value={exp.id} className="bg-night text-snow">
                        {exp.name} ({exp.duration})
                      </option>
                    ))}
                  </select>
                  {errors.recorrido && (
                    <p className="font-ui text-xs text-blood-bright mt-2">{errors.recorrido}</p>
                  )}
                </div>

                <div className="pt-4">
                  <Button variant="primary" type="submit" size="lg">
                    Confirmar reserva
                  </Button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="confirmation"
                initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="border border-gold/30 bg-deep-blue/20 p-12 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="w-16 h-16 mx-auto mb-8 border border-gold/50 flex items-center justify-center"
                >
                  <span className="font-display text-2xl text-gold">青</span>
                </motion.div>

                <h3 className="font-display text-2xl md:text-3xl text-snow tracking-wide mb-4">
                  Reserva confirmada
                </h3>
                <p className="font-narrative italic text-snow/70 text-lg leading-relaxed max-w-md mx-auto mb-8">
                  Tu lugar en el camino está reservado. No hace falta que traigas nada excepto lo que ya sabés sobre vos.
                </p>
                <p className="font-ui text-xs text-mist/60 uppercase tracking-widest">
                  {formData.nombre} · {rvExperiences.find((e) => e.id === formData.recorrido)?.name} · {formData.fecha}
                </p>

                <div className="mt-10">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ nombre: '', email: '', fecha: '', recorrido: '' });
                    }}
                  >
                    Hacer otra reserva
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
