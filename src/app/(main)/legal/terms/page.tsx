import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto">
        <Card>
            <CardHeader>
                <CardTitle>Terms of Service</CardTitle>
                <CardDescription>Version 2.0 | Last Updated: July 19, 2025</CardDescription>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <h2>1. ACCEPTANCE OF TERMS</h2>
                <p>By accessing Connect Hub, you agree to these Terms of Service and our Privacy Policy.</p>

                <h2>2. DESCRIPTION OF SERVICE</h2>
                <p>Connect Hub is an AI-powered spiritual transformation platform that provides:</p>
                <ul>
                    <li>Spiritual content sharing and classification</li>
                    <li>Prayer matching and discipleship connections</li>
                    <li>Cultural adaptation for global audiences</li>
                    <li>Community engagement and growth tracking</li>
                </ul>

                <h2>3. USER RESPONSIBILITIES</h2>
                <h3>Content Standards:</h3>
                <ul>
                    <li>Share authentic spiritual experiences</li>
                    <li>Respect cultural and denominational diversity</li>
                    <li>No hate speech, harassment, or discrimination</li>
                    <li>Accurate information in profiles and requests</li>
                </ul>

                <h3>AI Interaction:</h3>
                <ul>
                    <li>Understand that AI classifies and matches content</li>
                    <li>Provide feedback to improve AI accuracy</li>
                    <li>Respect AI-generated recommendations as suggestions only</li>
                </ul>
                
                <h3>Global Community:</h3>
                <ul>
                    <li>Respect cultural differences across regions</li>
                    <li>Use appropriate language for diverse audiences</li>
                    <li>Support the "fishing net" inclusive approach</li>
                </ul>

                <h2>4. PROHIBITED CONDUCT</h2>
                <h3>Strictly Forbidden:</h3>
                <ul>
                    <li>Harassment, bullying, or discrimination</li>
                    <li>False or misleading spiritual claims</li>
                    <li>Commercial exploitation of spiritual content</li>
                    <li>Circumventing AI safety measures</li>
                    <li>Sharing inappropriate content for minors</li>
                </ul>

                <h3>AI-Specific Prohibitions:</h3>
                <ul>
                    <li>Attempting to manipulate AI classifications</li>
                    <li>Using the platform to train competing AI systems</li>
                    <li>Reverse engineering AI algorithms</li>
                </ul>

                <h2>5. INTELLECTUAL PROPERTY</h2>
                <h3>Your Content:</h3>
                <ul>
                    <li>You retain ownership of content you share.</li>
                    <li>You grant us a license to use content for platform functionality, including allowing our AI to analyze content to improve services.</li>
                </ul>
                <h3>Our Technology:</h3>
                <ul>
                    <li>Our AI algorithms, spiritual classification systems, platform design, and cultural adaptation systems are proprietary and protected intellectual property.</li>
                </ul>

                <h2>6. AI DISCLAIMERS</h2>
                <h3>AI Limitations:</h3>
                <ul>
                    <li>AI classifications are suggestions, not spiritual authority.</li>
                    <li>Prayer matching is algorithmic, not divine guidance.</li>
                    <li>Cultural adaptations may not be perfect.</li>
                    <li>AI cannot replace human spiritual discernment.</li>
                </ul>
                 <h3>No Guarantee:</h3>
                <ul>
                    <li>AI accuracy is not guaranteed.</li>
                    <li>Spiritual guidance is supplemental to human wisdom.</li>
                    <li>Cultural sensitivity is best-effort, not perfect.</li>
                </ul>

                <h2>7. REGIONAL TERMS</h2>
                <h3>Global South Provisions:</h3>
                 <ul>
                    <li>Local laws take precedence where applicable.</li>
                    <li>Payment terms vary by region.</li>
                    <li>Cultural adaptation respects local contexts.</li>
                    <li>Regional data processing follows local regulations.</li>
                </ul>


                <h2>8. LIMITATION OF LIABILITY</h2>
                 <h3>Platform Limitations:</h3>
                 <ul>
                    <li>We provide the platform "as is".</li>
                    <li>No guarantee of spiritual outcomes.</li>
                    <li>AI recommendations are not professional advice.</li>
                    <li>Technical issues may occur.</li>
                </ul>
                
                <h3>Spiritual Disclaimer:</h3>
                 <ul>
                    <li>The platform supplements, not replaces, spiritual communities.</li>
                    <li>Prayer matching is algorithmic, not supernatural.</li>
                    <li>Spiritual growth tracking is for encouragement only.</li>
                    <li>Professional counseling is recommended for serious issues.</li>
                </ul>

                <h2>9. TERMINATION</h2>
                 <h3>We May Terminate for:</h3>
                 <ul>
                    <li>Violation of these terms</li>
                    <li>Abuse of AI systems</li>
                    <li>Community safety reasons</li>
                    <li>Legal compliance</li>
                </ul>
                 <h3>You May Terminate:</h3>
                 <ul>
                    <li>You may delete your account at any time.</li>
                    <li>Data will be removed according to our Privacy Policy.</li>
                    <li>Some aggregated, anonymous data may be retained.</li>
                </ul>

                <h2>10. GOVERNING LAW</h2>
                <p>Terms are governed by the laws of the jurisdiction where the user resides. Disputes will be resolved through arbitration where legally required.</p>

                <h2>11. CHANGES TO TERMS</h2>
                <p>We will notify you of major changes 30 days in advance via in-app notification and/or email. Continued use constitutes acceptance.</p>

                <h2>12. CONTACT INFORMATION</h2>
                <p>
                    <strong>General Terms Questions:</strong> legal@connecthub.app<br/>
                    <strong>AI-Specific Terms:</strong> ai-terms@connecthub.app<br/>
                    <strong>Regional Legal Questions:</strong> regional-legal@connecthub.app
                </p>
            </CardContent>
        </Card>
    </div>
  );
}
