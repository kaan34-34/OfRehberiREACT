import { useState } from 'react';
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Divider,
  Paper,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { neighborhoods } from '../data/mockData';

export default function FilterSidebar({ filters, onFilterChange, onApply }) {
  const handleNeighborhoodToggle = (id) => {
    const current = filters.neighborhoods;
    const updated = current.includes(id)
      ? current.filter((n) => n !== id)
      : [...current, id];
    onFilterChange({ ...filters, neighborhoods: updated });
  };

  const handleOptionChange = (key) => {
    onFilterChange({ ...filters, [key]: !filters[key] });
  };

  return (
    <Paper elevation={1} sx={{ borderRadius: 2, overflow: 'hidden', border: '1px solid #ededed' }}>
      {/* Neighborhoods */}
      <Box sx={{ p: 2 }}>
        <Typography
          variant="subtitle2"
          sx={{ color: '#7f1810', fontWeight: 700, mb: 1, textTransform: 'uppercase' }}
        >
          Mahalleler
        </Typography>
        <Box sx={{ maxHeight: 200, overflowY: 'auto', pr: 1 }}>
          <FormGroup>
            {neighborhoods.map((m) => (
              <FormControlLabel
                key={m.id}
                control={
                  <Checkbox
                    size="small"
                    checked={filters.neighborhoods.includes(m.id)}
                    onChange={() => handleNeighborhoodToggle(m.id)}
                    sx={{
                      color: '#ccc',
                      '&.Mui-checked': { color: '#7f1810' },
                      py: 0.3,
                    }}
                  />
                }
                label={
                  <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                    {m.name}
                  </Typography>
                }
              />
            ))}
          </FormGroup>
        </Box>
      </Box>

      <Divider />

      {/* Options */}
      <Box sx={{ p: 2 }}>
        <Typography
          variant="subtitle2"
          sx={{ color: '#7f1810', fontWeight: 700, mb: 1, textTransform: 'uppercase' }}
        >
          Seçenekler
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={filters.openPlaces}
                onChange={() => handleOptionChange('openPlaces')}
                sx={{ color: '#ccc', '&.Mui-checked': { color: '#7f1810' }, py: 0.3 }}
              />
            }
            label={<Typography variant="body2" sx={{ fontSize: '0.85rem' }}>Açık Yerler</Typography>}
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={filters.closedPlaces}
                onChange={() => handleOptionChange('closedPlaces')}
                sx={{ color: '#ccc', '&.Mui-checked': { color: '#7f1810' }, py: 0.3 }}
              />
            }
            label={<Typography variant="body2" sx={{ fontSize: '0.85rem' }}>Kapalı Yerler</Typography>}
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={filters.delivery}
                onChange={() => handleOptionChange('delivery')}
                sx={{ color: '#ccc', '&.Mui-checked': { color: '#7f1810' }, py: 0.3 }}
              />
            }
            label={<Typography variant="body2" sx={{ fontSize: '0.85rem' }}>Eve Siparişi Olan Yerler</Typography>}
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={filters.acceptsCard}
                onChange={() => handleOptionChange('acceptsCard')}
                sx={{ color: '#ccc', '&.Mui-checked': { color: '#7f1810' }, py: 0.3 }}
              />
            }
            label={<Typography variant="body2" sx={{ fontSize: '0.85rem' }}>Kart Geçen Yerler</Typography>}
          />
        </FormGroup>

        <Divider sx={{ my: 1.5 }} />

        <Button
          variant="contained"
          fullWidth
          startIcon={<FilterListIcon />}
          onClick={onApply}
          sx={{
            backgroundColor: '#7f1810',
            fontWeight: 700,
            '&:hover': { backgroundColor: '#5a110b' },
          }}
        >
          Filtrele
        </Button>
      </Box>
    </Paper>
  );
}
