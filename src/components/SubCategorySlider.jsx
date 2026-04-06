import { Box, Chip, Typography } from '@mui/material';
import { subCategories } from '../data/mockData';

export default function SubCategorySlider({ categoryId, selectedSub, onSubSelect }) {
  const subs = subCategories[categoryId];
  if (!subs || subs.length === 0) return null;

  return (
    <Box sx={{ mb: 2 }}>
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          overflowX: 'auto',
          pb: 1,
          px: 0.5,
          '&::-webkit-scrollbar': { height: 4 },
          '&::-webkit-scrollbar-thumb': { backgroundColor: '#ccc', borderRadius: 2 },
        }}
      >
        <Chip
          label="Tümü"
          variant={!selectedSub ? 'filled' : 'outlined'}
          onClick={() => onSubSelect(null)}
          sx={{
            fontWeight: 600,
            backgroundColor: !selectedSub ? '#2d3e50' : 'transparent',
            color: !selectedSub ? '#fff' : '#2d3e50',
            borderColor: '#2d3e50',
            '&:hover': { backgroundColor: !selectedSub ? '#2d3e50' : 'rgba(45,62,80,0.1)' },
          }}
        />
        {subs.map((sub) => (
          <Chip
            key={sub.id}
            label={sub.name}
            variant={selectedSub === sub.id ? 'filled' : 'outlined'}
            onClick={() => onSubSelect(sub.id)}
            sx={{
              fontWeight: 600,
              backgroundColor: selectedSub === sub.id ? '#2d3e50' : 'transparent',
              color: selectedSub === sub.id ? '#fff' : '#2d3e50',
              borderColor: '#2d3e50',
              '&:hover': { backgroundColor: selectedSub === sub.id ? '#2d3e50' : 'rgba(45,62,80,0.1)' },
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
