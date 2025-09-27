
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Renders the Privacy Policy page.
 *
 * This component displays the full text of the platform's privacy policy,
 * detailing the information collected, how it's used, and the rights of users.
 * It is formatted within a card for readability.
 *
 * @returns {JSX.Element} The privacy policy page component.
 */
export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Privacy Policy</CardTitle>
          <CardDescription>Version 2.0 | Last Updated: July 19, 2025</CardDescription>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          
          <h2>1. INFORMATION WE COLLECT</h2>
          <h3>Personal Information:</h3>
          <ul>
            <li>Name, email address, phone number</li>
            <li>Profile information (spiritual stage, preferences)</li>
            <li>Location data (for regional adaptation)</li>
            <li>Device and usage information</li>
          </ul>

          <h3>AI-Generated Data:</h3>
          <ul>
            <li>Content classifications and spiritual insights</li>
            <li>Prayer matching algorithms results</li>
            <li>Cultural adaptation preferences</li>
            <li>Engagement patterns and spiritual growth metrics</li>
          </ul>

          <h3>Spiritual Content:</h3>
          <ul>
            <li>Testimonies, prayer requests, and spiritual milestones</li>
            <li>Reactions and interactions (praying, believing, encouraging)</li>
            <li>Mentorship connections and discipleship progress</li>
          </ul>

          <h2>2. HOW WE USE YOUR INFORMATION</h2>
          <h3>Core Platform Functions:</h3>
          <ul>
            <li>Provide personalized spiritual content and connections</li>
            <li>Enable prayer matching and discipleship opportunities</li>
            <li>Adapt content for cultural sensitivity and relevance</li>
            <li>Track spiritual growth and provide insights</li>
          </ul>

          <h3>AI Enhancement:</h3>
          <ul>
            <li>Classify and categorize spiritual content</li>
            <li>Recommend relevant connections and resources</li>
            <li>Provide intelligent content curation</li>
            <li>Enable cultural adaptation for Global South markets</li>
          </ul>

          <h3>Legal Basis (GDPR/CCPA Compliance):</h3>
          <ul>
            <li><strong>Consent:</strong> For AI processing and cultural adaptation</li>
            <li><strong>Legitimate Interest:</strong> For platform functionality and security</li>
            <li><strong>Contractual Necessity:</strong> For core app features</li>
          </ul>

          <h2>3. INFORMATION SHARING</h2>
          <p><strong>We DO NOT sell your personal data.</strong></p>
          <p>We MAY share information with:</p>
          <ul>
            <li><strong>AI Service Providers:</strong> For content classification and matching</li>
            <li><strong>Regional Partners:</strong> For local payment and cultural adaptation</li>
            <li><strong>Legal Authorities:</strong> When required by law</li>
          </ul>

          <h3>Data Minimization:</h3>
          <ul>
            <li>We only collect data necessary for platform functionality</li>
            <li>AI processing uses anonymized data where possible</li>
            <li>Cultural data collection is opt-in and transparent</li>
          </ul>

          <h2>4. GLOBAL SOUTH SPECIFIC PROVISIONS</h2>
          <h3>Regional Data Processing:</h3>
          <ul>
            <li>Data may be processed in your region (Nigeria, Kenya, etc.)</li>
            <li>Local data protection laws apply</li>
            <li>Cultural sensitivity is prioritized in data use</li>
          </ul>

          <h3>Payment Data:</h3>
          <ul>
            <li>Local payment methods (M-Pesa, Flutterwave) have separate privacy policies</li>
            <li>We do not store full payment information</li>
            <li>Transaction records are encrypted and protected</li>
          </ul>

          <h2>5. YOUR RIGHTS</h2>
          <h3>All Users:</h3>
          <ul>
            <li>Access your personal data</li>
            <li>Correct inaccurate information</li>
            <li>Delete your account and data</li>
            <li>Export your data</li>
            <li>Opt-out of AI processing</li>
          </ul>

          <h3>EU/UK Users (GDPR):</h3>
          <ul>
            <li>Right to portability</li>
            <li>Right to restrict processing</li>
            <li>Right to object to processing</li>
          </ul>

          <h3>California Users (CCPA):</h3>
          <ul>
            <li>Right to know what data is collected</li>
            <li>Right to delete personal information</li>
            <li>Right to opt-out of sale (we don&apos;t sell data)</li>
          </ul>

          <h2>6. AI TRANSPARENCY & USAGE POLICY</h2>
          <h3>Our AI Systems:</h3>
          <ul>
            <li>Use your content to improve spiritual matching</li>
            <li>Classify content for better user experience</li>
            <li>Adapt culturally for different regions</li>
            <li>Learn from user interactions (anonymized)</li>
          </ul>

          <h3>You Control:</h3>
          <ul>
            <li>Whether AI processes your content</li>
            <li>What data is used for cultural adaptation</li>
            <li>Your spiritual profile and preferences</li>
          </ul>
           <p>For more details, please see our full AI Usage Policy.</p>


          <h2>7. DATA SECURITY</h2>
          <h3>Protection Measures:</h3>
          <ul>
            <li>End-to-end encryption for sensitive content</li>
            <li>Secure Firebase infrastructure</li>
            <li>Regular security audits</li>
            <li>Incident response procedures</li>
          </ul>

          <h3>Data Retention:</h3>
          <ul>
            <li>Personal data: Retained while account is active</li>
            <li>Anonymous analytics: 2 years maximum</li>
            <li>Legal compliance: As required by law</li>
          </ul>

          <h2>8. CHILDREN&apos;S PRIVACY</h2>
          <p>The platform is designed for users 13+ years old. Parental consent is required for users under 16 where applicable by law (e.g., GDPR). We provide enhanced protections for young users.</p>

          <h2>9. CONTACT INFORMATION</h2>
          <p>
            <strong>Data Protection Officer:</strong> privacy@connecthub.app<br/>
            <strong>General Privacy Questions:</strong> support@connecthub.app<br/>
            <strong>EU Representative:</strong> eu-privacy@connecthub.app
          </p>

          <h2>10. CHANGES TO THIS POLICY</h2>
          <p>We will notify you of significant changes via in-app notification and/or email. Your continued use after changes constitutes acceptance.</p>
          <p><em>This policy complies with GDPR, CCPA, Nigerian Data Protection Regulation (NDPR), and Kenyan Data Protection Act.</em></p>
        </CardContent>
      </Card>
    </div>
  );
}
