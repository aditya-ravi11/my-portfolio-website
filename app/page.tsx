"use client"

import type React from "react"

import { useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import {
  Download,
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  Code,
  Database,
  Brain,
  Sparkles,
  Cpu,
  BarChart3,
  Smartphone,
  Globe,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

// Animated blob component with blue/green theme
const AnimatedBlob = ({ className, delay = 0 }: { className?: string; delay?: number }) => (
  <motion.div
    className={`absolute rounded-full opacity-20 ${className}`}
    animate={{
      x: [0, 100, 0],
      y: [0, -100, 0],
      scale: [1, 1.2, 1],
      rotate: [0, 180, 360],
    }}
    transition={{
      duration: 20,
      repeat: Number.POSITIVE_INFINITY,
      delay,
      ease: "linear",
    }}
  />
)

// Floating shapes component with blue/green theme
const FloatingShapes = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden">
    <AnimatedBlob className="w-64 h-64 bg-gradient-to-r from-blue-200 to-cyan-200 top-10 left-10" delay={0} />
    <AnimatedBlob className="w-48 h-48 bg-gradient-to-r from-green-200 to-emerald-200 top-1/4 right-20" delay={5} />
    <AnimatedBlob className="w-56 h-56 bg-gradient-to-r from-teal-200 to-blue-200 bottom-20 left-1/4" delay={10} />
    <AnimatedBlob className="w-40 h-40 bg-gradient-to-r from-cyan-200 to-green-200 bottom-1/3 right-10" delay={15} />
  </div>
)

// Sticky Navigation Component
const StickyNav = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsOpen(false)
  }

  const navItems = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "dsa", label: "DSA" },
    { id: "projects", label: "Projects" },
    { id: "resume", label: "Resume" },
    { id: "contact", label: "Contact" },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-blue-200/50 shadow-sm"
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <motion.button
          onClick={() => scrollToSection("hero")}
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"
        >
          Aditya Ravi
        </motion.button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              whileHover={{ scale: 1.05 }}
              className="text-blue-700 hover:text-green-600 font-medium transition-colors"
            >
              {item.label}
            </motion.button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-blue-700 hover:text-green-600 transition-colors"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-blue-200/50 md:hidden"
          >
            <div className="flex flex-col space-y-4 p-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-blue-700 hover:text-green-600 font-medium transition-colors text-left"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}

// Skill card component for grid layout
const SkillCard = ({
  skill,
  icon: Icon,
  delay,
}: {
  skill: string
  icon: any
  delay: number
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.05, y: -5 }}
    transition={{
      initial: { delay, duration: 0.5 },
      hover: { duration: 0.2 },
    }}
    className="group cursor-pointer"
  >
    <div className="bg-gradient-to-br from-blue-100/80 to-green-100/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-200/50 group-hover:border-green-300/50 flex flex-col items-center justify-center min-h-[120px]">
      <Icon className="w-8 h-8 text-blue-600 mb-3 group-hover:text-green-600 transition-colors duration-300" />
      <span className="text-sm font-semibold text-blue-800 text-center leading-tight group-hover:text-green-700 transition-colors duration-300">
        {skill}
      </span>
    </div>
  </motion.div>
)

// Project card component
const ProjectCard = ({
  title,
  description,
  tech,
  githubUrl,
  delay,
}: {
  title: string
  description: string
  tech: string[]
  githubUrl: string
  delay: number
}) => (
  <motion.div
    initial={{ y: 50, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    transition={{ delay, duration: 0.6 }}
    whileHover={{ y: -10 }}
    className="group"
  >
    <Card className="h-full bg-gradient-to-br from-blue-50 to-green-50 border-blue-200/50 hover:border-green-300/50 transition-all duration-300 overflow-hidden">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-blue-800 group-hover:text-green-700 transition-colors">{title}</h3>
          <motion.a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="text-blue-600 hover:text-green-600 transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
          </motion.a>
        </div>
        <p className="text-blue-700 mb-4 leading-relaxed">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tech.map((item, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gradient-to-r from-green-100 to-blue-100 text-blue-700 rounded-full text-sm font-medium"
            >
              {item}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  </motion.div>
)

// Contact Form Component with EmailJS
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault() // THIS IS THE KEY LINE!

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", message: "" })
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      console.error("Client-side contact form submission error:", error) // Log client-side errors
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus("idle"), 5000)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-br from-green-100 to-blue-100 p-8 rounded-3xl shadow-lg border border-green-200/50 space-y-6"
    >
      <div>
        <Input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
          className="bg-white/70 border-blue-200 rounded-2xl py-6 text-blue-800 placeholder:text-blue-500 focus:border-green-300 focus:ring-green-200"
        />
      </div>
      <div>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          required
          className="bg-white/70 border-blue-200 rounded-2xl py-6 text-blue-800 placeholder:text-blue-500 focus:border-green-300 focus:ring-green-200"
        />
      </div>
      <div>
        <Textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          rows={5}
          required
          className="bg-white/70 border-blue-200 rounded-2xl text-blue-800 placeholder:text-blue-500 focus:border-green-300 focus:ring-green-200 resize-none"
        />
      </div>

      {/* Status Messages */}
      {submitStatus === "success" && (
        <div className="text-green-600 text-center font-medium">
          ✅ Message sent successfully! I'll get back to you soon.
        </div>
      )}
      {submitStatus === "error" && (
        <div className="text-red-600 text-center font-medium">
          ❌ Failed to send message. Please try again or email me directly.
        </div>
      )}

      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white py-6 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </motion.div>
    </form>
  )
}

export default function Portfolio() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  const skills = [
    // Programming Languages
    { name: "Python", icon: Code },
    { name: "JavaScript", icon: Globe },
    { name: "TypeScript", icon: Globe },
    { name: "Java", icon: Code },
    { name: "C++", icon: Cpu },
    { name: "Dart", icon: Smartphone },

    // Frameworks & Libraries
    { name: "React.js", icon: Sparkles },
    { name: "Node.js", icon: Database },
    { name: "Flask", icon: Code },
    { name: "Flutter", icon: Smartphone },

    // ML & Data Science
    { name: "Machine Learning", icon: Brain },
    { name: "XGBoost", icon: BarChart3 },
    { name: "Random Forest", icon: BarChart3 },
    { name: "Data Visualization", icon: BarChart3 },
    { name: "Model Evaluation", icon: Cpu },

    // Tools & Databases
    { name: "MongoDB", icon: Database },
    { name: "Firebase", icon: Database },
    { name: "Git/GitHub", icon: Github },
    { name: "VS Code", icon: Code },
    { name: "Jupyter", icon: BarChart3 },
  ]

  const projects = [
    {
      title: "Customer Churn Analysis & Tenure Prediction",
      description:
        "Built a comprehensive ML pipeline for churn prediction, tenure forecasting, and CLV analysis using advanced ensemble models on large-scale real-world data. Features analytics dashboard and actionable business insights.",
      tech: ["Python", "XGBoost", "Random Forest", "Tableau", "Data Analysis"],
      githubUrl: "https://github.com/adityaravi/churn-analysis",
    },
    {
      title: "Receiptify (Ongoing)",
      description:
        "Modern receipt management application built with Flutter/FlutterFlow featuring OCR technology, analytics dashboard, and Firebase backend. Cross-platform solution with clean, intuitive UI design.",
      tech: ["Flutter", "FlutterFlow", "OCR", "Firebase", "Analytics"],
      githubUrl: "https://github.com/adityaravi/receiptify",
    },
    {
      title: "Portfolio Website",
      description:
        "Personal portfolio website featuring modern pastel design, interactive animations, and responsive layout. Built with Next.js, Framer Motion, and Tailwind CSS for optimal performance.",
      tech: ["Next.js", "React", "Framer Motion", "Tailwind CSS"],
      githubUrl: "https://github.com/adityaravi/portfolio",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-cyan-50 font-['Nunito'] overflow-x-hidden">
      <FloatingShapes />
      <StickyNav />

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative px-4 pt-20">
        <motion.div style={{ y }} className="text-center z-10">
          <motion.h1
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-600 via-green-600 to-teal-600 bg-clip-text text-transparent mb-6"
          >
            Aditya Ravi
          </motion.h1>

          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-2xl md:text-3xl text-blue-700 mb-8 font-medium"
          >
            Building ideas with code and creativity
          </motion.p>

          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg text-blue-600 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Third-year BTech Student specializing in Artificial Intelligence & Data Science
          </motion.p>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() => {
                const link = document.createElement("a")
                link.href = "/resume.pdf"
                link.download = "Aditya-Ravi-Resume.pdf"
                link.click()
              }}
            >
              <Download className="w-5 h-5 mr-2" />
              Download Resume
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"
          >
            About Me
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-br from-blue-100 to-green-100 p-8 rounded-3xl shadow-lg border border-blue-200/50">
                <h3 className="text-2xl font-bold text-blue-800 mb-4">My Journey</h3>
                <p className="text-blue-700 leading-relaxed">
                  As a passionate third-year BTech student in AI & Data Science, I'm fascinated by the intersection of
                  machine learning and real-world problem solving. I specialize in building intelligent systems that
                  create meaningful business impact through data-driven insights.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-100 to-teal-100 p-8 rounded-3xl shadow-lg border border-green-200/50">
                <h3 className="text-2xl font-bold text-green-800 mb-4">What Drives Me</h3>
                <p className="text-green-700 leading-relaxed">
                  I believe in the power of data to tell compelling stories and AI to transform industries. My goal is
                  to bridge the gap between complex algorithms and user-friendly applications that make advanced
                  technology accessible to everyone.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="w-80 h-80 mx-auto bg-gradient-to-br from-blue-200 to-green-200 rounded-full flex items-center justify-center shadow-2xl">
                <div className="w-64 h-64 bg-gradient-to-br from-cyan-100 to-teal-100 rounded-full flex items-center justify-center">
                  <Brain className="w-32 h-32 text-blue-600" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section - Modern Grid Layout */}
      <section id="skills" className="py-20 px-4 bg-gradient-to-r from-blue-50 to-green-50">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"
          >
            Skills & Tools
          </motion.h2>

          {/* Skills Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {skills.map((skill, index) => (
              <SkillCard key={skill.name} skill={skill.name} icon={skill.icon} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Competitive Programming & DSA Section */}
      <section id="dsa" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"
          >
            Competitive Programming & DSA
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-lg text-blue-700 text-center mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            I actively practice Data Structures and Algorithms, regularly solving problems on platforms like Codeforces
            and LeetCode. It's helped me sharpen my coding and problem-solving skills.
          </motion.p>

          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {/* Codeforces Card */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="bg-gradient-to-br from-blue-100 to-cyan-100 p-8 rounded-3xl shadow-lg border border-blue-200/50 text-center group hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Code className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-blue-800 mb-4">Codeforces</h3>
              <p className="text-blue-600 mb-6 text-sm">Algorithmic contests & problem solving</p>
              <motion.a
                href="https://codeforces.com/profile/adityaravi"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-blue-300/50">
                  View Codeforces Profile
                </Button>
              </motion.a>
            </motion.div>

            {/* LeetCode Card */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="bg-gradient-to-br from-green-100 to-teal-100 p-8 rounded-3xl shadow-lg border border-green-200/50 text-center group hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-4">LeetCode</h3>
              <p className="text-green-600 mb-6 text-sm">Data structures & algorithm practice</p>
              <motion.a
                href="https://leetcode.com/adityaravi"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-green-300/50">
                  View LeetCode Profile
                </Button>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"
          >
            Featured Projects
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} {...project} delay={index * 0.2} />
            ))}
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="py-20 px-4 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"
          >
            Resume
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xl text-blue-700 mb-12 leading-relaxed"
          >
            Interested in my experience and qualifications? Download my complete resume to learn more about my journey,
            projects, and achievements in AI & Data Science.
          </motion.p>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white px-12 py-6 rounded-full text-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
              onClick={() => {
                const link = document.createElement("a")
                link.href = "/resume.pdf"
                link.download = "Aditya-Ravi-Resume.pdf"
                link.click()
              }}
            >
              <Download className="w-6 h-6 mr-3" />
              Download Resume
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"
          >
            Let's Connect
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="bg-gradient-to-br from-blue-100 to-green-100 p-8 rounded-3xl shadow-lg border border-blue-200/50">
                <h3 className="text-2xl font-bold text-blue-800 mb-6">Get in Touch</h3>
                <p className="text-blue-700 mb-8 leading-relaxed">
                  I'm always excited to discuss new opportunities, collaborate on interesting projects, or just chat
                  about AI, data science, and technology!
                </p>

                <div className="space-y-4">
                  <motion.a
                    href="mailto:aditya@example.com"
                    whileHover={{ scale: 1.05, x: 10 }}
                    className="flex items-center space-x-4 text-blue-700 hover:text-green-600 transition-colors"
                  >
                    <Mail className="w-6 h-6" />
                    <span className="font-medium">aditya@example.com</span>
                  </motion.a>

                  <motion.a
                    href="https://linkedin.com/in/adityaravi"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, x: 10 }}
                    className="flex items-center space-x-4 text-blue-700 hover:text-green-600 transition-colors"
                  >
                    <Linkedin className="w-6 h-6" />
                    <span className="font-medium">LinkedIn Profile</span>
                  </motion.a>

                  <motion.a
                    href="https://github.com/adityaravi"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, x: 10 }}
                    className="flex items-center space-x-4 text-blue-700 hover:text-green-600 transition-colors"
                  >
                    <Github className="w-6 h-6" />
                    <span className="font-medium">GitHub Profile</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gradient-to-r from-blue-100 to-green-100 border-t border-blue-200/50">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center space-x-8 mb-8"
          >
            <motion.a
              href="mailto:aditya@example.com"
              whileHover={{ scale: 1.2, rotate: 5 }}
              className="text-blue-600 hover:text-green-600 transition-colors"
            >
              <Mail className="w-8 h-8" />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/adityaravi"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              className="text-blue-600 hover:text-green-600 transition-colors"
            >
              <Linkedin className="w-8 h-8" />
            </motion.a>
            <motion.a
              href="https://github.com/adityaravi"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              className="text-blue-600 hover:text-green-600 transition-colors"
            >
              <Github className="w-8 h-8" />
            </motion.a>
          </motion.div>

          <p className="text-blue-700 font-medium">© 2024 Aditya Ravi. Crafted with passion and creativity.</p>
        </div>
      </footer>
    </div>
  )
}
