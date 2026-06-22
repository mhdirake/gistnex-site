import { Box, Container, Divider, Typography } from '@mui/material';

export const metadata = {
  title: 'Terms of Service',
  description: 'Terms governing your use of GistNex.',
};

const sections = [
  {
    title: 'Acceptance of Terms',
    body: `By accessing or using GistNex, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not access the site.`,
  },
  {
    title: 'Use of Content',
    body: `All content published on GistNex — including articles, summaries, and editorial commentary — is the property of GistNex. You may share links to our content freely. You may not reproduce, republish, or redistribute our content in bulk without explicit written permission.`,
  },
  {
    title: 'Newsletter Subscription',
    body: `By subscribing to the GistNex newsletter, you consent to receiving periodic email communications from us. Each email includes an unsubscribe link. We will honor all unsubscribe requests promptly, within 10 business days at most.`,
  },
  {
    title: 'External Links',
    body: `GistNex content may link to external websites and resources. These links are provided for informational purposes. We do not endorse, control, or take responsibility for the content or practices of linked sites.`,
  },
  {
    title: 'Disclaimer of Warranties',
    body: `GistNex is provided on an "as is" basis without warranties of any kind. We do not guarantee that the site will be available at all times, error-free, or that the content is complete or up to date. Tech information evolves rapidly — always verify critical information from official sources.`,
  },
  {
    title: 'Limitation of Liability',
    body: `GistNex and its operators shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of the site or reliance on its content.`,
  },
  {
    title: 'Changes to Terms',
    body: `We reserve the right to update these Terms at any time. Changes take effect upon posting to this page. Continued use of the site constitutes acceptance of the revised Terms.`,
  },
  {
    title: 'Contact',
    body: `Questions about these Terms? Contact us via our Telegram channel @gistnex.`,
  },
];

export default function TermsPage() {
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
            Terms of Service
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.disabled' }}>
            Effective date: June 2026
          </Typography>
        </Box>

        <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 6 }}>
          These Terms govern your access to and use of GistNex. Please read them carefully.
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
