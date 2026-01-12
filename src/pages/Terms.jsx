import { Link } from 'react-router-dom'

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
        <p className="text-sm text-gray-600 mb-8">Last Updated: January 12, 2026</p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 mb-4">
              By accessing or using Wedding Card Designer ("the Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
            <p className="text-gray-700 mb-4">
              Wedding Card Designer is an online platform that allows users to create, design, and export wedding invitation cards. The Service provides tools including text editing, shapes, images, stickers, and export functionality.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Accounts and Registration</h2>
            <p className="text-gray-700 mb-4">
              Currently, the Service operates without requiring user registration. However, we reserve the right to implement user accounts in the future. If implemented, you agree to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Notify us immediately of any unauthorized access</li>
              <li>Be responsible for all activities under your account</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. User Content and Ownership</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">4.1 Your Content</h3>
            <p className="text-gray-700 mb-4">
              You retain all rights to the designs and content you create using our Service. We do not claim ownership of your wedding card designs, uploaded images, or text content.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">4.2 License to Use</h3>
            <p className="text-gray-700 mb-4">
              By using the Service, you grant us a limited, non-exclusive license to store and process your content solely for the purpose of providing the Service to you.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">4.3 Content Responsibility</h3>
            <p className="text-gray-700 mb-4">
              You are solely responsible for the content you upload and create. You warrant that:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>You own or have rights to use all content you upload</li>
              <li>Your content does not violate any third-party rights</li>
              <li>Your content does not contain illegal or harmful material</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Prohibited Uses</h2>
            <p className="text-gray-700 mb-4">
              You agree not to use the Service to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on intellectual property rights of others</li>
              <li>Upload malicious code or viruses</li>
              <li>Harass, abuse, or harm others</li>
              <li>Create offensive, defamatory, or obscene content</li>
              <li>Attempt to gain unauthorized access to the Service</li>
              <li>Use automated systems to access the Service excessively</li>
              <li>Reverse engineer or copy our features</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Intellectual Property</h2>
            <p className="text-gray-700 mb-4">
              The Service, including its design, features, code, and branding, is protected by copyright, trademark, and other intellectual property laws. You may not:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Copy, modify, or distribute our code or design</li>
              <li>Use our trademarks without permission</li>
              <li>Create derivative works based on our Service</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Disclaimer of Warranties</h2>
            <p className="text-gray-700 mb-4">
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Merchantability</li>
              <li>Fitness for a particular purpose</li>
              <li>Non-infringement</li>
              <li>Uninterrupted or error-free operation</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Limitation of Liability</h2>
            <p className="text-gray-700 mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Indirect, incidental, special, or consequential damages</li>
              <li>Loss of data, designs, or content</li>
              <li>Loss of profits or business opportunities</li>
              <li>Service interruptions or errors</li>
            </ul>
            <p className="text-gray-700 mb-4">
              We recommend regularly backing up your designs by exporting them.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Indemnification</h2>
            <p className="text-gray-700 mb-4">
              You agree to indemnify and hold harmless Wedding Card Designer and its affiliates from any claims, damages, or expenses arising from:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Your use of the Service</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any third-party rights</li>
              <li>Your uploaded content</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Service Modifications and Termination</h2>
            <p className="text-gray-700 mb-4">
              We reserve the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Modify or discontinue the Service at any time</li>
              <li>Change features, pricing, or availability</li>
              <li>Suspend or terminate access for violations of these Terms</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Privacy</h2>
            <p className="text-gray-700 mb-4">
              Your use of the Service is also governed by our <Link to="/privacy" className="text-violet-600 hover:underline">Privacy Policy</Link>. Please review it to understand our data practices.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Export Functionality</h2>
            <p className="text-gray-700 mb-4">
              The Service allows you to export your designs in various formats (PNG, JPEG, PDF). You are responsible for:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Ensuring exported content meets your quality requirements</li>
              <li>Verifying that exported designs render correctly</li>
              <li>Complying with print service requirements if applicable</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Dispute Resolution</h2>
            <p className="text-gray-700 mb-4">
              Any disputes arising from these Terms or your use of the Service shall be resolved through:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Good faith negotiation first</li>
              <li>Binding arbitration if negotiation fails</li>
              <li>Governing law of [Your Jurisdiction]</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Changes to Terms</h2>
            <p className="text-gray-700 mb-4">
              We may update these Terms from time to time. Continued use of the Service after changes constitutes acceptance of the updated Terms. We will notify users of material changes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">15. Severability</h2>
            <p className="text-gray-700 mb-4">
              If any provision of these Terms is found to be unenforceable, the remaining provisions shall remain in full effect.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">16. Contact Information</h2>
            <p className="text-gray-700 mb-4">
              For questions about these Terms, please contact us at:
            </p>
            <p className="text-gray-700 mb-4">
              Email: legal@wedding-card-designer.com<br />
              Website: <Link to="/contact" className="text-violet-600 hover:underline">Contact Page</Link>
            </p>
          </section>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link 
              to="/" 
              className="inline-flex items-center text-violet-600 hover:text-violet-700 font-medium"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
