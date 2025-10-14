import { Container, Title, Accordion, Stack, Divider, Text } from "@mantine/core";

const FAQ = () => {
  const faqData = [
    {
      question: "How do I book tickets online?",
      answer: "To book tickets, simply browse our movie listings, select your preferred showtime, choose your seats, and complete the payment process. You can print or download your e-tickets."
    },
    {
      question: "Can I cancel or modify my booking?",
      answer: "Yes, you can cancel your booking up to 2 hours before the showtime. Modifications depend on seat availability. Refunds are processed within 5-7 business days."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), debit cards, PayPal, and digital wallets like Apple Pay and Google Pay."
    },
    {
      question: "Do I need to print my tickets?",
      answer: "No, you can show your e-tickets on your mobile device at the theater. However, you can also print them at home if you prefer physical tickets."
    },
    {
      question: "What is your refund policy?",
      answer: "Full refunds are available for cancellations made at least 2 hours before showtime. No-show tickets are non-refundable. Processing takes 5-7 business days."
    },
    {
      question: "Can I choose my seats?",
      answer: "Yes, our interactive seat map allows you to select your preferred seats. Premium seats and accessibility options are clearly marked."
    },
    {
      question: "What if I arrive late to the movie?",
      answer: "Late entry policies vary by theater. Generally, entry may be restricted during the first 15-20 minutes. We recommend arriving at least 15 minutes before showtime."
    },
    {
      question: "Are there age restrictions for movies?",
      answer: "Yes, movies are rated according to industry standards (G, PG, PG-13, R, NC-17). Age verification may be required for restricted films."
    },
    {
      question: "Can I bring outside food and drinks?",
      answer: "Outside food and beverages are generally not permitted. However, policies may vary by location. Please check with your specific theater."
    },
    {
      question: "Do you have accessibility accommodations?",
      answer: "Yes, we provide wheelchair accessible seating, assistive listening devices, and closed captioning options. Please specify your needs when booking."
    },
    {
      question: "How early should I arrive at the theater?",
      answer: "We recommend arriving 30 minutes before showtime to allow time for parking, concessions, and finding your seats, especially for popular movies."
    },
    {
      question: "What happens if a movie is cancelled?",
      answer: "In the rare event of a cancellation, you'll be notified immediately and offered a full refund or the option to reschedule to another showtime."
    },
    {
      question: "Can I transfer my tickets to someone else?",
      answer: "E-tickets can be forwarded to others via email. However, the original purchaser remains responsible for the booking and any associated policies."
    },
    {
      question: "Do you have a loyalty program?",
      answer: "Yes, our Movie Palace Rewards program offers points for every purchase, exclusive discounts, early access to tickets, and special member events."
    },
    {
      question: "How can I contact customer support?",
      answer: "You can reach our customer support team via email at support@moviepalace.com, phone at +1 (555) 123-4567, or through our live chat feature on the website."
    }
  ];

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <div>
          <Title order={1} mb="md" className="text-accent">
            Frequently Asked Questions
          </Title>
          <Text c="dimmed">
            Find answers to the most common questions about Movie Palace services, booking, and policies.
          </Text>
        </div>

        <Divider />

        <Accordion variant="separated" className="!border-none" radius="md">
          {faqData.map((item, index) => (
            <Accordion.Item key={index} value={`item-${index}`} className="data-[active]:!border-0" bg={"var(--color-surface)"}>
              <Accordion.Control className="!text-text">
                <Text fw={500}>{item.question}</Text>
              </Accordion.Control>
              <Accordion.Panel className="!text-text !rounded-[10px]" bg={"var(--color-surface)"}>
                <Text>{item.answer}</Text>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>

        <div className="mt-8 p-6 bg-surface rounded-lg">
          <Title order={3} size="h4" mb="sm">
            Still have questions?
          </Title>
          <Text mb="md">
            If you couldn't find the answer you're looking for, our customer support team is here to help.
          </Text>
          <Text>
            <strong>Email:</strong> support@moviepalace.com<br />
            <strong>Phone:</strong> +1 (555) 123-4567<br />
            <strong>Hours:</strong> Monday - Sunday, 9:00 AM - 11:00 PM
          </Text>
        </div>
      </Stack>
    </Container>
  );
};

export default FAQ;