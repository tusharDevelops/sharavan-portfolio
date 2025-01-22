"use client"

import React, { useRef, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useMediaQuery } from "react-responsive"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import { BackgroundBeams } from "@/components/ui/background-beams"
import { SparklesCore } from "@/components/ui/sparkles"
import { HoverEffect } from "@/components/ui/card-hover-effect"
import { WavyBackground } from "@/components/ui/wavy-background"
import { GlowingStarsBackgroundCard } from "@/components/ui/glowing-stars"

export default function Home() {
  const aboutRef = useRef<HTMLElement>(null)
  const experienceRef = useRef<HTMLElement>(null)
  const instituteRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isMobile = useMediaQuery({ maxWidth: 768 })

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" })
    setIsMenuOpen(false)
  }

  const NavItems = () => (
    <>
      <Button variant="ghost" onClick={() => scrollToSection(aboutRef)}>
        About
      </Button>
      <Button variant="ghost" onClick={() => scrollToSection(experienceRef)}>
        Experience
      </Button>
      <Button variant="ghost" onClick={() => scrollToSection(instituteRef)}>
        Vidya+
      </Button>
      <Button variant="ghost" onClick={() => scrollToSection(contactRef)}>
        Contact
      </Button>
    </>
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-pink-100 dark:from-blue-900 dark:to-purple-900 text-foreground overflow-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 bg-white/30 dark:bg-black/30 backdrop-blur-lg">
        <div className="text-xl md:text-2xl font-bold">Mr. Shravan Kumar</div>
        {isMobile ? (
          <div className="flex items-center">
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <NavItems />
            <ThemeToggle />
          </div>
        )}
      </nav>
      {isMobile && isMenuOpen && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-white/30 dark:bg-black/30 backdrop-blur-lg p-4 flex flex-col space-y-2">
          <NavItems />
        </div>
      )}

      <main className="pt-16">
        <HeroSection />
        <AboutSection ref={aboutRef} />
        <ExperienceSection ref={experienceRef} />
        <InstituteSection ref={instituteRef} />
        <ContactSection ref={contactRef} />
      </main>

      <BackgroundBeams />
    </div>
  )
}

function HeroSection() {
  return (
    <section className="h-screen flex flex-col justify-center items-center relative overflow-hidden">
      <WavyBackground className="w-full h-full absolute">
        <div className="relative z-10 text-center">
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
            >
            <Image
              src="/pic.jpg"
              alt="Shravan Kumar"
              width={300}
              height={300}
              className="rounded-full mt-4 mx-auto border-4 border-white shadow-lg"
            />
            </motion.div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">Shravan Kumar</h1>
          <TextGenerateEffect words="Educator | Innovator | Founder of Vidya+" />
        </div>
      </WavyBackground>
      <SparklesCore
        id="tsparticlesfullpage"
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={100}
        className="w-full h-full absolute top-0 left-0 z-10"
      />
    </section>
  )
}

const AboutSection = motion(
  React.forwardRef<HTMLElement>((props, ref) => {
    return (
      <section ref={ref} className="min-h-screen flex items-center justify-center p-4">
        <GlowingStarsBackgroundCard>
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">About Me</h2>
            <p className="mb-4">
              With over 5 years of experience in education, I've dedicated my career to transforming the way we learn
              and teach. As the founder of Vidya+, I'm committed to making quality education accessible to all.
            </p>
            <h3 className="text-xl font-semibold mb-2">Expertise</h3>
            <ul className="list-none space-y-2">
              <li>Innovative Teaching Methodologies</li>
              <li>Curriculum Development</li>
              <li>Educational Technology Integration</li>
              <li>STEM Education</li>
              <li>Teacher Training and Development</li>
            </ul>
          </div>
        </GlowingStarsBackgroundCard>
      </section>
    )
  }),
)

const ExperienceSection = motion(
  React.forwardRef<HTMLElement>((props, ref) => {
    const experiences = [
      {
        title: "Founder & CEO, Vidya+",
        period: "2015 - Present",
        description: "Leading the revolution in personalized learning through technology.",
      },
      {
        title: "Education Consultant",
        period: "2010 - 2015",
        description: "Advised schools and institutions on implementing modern teaching practices.",
      },
      {
        title: "High School Science Teacher",
        period: "2005 - 2010",
        description: "Inspired students to pursue STEM careers through engaging classroom experiences.",
      },
    ]

    return (
      <section ref={ref} className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Professional Experience</h2>
          <HoverEffect
            items={experiences.map((exp) => ({
              title: exp.title,
              description: `${exp.period} - ${exp.description}`,
            }))}
          />
        </div>
      </section>
    )
  }),
)

const InstituteSection = motion(
  React.forwardRef<HTMLElement>((props, ref) => {
    return (
      <section ref={ref} className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        <WavyBackground className="absolute inset-0">
          <div className="relative z-10 bg-white/30 dark:bg-black/30 backdrop-blur-lg rounded-lg p-8 max-w-4xl w-full">
            <h2 className="text-3xl font-bold mb-4 text-center">Vidya+ Institute</h2>
            <p className="mb-4">
              Vidya+ is an innovative educational institute that combines cutting-edge technology with proven teaching
              methodologies. Our mission is to provide personalized, engaging, and effective learning experiences for
              students of all ages.
            </p>
            <h3 className="text-xl font-semibold mb-2">What We Offer</h3>
            <ul className="list-disc list-inside mb-4">
              <li>Adaptive Learning Platforms</li>
              <li>Interactive Online Courses</li>
              <li>STEM-focused Programs</li>
              <li>Teacher Training Workshops</li>
              <li>Educational Research Initiatives</li>
            </ul>
            <div className="text-center">
              <Button>Learn More About Vidya+</Button>
            </div>
          </div>
        </WavyBackground>
      </section>
    )
  }),
)

const ContactSection = motion(
  React.forwardRef<HTMLElement>((props, ref) => {
    return (
      <section ref={ref} className="min-h-screen flex items-center justify-center p-4">
        <GlowingStarsBackgroundCard>
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="mb-4">Reach out for collaborations or inquiries</p>
            <form className="space-y-4 max-w-md mx-auto">
              <input
                type="text"
                placeholder="Name"
                className="w-full p-2 rounded bg-white/50 dark:bg-black/50 backdrop-blur-sm"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 rounded bg-white/50 dark:bg-black/50 backdrop-blur-sm"
              />
              <textarea
                placeholder="Message"
                rows={4}
                className="w-full p-2 rounded bg-white/50 dark:bg-black/50 backdrop-blur-sm"
              ></textarea>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </GlowingStarsBackgroundCard>
      </section>
    )
  }),
)

