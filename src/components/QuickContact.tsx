"use client"
import { useState } from 'react'
import { Send, Phone, Mail, MapPin } from 'lucide-react'
import Image from 'next/image'

const QuickContact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <section className='section-padding'>
      <div className='container-main'>
        <div className='grid md:grid-cols-2 gap-12 lg:gap-20'>
          {/* Content */}
          <div>
            <span className='text-caption text-muted-foreground mb-4 block'>
              Get In Touch
            </span>
            <h2 className='text-heading mb-6'>Have Questions?</h2>
            <p className='text-body text-muted-foreground mb-10'>
              We're here to help. Reach out to us for inquiries about our
              products, custom manufacturing, or partnership opportunities.
            </p>

            {/* Contact Info */}
            <div className='space-y-6'>
              <div className='flex items-center gap-4'>
                <div className='w-12 h-12 bg-secondary rounded-sm flex items-center justify-center'>
                  <Phone className='w-5 h-5 text-primary' />
                </div>
                <div>
                  <p className='text-sm text-muted-foreground'>Phone</p>
                  <p className='font-medium'>+91 8239279999</p>
                </div>
              </div>

              <div className='flex items-center gap-4'>
                <div className='w-12 h-12 bg-secondary rounded-sm flex items-center justify-center'>
                  <Mail className='w-5 h-5 text-primary' />
                </div>
                <div>
                  <p className='text-sm text-muted-foreground'>Email</p>
                  <p className='font-medium'>sahil.gangwani2024@gmail.com</p>
                </div>
              </div>

              <div className='flex items-center gap-4'>
                <div className='w-12 h-12 bg-secondary rounded-sm flex items-center justify-center'>
                  <MapPin className='w-5 h-5 text-primary' />
                </div>
                <div>
                  <p className='text-sm text-muted-foreground'>Location</p>
                  <p className='font-medium'>Surat, India</p>
                </div>
              </div>
            </div>
          </div>

          <div className='w-full flex justify-center md:justify-end mb-8 md:mb-0'>
            <Image
              src='/assets/get-in-touch.jpeg'
              alt='Contact Us'
              width={500}
              height={500}
              className='w-full lg:max-w-lg xl:max-w-xl object-cover rounded-lg shadow-lg aspect-[4/3]'
            />
          </div>

          {/* Form */}
          {/* <div className="bg-card p-8 md:p-10 rounded-sm border border-border">
            <h3 className="font-display text-xl mb-6">Quick Inquiry</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
                  required
                />
              </div>

              <button type="submit" className="btn-primary w-full gap-2">
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </form>
          </div> */}
        </div>
      </div>
    </section>
  )
}

export default QuickContact
