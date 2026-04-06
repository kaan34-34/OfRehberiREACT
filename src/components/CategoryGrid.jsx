import { Box, Typography, Avatar } from '@mui/material';
import { categories } from '../data/mockData';

export default function CategoryGrid({ onCategorySelect, selectedCategory }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: { xs: 1, sm: 1.5, md: 2 },
        py: 2,
      }}
    >
      {categories.map((cat) => {
        const Icon = cat.icon;
        const isSelected = selectedCategory === cat.id;
        return (
          <Box
            key={cat.id}
            onClick={() => onCategorySelect(cat.id)}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              p: { xs: 1, sm: 1.5 },
              borderRadius: 2,
              transition: 'all 0.25s ease',
              backgroundColor: isSelected ? 'rgba(255,255,255,0.2)' : 'transparent',
              transform: isSelected ? 'scale(1.08)' : 'scale(1)',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.15)',
                transform: 'scale(1.08)',
              },
              width: { xs: 70, sm: 80, md: 85 },
            }}
          >
            <Avatar
              sx={{
                width: { xs: 48, sm: 56, md: 64 },
                height: { xs: 48, sm: 56, md: 64 },
                backgroundColor: isSelected ? '#fff' : 'rgba(255,255,255,0.9)',
                mb: 0.5,
                transition: 'all 0.25s ease',
                boxShadow: isSelected ? '0 4px 12px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.15)',
              }}
            >
              <Icon sx={{ fontSize: { xs: 26, sm: 30, md: 34 }, color: cat.color }} />
            </Avatar>
            <Typography
              variant="caption"
              sx={{
                color: '#fff',
                fontWeight: isSelected ? 700 : 600,
                fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.75rem' },
                textAlign: 'center',
                lineHeight: 1.2,
              }}
            >
              {cat.name}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}
