import ContactForm from '../components/ContactForm'

export default function Contact() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="mb-2 text-center text-2xl font-bold text-gray-800">Contact</h1>
      <p className="mb-8 text-center text-gray-500">
        Questions about your stay? Send an inquiry and we'll follow up.
      </p>
      <ContactForm />
    </div>
  )
}
