import { useEffect, useRef, useState } from 'react';
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
  const neighborhoodsScrollRef = useRef(null);
  const [scrollThumb, setScrollThumb] = useState({ height: 0, top: 0, visible: false });

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

  useEffect(() => {
    const element = neighborhoodsScrollRef.current;

    if (!element) {
      return undefined;
    }

    const updateScrollThumb = () => {
      const { scrollHeight, clientHeight, scrollTop } = element;
      const hasOverflow = scrollHeight > clientHeight;

      if (!hasOverflow) {
        setScrollThumb({ height: 0, top: 0, visible: false });
        return;
      }

      const height = Math.max((clientHeight / scrollHeight) * clientHeight, 32);
      const maxTop = clientHeight - height;
      const top = maxTop * (scrollTop / (scrollHeight - clientHeight));

      setScrollThumb({ height, top, visible: true });
    };

    updateScrollThumb();
    element.addEventListener('scroll', updateScrollThumb);

    const resizeObserver = new ResizeObserver(updateScrollThumb);
    resizeObserver.observe(element);

    return () => {
      element.removeEventListener('scroll', updateScrollThumb);
      resizeObserver.disconnect();
    };
  }, []);

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
        <Box sx={{ position: 'relative' }}>
          <Box
            ref={neighborhoodsScrollRef}
            sx={{
              maxHeight: 200,
              overflowY: 'auto',
              pr: 2.25,
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
            }}
          >
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
          {scrollThumb.visible && (
            <Box
              aria-hidden="true"
              sx={{
                position: 'absolute',
                top: 0,
                right: 2,
                width: 8,
                height: 200,
                borderRadius: 999,
                backgroundColor: '#f4e8e6',
                pointerEvents: 'none',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: scrollThumb.top,
                  left: 0,
                  width: '100%',
                  height: scrollThumb.height,
                  borderRadius: 999,
                  backgroundColor: '#b17c77',
                }}
              />
            </Box>
          )}
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
