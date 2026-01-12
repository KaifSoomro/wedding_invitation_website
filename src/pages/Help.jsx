import { Link } from 'react-router-dom'
import { HelpCircle, Keyboard, FileQuestion, MessageCircle } from 'lucide-react'

export default function Help() {
  const faqs = [
    {
      question: 'How do I start creating a wedding card?',
      answer: 'Click the "Create Design" button on the home page or choose a template from the Templates page. You\'ll be taken to the editor where you can customize your design.',
    },
    {
      question: 'Can I upload my own images?',
      answer: 'Yes! Click the Image tool in the editor, then choose "Upload" to select images from your device. You can also paste image URLs or drag and drop images directly onto the canvas.',
    },
    {
      question: 'How do I save my work?',
      answer: 'Your designs are automatically saved to your browser\'s local storage. You can also export your finished design as PNG, JPEG, or PDF using the Export button.',
    },
    {
      question: 'Are my designs saved in the cloud?',
      answer: 'Currently, designs are saved locally in your browser. Cloud saving is a premium feature coming soon. Make sure to export important designs as backups.',
    },
    {
      question: 'What export formats are supported?',
      answer: 'You can export your designs in three formats: PNG (best for web), JPEG (smaller file size), and PDF (best for printing). You can also adjust the quality/resolution.',
    },
    {
      question: 'Can I use this on mobile?',
      answer: 'Absolutely! Our editor is fully responsive and supports touch gestures like pinch-to-zoom and two-finger pan on mobile devices.',
    },
    {
      question: 'How do I add text to my design?',
      answer: 'Click the Text tool, then click anywhere on the canvas to place text. You can customize font, size, color, alignment, and more in the Properties panel.',
    },
    {
      question: 'Can I undo mistakes?',
      answer: 'Yes! Use Ctrl+Z (Cmd+Z on Mac) to undo or Ctrl+Y to redo. You have unlimited undo/redo history.',
    },
    {
      question: 'How do I delete an element?',
      answer: 'Select the element you want to delete and press the Delete or Backspace key. You can also use the Delete button in the Properties panel.',
    },
    {
      question: 'Is this service free?',
      answer: 'Yes! The basic editor with all core features is completely free. Premium features like cloud storage and advanced templates will be available in the future.',
    },
    {
      question: 'Can I print my design?',
      answer: 'Yes! Export your design as PDF or high-resolution PNG (3x or 4x quality) for the best printing results. Make sure to check with your print service for their specific requirements.',
    },
    {
      question: 'What are the keyboard shortcuts?',
      answer: 'Press the "?" key in the editor or click the keyboard icon to see all available shortcuts. Common ones include Ctrl+Z (undo), Ctrl+C (copy), Ctrl+V (paste), and Delete.',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <HelpCircle className="w-16 h-16 text-violet-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
          <p className="text-lg text-gray-600">
            Everything you need to know about using Wedding Card Designer
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link
            to="/editor"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center group"
          >
            <FileQuestion className="w-12 h-12 text-violet-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Try the Editor</h3>
            <p className="text-gray-600">Get hands-on experience with our design tools</p>
          </Link>

          <button
            onClick={() => {
              const editorHelp = document.getElementById('keyboard-shortcuts')
              if (editorHelp) editorHelp.scrollIntoView({ behavior: 'smooth' })
            }}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center group"
          >
            <Keyboard className="w-12 h-12 text-violet-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Keyboard Shortcuts</h3>
            <p className="text-gray-600">Learn time-saving keyboard commands</p>
          </button>

          <Link
            to="/contact"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center group"
          >
            <MessageCircle className="w-12 h-12 text-violet-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact Support</h3>
            <p className="text-gray-600">Still need help? Get in touch with us</p>
          </Link>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Keyboard Shortcuts */}
        <div id="keyboard-shortcuts" className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Keyboard Shortcuts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { keys: 'Ctrl + Z', action: 'Undo' },
              { keys: 'Ctrl + Y', action: 'Redo' },
              { keys: 'Ctrl + C', action: 'Copy selected element' },
              { keys: 'Ctrl + V', action: 'Paste element' },
              { keys: 'Ctrl + D', action: 'Duplicate element' },
              { keys: 'Delete / Backspace', action: 'Delete selected element' },
              { keys: 'Space + Drag', action: 'Pan canvas' },
              { keys: 'Ctrl + Scroll', action: 'Zoom in/out' },
              { keys: '?', action: 'Show shortcuts help' },
              { keys: 'Esc', action: 'Deselect element' },
              { keys: 'Ctrl + A', action: 'Select all (coming soon)' },
              { keys: 'Arrow Keys', action: 'Move selected element' },
            ].map((shortcut, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="font-mono text-sm bg-white px-3 py-1 rounded border border-gray-300">
                  {shortcut.keys}
                </span>
                <span className="text-gray-700">{shortcut.action}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Didn't find what you're looking for?
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  )
}
