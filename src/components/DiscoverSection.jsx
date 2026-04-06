import { Box, Typography, Container, Chip } from '@mui/material';
import { discoverTags } from '../data/mockData';

export default function DiscoverSection({ onTagClick }) {
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
