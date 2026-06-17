import { Box, Typography, Container, Chip } from '@mui/material';

export default function DiscoverSection({ categories = [], onTagClick }) {
  const discoverTags = categories.slice(0, 8).map((category) => ({
    label: category.name,
    categoryId: category.id,
  }));
  return (
    <Box sx={{ py: 4, backgroundColor: '#f5f5f5' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: '#333',
            mb: 3,
            textAlign: 'center',
          }}
        >
          Daha fazlasını keşfedin
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1 }}>
          {discoverTags.map((tag, idx) => (
            <Chip
              key={idx}
              label={tag.label}
              clickable
              onClick={() => onTagClick?.(tag.categoryId)}
              sx={{
                borderRadius: 25,
                px: 1,
                fontWeight: 600,
                backgroundColor: '#fff',
                border: '1px solid #ddd',
                color: '#555',
                '&:hover': {
                  backgroundColor: '#7f1810',
                  color: '#fff',
                  borderColor: '#7f1810',
                },
              }}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
