import { Box, Container, Divider, Typography } from '@mui/material';

export const metadata = {
  title: 'Privacy Policy',
  description: 'How GistNex collects, uses, and protects your information.',
};

const sections = [
  {
    title: 'Information We Collect',
    body: `When you subscribe to our newsletter, we collect your email address. We do not require you to create an account to browse GistNex content. We may collect anonymized usage data (page views, referrer) via standard web analytics to understand how our content performs. We do not collect or store any personally identifiable information beyond your email address if you opt in.`,
  },
  {
    title: 'How We Use Your Information',
    body: `Your email address is used exclusively to send the GistNex newsletter — curated tech content delivered periodically. We do not sell, rent, or share your email with third parties. You can unsubscribe at any time via the link included in every newsletter email.`,
  },
  {
    title: 'Cookies',
    body: `GistNex uses minimal, functional cookies only — no advertising or tracking cookies. We may use a session cookie to preserve your preferences. No third-party advertising networks are used on this site.`,
  },
  {
    title: 'Third-Party Services',
    body: `Content on GistNex may include links to external websites. We are not responsible for the privacy practices of those sites. Our Telegram channel (@gistnex) is subject to Telegram's own privacy policy.`,
  },
  {
    title: 'Data Retention',
    body: `Newsletter subscriber emails are retained until you unsubscribe. Anonymized analytics data may be retained for up to 12 months. You may request deletion of your data at any time by contacting us.`,
  },
  {
    title: 'Your Rights',
    body: `You have the right to access, correct, or delete any personal data we hold about you. To exercise these rights, contact us at the email address below. We will respond within 30 days.`,
  },
  {
    title: 'Changes to This Policy',
    body: `We may update this policy from time to time. Changes will be posted on this page with an updated effective date. Continued use of the site after changes constitutes acceptance of the updated policy.`,
  },
  {
    title: 'Contact',
    body: `Questions about this Privacy Policy? Reach us via our Telegram channel @gistnex or through the contact information listed on the About page.`,
  },
];

export default function PrivacyPage() {
  return (
    <Box sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="md">
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="overline"
            sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: '0.12em', fontSize: '0.72rem', display: 'block', mb: 2 }}
          >
            Legal
          </Typography>
          <Typography variant="h4" fontWeight={800} sx={{ letterSpacing: '-0.03em', color: 'text.primary', mb: 2 }}>
            Privacy Policy
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.disabled' }}>
            Effective date: June 2026
          </Typography>
        </Box>

        <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 6 }}>
          GistNex is a tech content digest. We are committed to being transparent about how we handle data.
          This policy explains what we collect, why, and how you can control it.
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          {sections.map(({ title, body }, i) => (
            <Box key={i}>
              <Typography variant="h6" fontWeight={700} sx={{ color: 'text.primary', letterSpacing: '-0.02em', mb: 1.5 }}>
                {i + 1}. {title}
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                {body}
              </Typography>
              {i < sections.length - 1 && <Divider sx={{ borderColor: 'divider', mt: 5 }} />}
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
