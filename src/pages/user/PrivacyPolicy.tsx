import { Container, Title, Text, Stack, List, Divider } from "@mantine/core";

const PrivacyPolicy = () => {
  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <div>
          <Title order={1} mb="md" className="text-accent">
            Privacy Policy
          </Title>
          <Text size="sm" c="dimmed">
            Last updated: January 1, 2025
          </Text>
        </div>

        <Divider />

        <Stack gap="lg">
          <div>
            <Title order={2} size="h3" mb="sm">
              1. Information We Collect
            </Title>
            <Text mb="sm">
              We collect information you provide directly to us, such as when you:
            </Text>
            <List>
              <List.Item>Create an account or update your profile</List.Item>
              <List.Item>Book tickets or make purchases</List.Item>
              <List.Item>Contact us for customer support</List.Item>
              <List.Item>Subscribe to our newsletter</List.Item>
              <List.Item>Participate in surveys or promotions</List.Item>
            </List>
          </div>

          <div>
            <Title order={2} size="h3" mb="sm">
              2. Types of Information
            </Title>
            <Text mb="sm">
              The types of information we may collect include:
            </Text>
            <List>
              <List.Item><strong>Personal Information:</strong> Name, email address, phone number, date of birth</List.Item>
              <List.Item><strong>Payment Information:</strong> Credit card details, billing address (processed securely)</List.Item>
              <List.Item><strong>Usage Information:</strong> Pages visited, time spent on site, click patterns</List.Item>
              <List.Item><strong>Device Information:</strong> IP address, browser type, operating system</List.Item>
            </List>
          </div>

          <div>
            <Title order={2} size="h3" mb="sm">
              3. How We Use Your Information
            </Title>
            <Text mb="sm">
              We use the information we collect to:
            </Text>
            <List>
              <List.Item>Process your ticket bookings and payments</List.Item>
              <List.Item>Send you booking confirmations and updates</List.Item>
              <List.Item>Provide customer support and respond to inquiries</List.Item>
              <List.Item>Send promotional emails and newsletters (with your consent)</List.Item>
              <List.Item>Improve our website and services</List.Item>
              <List.Item>Prevent fraud and ensure security</List.Item>
            </List>
          </div>

          <div>
            <Title order={2} size="h3" mb="sm">
              4. Information Sharing
            </Title>
            <Text mb="sm">
              We do not sell, trade, or otherwise transfer your personal information to third parties except:
            </Text>
            <List>
              <List.Item>With your explicit consent</List.Item>
              <List.Item>To trusted service providers who assist in operating our website</List.Item>
              <List.Item>When required by law or to protect our rights</List.Item>
              <List.Item>In connection with a business transfer or merger</List.Item>
            </List>
          </div>

          <div>
            <Title order={2} size="h3" mb="sm">
              5. Data Security
            </Title>
            <Text>
              We implement appropriate security measures to protect your personal information against unauthorized access, 
              alteration, disclosure, or destruction. This includes SSL encryption for data transmission and secure storage 
              of sensitive information.
            </Text>
          </div>

          <div>
            <Title order={2} size="h3" mb="sm">
              6. Cookies and Tracking
            </Title>
            <Text mb="sm">
              We use cookies and similar tracking technologies to:
            </Text>
            <List>
              <List.Item>Remember your preferences and settings</List.Item>
              <List.Item>Analyze website traffic and usage patterns</List.Item>
              <List.Item>Provide personalized content and advertisements</List.Item>
              <List.Item>Improve website functionality and user experience</List.Item>
            </List>
            <Text mt="sm">
              You can control cookie settings through your browser preferences.
            </Text>
          </div>

          <div>
            <Title order={2} size="h3" mb="sm">
              7. Your Rights
            </Title>
            <Text mb="sm">
              You have the right to:
            </Text>
            <List>
              <List.Item>Access and update your personal information</List.Item>
              <List.Item>Request deletion of your account and data</List.Item>
              <List.Item>Opt-out of marketing communications</List.Item>
              <List.Item>Request a copy of your data</List.Item>
              <List.Item>Lodge a complaint with data protection authorities</List.Item>
            </List>
          </div>

          <div>
            <Title order={2} size="h3" mb="sm">
              8. Data Retention
            </Title>
            <Text>
              We retain your personal information for as long as necessary to provide our services and comply with legal obligations. 
              Account information is typically retained for 3 years after account closure, while transaction records may be 
              kept longer for legal and accounting purposes.
            </Text>
          </div>

          <div>
            <Title order={2} size="h3" mb="sm">
              9. Children's Privacy
            </Title>
            <Text>
              Our service is not intended for children under 13 years of age. We do not knowingly collect personal information 
              from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, 
              please contact us immediately.
            </Text>
          </div>

          <div>
            <Title order={2} size="h3" mb="sm">
              10. Changes to This Policy
            </Title>
            <Text>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new 
              Privacy Policy on this page and updating the "Last updated" date.
            </Text>
          </div>

          <div>
            <Title order={2} size="h3" mb="sm">
              11. Contact Us
            </Title>
            <Text>
              If you have any questions about this Privacy Policy, please contact us at:
              <br />
              Email: privacy@moviepalace.com
              <br />
              Phone: +1 (555) 123-4567
              <br />
              Address: 123 Cinema Street, Movie City, MC 12345
            </Text>
          </div>
        </Stack>
      </Stack>
    </Container>
  );
};

export default PrivacyPolicy;