'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Github, Mail, Code2, Sparkles, Trophy, Zap } from 'lucide-react'

export function DeveloperEasterEgg() {
  const [isOpen, setIsOpen] = useState(false)
  const [konamiIndex, setKonamiIndex] = useState(0)
  
  // Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
  const konamiCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'b', 'a'
  ]

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      
      if (key === konamiCode[konamiIndex] || e.key === konamiCode[konamiIndex]) {
        setKonamiIndex(prev => prev + 1)
        
        if (konamiIndex === konamiCode.length - 1) {
          setIsOpen(true)
          setKonamiIndex(0)
          // Play success sound effect (optional)
          playSuccessSound()
        }
      } else {
        setKonamiIndex(0)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [konamiIndex])

  const playSuccessSound = () => {
    // Create a simple beep sound
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.value = 800
    oscillator.type = 'sine'
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.5)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0, rotate: 180, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.8, bounce: 0.4 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-4xl bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 rounded-3xl shadow-2xl overflow-hidden">
              {/* Animated background particles */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-white rounded-full"
                    initial={{
                      x: Math.random() * 100 + '%',
                      y: Math.random() * 100 + '%',
                      opacity: 0.2
                    }}
                    animate={{
                      y: [null, Math.random() * 100 + '%'],
                      opacity: [0.2, 0.8, 0.2]
                    }}
                    transition={{
                      duration: Math.random() * 3 + 2,
                      repeat: Infinity,
                      ease: 'linear'
                    }}
                  />
                ))}
              </div>

              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Content */}
              <div className="relative p-8 md:p-12">
                {/* Header with sparkles */}
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-center mb-8"
                >
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Sparkles className="w-8 h-8 text-yellow-300 animate-pulse" />
                    <h2 className="text-4xl md:text-5xl font-bold text-white">
                      🎉 Easter Egg Found!
                    </h2>
                    <Sparkles className="w-8 h-8 text-yellow-300 animate-pulse" />
                  </div>
                  <p className="text-blue-200 text-lg">
                    Congratulations! You discovered the secret developer profile!
                  </p>
                </motion.div>

                {/* Developer Card */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
                >
                  {/* Profile Section */}
                  <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
                    {/* Avatar with glow effect */}
                    <motion.div
                      animate={{
                        boxShadow: [
                          '0 0 20px rgba(59, 130, 246, 0.5)',
                          '0 0 40px rgba(168, 85, 247, 0.8)',
                          '0 0 20px rgba(59, 130, 246, 0.5)'
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-6xl font-bold text-white"
                    >
                      GM
                    </motion.div>

                    {/* Info */}
                    <div className="text-center md:text-left flex-1">
                      <h3 className="text-3xl font-bold text-white mb-2">
                        Gilang Maulana Kussay
                      </h3>
                      <div className="space-y-1 text-blue-200">
                        <p className="flex items-center gap-2 justify-center md:justify-start">
                          <Code2 className="w-4 h-4" />
                          Full Stack Developer
                        </p>
                        <p className="font-mono">NIM: 221011401208</p>
                        <p>Kelas: 07TPLM006</p>
                        <p className="text-sm text-blue-300">Politeknik Negeri Malang</p>
                      </div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                      { icon: Code2, label: 'Lines of Code', value: '10K+' },
                      { icon: Zap, label: 'Components', value: '50+' },
                      { icon: Trophy, label: 'Features', value: '15+' },
                      { icon: Sparkles, label: 'Easter Eggs', value: '1' }
                    ].map((stat, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.6 + i * 0.1 }}
                        className="bg-white/5 rounded-xl p-4 text-center border border-white/10"
                      >
                        <stat.icon className="w-6 h-6 mx-auto mb-2 text-blue-300" />
                        <div className="text-2xl font-bold text-white">{stat.value}</div>
                        <div className="text-xs text-blue-200">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Tech Stack */}
                  <div className="mb-8">
                    <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-yellow-300" />
                      Tech Stack Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {[
                        'Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS',
                        'Framer Motion', 'Supabase', 'Zustand', 'PostgreSQL'
                      ].map((tech, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 + i * 0.05 }}
                          className="px-3 py-1 bg-white/10 rounded-full text-sm text-blue-100 border border-white/20"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Quote */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="bg-white/5 rounded-xl p-6 border-l-4 border-blue-400 mb-6"
                  >
                    <p className="text-white italic text-lg">
                      "Code is like humor. When you have to explain it, it's bad."
                    </p>
                    <p className="text-blue-300 text-sm mt-2">- Cory House</p>
                  </motion.div>

                  {/* Contact Links */}
                  <div className="flex flex-wrap gap-4 justify-center">
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href="https://github.com/gilangkussay"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors border border-white/20"
                    >
                      <Github className="w-5 h-5" />
                      GitHub
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href="mailto:gilang.kussay@student.polinema.ac.id"
                      className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors border border-white/20"
                    >
                      <Mail className="w-5 h-5" />
                      Email
                    </motion.a>
                  </div>
                </motion.div>

                {/* Footer hint */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  className="text-center text-blue-300 text-sm mt-6"
                >
                  💡 Hint: Try the Konami Code (↑ ↑ ↓ ↓ ← → ← → B A) to open this again!
                </motion.p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
