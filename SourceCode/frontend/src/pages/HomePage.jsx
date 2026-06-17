import { useState, useCallback, useRef, useEffect } from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Collapse,
  Container,
  Drawer,
  Fab,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import CategoryGrid from '../components/CategoryGrid';
import SubCategorySlider from '../components/SubCategorySlider';
import BusinessCard from '../components/BusinessCard';
import FilterSidebar from '../components/FilterSidebar';
import FeaturedSection from '../components/FeaturedSection';
import DiscoverSection from '../components/DiscoverSection';
import { getHomeData } from '../api/businessService';
import { isBusinessOpen } from '../utils/businessUtils';

const createDefaultFilters = (neighborhoods = []) => ({
  neighborhoods: neighborhoods.map((n) => n.id),
  openPlaces: true,
  closedPlaces: false,
  delivery: false,
  acceptsCard: false,
});

export default function HomePage() {
  const [businesses, setBusinesses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [filters, setFilters] = useState(createDefaultFilters());
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const resultsRef = useRef(null);

  useEffect(() => {
    let active = true;
    getHomeData()
      .then((data) => {
        if (!active) return;
        setBusinesses(data.businesses);
        setCategories(data.categories);
        setSubCategories(data.subCategories);
        setNeighborhoods(data.neighborhoods);
        setFilters(createDefaultFilters(data.neighborhoods));
      })
      .catch(() => {
        if (active) setError('Veriler backend API üzerinden alınamadı.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const handleCategorySelect = useCallback((catId) => {
    setSelectedCategory((prev) => (prev === catId ? null : catId));
    setSelectedSubCategory(null);
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSelectedCategory(null);
      setSelectedSubCategory(null);
    }
  };

  const getFilteredBusinesses = () => {
    let filtered = [...businesses];

    if (selectedCategory) {
      filtered = filtered.filter((b) => b.categoryId === selectedCategory);
    }

    if (selectedSubCategory) {
      filtered = filtered.filter((b) => b.subCategoryId === selectedSubCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = businesses.filter(
        (b) =>
          b.name.toLowerCase().includes(q) ||
          b.slogan?.toLowerCase().includes(q) ||
          b.subCategoryName?.toLowerCase().includes(q)
      );
    }

    filtered = filtered.filter((b) => filters.neighborhoods.includes(b.neighborhoodId));

    if (filters.openPlaces && !filters.closedPlaces) {
      filtered = filtered.filter((b) => isBusinessOpen(b));
    } else if (filters.closedPlaces && !filters.openPlaces) {
      filtered = filtered.filter((b) => !isBusinessOpen(b));
    }

    if (filters.delivery) filtered = filtered.filter((b) => b.hasDelivery);
    if (filters.acceptsCard) filtered = filtered.filter((b) => b.acceptsCard);

    return filtered;
  };

  const filteredBusinesses = getFilteredBusinesses();
  const showResults = selectedCategory || searchQuery.trim();
  const selectedCategoryName = categories.find((c) => c.id === selectedCategory)?.name;

  return (
    <Box>
      <Box
        sx={{
          background: 'linear-gradient(135deg,  #7f1810 0%, #458cb9 100%)',
          pb: 4,
          pt: { xs: 3, md: 4 },
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            sx={{
              color: '#fff',
              fontWeight: 700,
              textAlign: 'center',
              mb: 3,
              fontSize: { xs: '1.5rem', md: '2rem' },
              cursor: 'pointer',
            }}
            onClick={() => setShowSearch(true)}
          >
            Ne arıyorsunuz?
          </Typography>

          <CategoryGrid
            categories={categories}
            onCategorySelect={handleCategorySelect}
            selectedCategory={selectedCategory}
          />

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            {!showSearch ? (
              <Button
                onClick={() => setShowSearch(true)}
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.7)',
                  color: '#333',
                  borderRadius: 25,
                  px: 3,
                  py: 0.5,
                  fontSize: '0.8rem',
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.9)' },
                }}
                startIcon={<SearchIcon />}
              >
                Yer adına göre ara
              </Button>
            ) : (
              <Collapse in={showSearch}>
                <Box component="form" onSubmit={handleSearch} sx={{ display: 'flex', maxWidth: 600, mx: 'auto', gap: 1, mt: 1 }}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Firma, ürün, kategori, açıklama arayın"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon sx={{ color: '#999' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: '#fff',
                        borderRadius: 25,
                        '& fieldset': { borderColor: 'transparent' },
                        '&:hover fieldset': { borderColor: '#7f1810' },
                        '&.Mui-focused fieldset': { borderColor: '#7f1810' },
                      },
                    }}
                  />
                  <Button type="submit" variant="contained" sx={{ backgroundColor: '#7f1810', borderRadius: 25, px: 4, fontWeight: 700, '&:hover': { backgroundColor: '#5a110b' } }}>
                    BUL
                  </Button>
                </Box>
              </Collapse>
            )}
          </Box>
        </Container>
      </Box>

      {showResults && (
        <Box ref={resultsRef} sx={{ backgroundColor: '#f0f0f0', py: 3 }}>
          <Container maxWidth="lg">
            {isMobile && (
              <Box sx={{ mb: 2 }}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<FilterListIcon />}
                  onClick={() => setMobileFilterOpen(true)}
                  sx={{ backgroundColor: 'rgba(102,187,106,0.9)', fontWeight: 700, '&:hover': { backgroundColor: 'rgba(102,187,106,1)' } }}
                >
                  Filtre
                </Button>
              </Box>
            )}

            <Grid container spacing={3}>
              {!isMobile && (
                <Grid size={{ xs: 12, md: 3 }}>
                  <FilterSidebar neighborhoods={neighborhoods} filters={filters} onFilterChange={setFilters} onApply={() => {}} />
                </Grid>
              )}

              <Drawer anchor="left" open={mobileFilterOpen} onClose={() => setMobileFilterOpen(false)} PaperProps={{ sx: { width: 280, p: 0 } }}>
                <FilterSidebar neighborhoods={neighborhoods} filters={filters} onFilterChange={setFilters} onApply={() => setMobileFilterOpen(false)} />
              </Drawer>

              <Grid size={{ xs: 12, md: 9 }}>
                {selectedCategory && (
                  <SubCategorySlider
                    categoryId={selectedCategory}
                    subCategories={subCategories}
                    selectedSub={selectedSubCategory}
                    onSubSelect={setSelectedSubCategory}
                  />
                )}

                <Typography variant="body2" sx={{ mb: 2, color: '#666' }}>
                  {selectedCategoryName && <strong style={{ color: '#7f1810' }}>{selectedCategoryName}</strong>}{' '}
                  {searchQuery && (
                    <>
                      arama: <strong style={{ color: '#7f1810' }}>"{searchQuery}"</strong>
                    </>
                  )}{' '}
                  - {filteredBusinesses.length} sonuç bulundu
                </Typography>

                {loading ? (
                  <Box sx={{ textAlign: 'center', py: 5 }}>
                    <CircularProgress />
                  </Box>
                ) : error ? (
                  <Alert severity="error">{error}</Alert>
                ) : filteredBusinesses.length === 0 ? (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="h6" sx={{ color: '#666' }}>
                      Arama filtrenize göre <strong>açık</strong> olan bir yer bulamadık.
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#999', mt: 1 }}>
                      Filtrenizdeki değerleri değiştirip tekrar arama yapabilirsiniz.
                    </Typography>
                  </Box>
                ) : (
                  <Grid container spacing={2}>
                    {filteredBusinesses.map((biz) => (
                      <Grid key={biz.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                        <BusinessCard business={biz} />
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Container>
        </Box>
      )}

      {!showResults && (
        <>
          {loading ? (
            <Box sx={{ textAlign: 'center', py: 5 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Container maxWidth="lg" sx={{ py: 3 }}>
              <Alert severity="error">{error}</Alert>
            </Container>
          ) : (
            <>
              <FeaturedSection businesses={businesses} />
              <DiscoverSection categories={categories} onTagClick={handleCategorySelect} />
            </>
          )}
        </>
      )}
    </Box>
  );
}
