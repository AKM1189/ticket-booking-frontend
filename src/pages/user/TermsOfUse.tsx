import { Container, Title, Text, Stack, List, Divider } from "@mantine/core";

const TermsOfUse = () => {
  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <div>
          <Title order={1} mb="md" className="text-accent">
            Terms of Use
          </Title>
          <Text size="sm" c="dimmed">
            Last updated: January 1, 2025
          </Text>
        </div>

        <Divider />

        <Stack gap="lg">
          <div>
            <Title order={2} size="h3" mb="sm">
              1. Acceptance of Terms
            </Title>
            <Text>
              By accessing and using Movie Palace, you accept and agree to be bound by the terms and provision of this agreement. 
              If you do not agree to abide by the above, please do not use this service.
            </Text>
          </div>

          <div>
            <Title order={2} size="h3" mb="sm">
              2. Use License
            </Title>
            <Text mb="sm">
              Permission is granted to temporarily download one copy of Movie Palace materials for personal, 
              non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </Text>
            <List>
              <List.Item>modify or copy the materials</List.Item>
              <List.Item>use the materials for any commercial purpose or for any public display</List.Item>
              <List.Item>attempt to reverse engineer any software contained on the website</List.Item>
              <List.Item>remove any copyright or other proprietary notations from the materials</List.Item>
            </List>
          </div>

          <div>
            <Title order={2} size="h3" mb="sm">
              3. Ticket Booking and Cancellation
            </Title>
            <Text mb="sm">
              When booking tickets through Movie Palace:
            </Text>
            <List>
              <List.Item>All bookings are subject to availability</List.Item>
              <List.Item>Tickets can be cancelled up to 2 hours before showtime</List.Item>
              <List.Item>Refunds will be processed within 5-7 business days</List.Item>
              <List.Item>No-show tickets are non-refundable</List.Item>
            </List>
          </div>

          <div>
            <Title order={2} size="h3" mb="sm">
              4. User Account
            </Title>
            <Text>
              You are responsible for safeguarding the password and for maintaining the confidentiality of your account. 
              You agree not to disclose your password to any third party and to take sole responsibility for activities 
              that occur under your account.
            </Text>
          </div>

          <div>
            <Title order={2} size="h3" mb="sm">
              5. Prohibited Uses
            </Title>
            <Text mb="sm">
              You may not use our service:
            </Text>
            <List>
              <List.Item>For any unlawful purpose or to solicit others to perform unlawful acts</List.Item>
              <List.Item>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</List.Item>
              <List.Item>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</List.Item>
              <List.Item>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</List.Item>
            </List>
          </div>

          <div>
            <Title order={2} size="h3" mb="sm">
              6. Disclaimer
            </Title>
            <Text>
              The information on this website is provided on an "as is" basis. To the fullest extent permitted by law, 
              this Company excludes all representations, warranties, conditions and terms whether express or implied, 
              statutory or otherwise.
            </Text>
          </div>

          <div>
            <Title order={2} size="h3" mb="sm">
              7. Limitations
            </Title>
            <Text>
              In no event shall Movie Palace or its suppliers be liable for any damages (including, without limitation, 
              damages for loss of data or profit, or due to business interruption) arising out of the use or inability 
              to use the materials on Movie Palace's website.
            </Text>
          </div>

          <div>
            <Title order={2} size="h3" mb="sm">
              8. Revisions and Errata
            </Title>
            <Text>
              The materials appearing on Movie Palace's website could include technical, typographical, or photographic errors. 
              Movie Palace does not warrant that any of the materials on its website are accurate, complete, or current.
            </Text>
          </div>

          <div>
            <Title order={2} size="h3" mb="sm">
              9. Contact Information
            </Title>
            <Text>
              If you have any questions about these Terms of Use, please contact us at:
              <br />
              Email: legal@moviepalace.com
              <br />
              Phone: +1 (555) 123-4567
            </Text>
          </div>
        </Stack>
      </Stack>
    </Container>
  );
};

export default TermsOfUse;