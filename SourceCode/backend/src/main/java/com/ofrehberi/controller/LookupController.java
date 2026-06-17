package com.ofrehberi.controller;

import com.ofrehberi.dto.LookupDto;
import com.ofrehberi.repository.CategoryRepository;
import com.ofrehberi.repository.NeighborhoodRepository;
import com.ofrehberi.repository.SubCategoryRepository;
import java.util.List;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class LookupController {
  private final CategoryRepository categoryRepository;
  private final SubCategoryRepository subCategoryRepository;
  private final NeighborhoodRepository neighborhoodRepository;

  public LookupController(
      CategoryRepository categoryRepository,
      SubCategoryRepository subCategoryRepository,
      NeighborhoodRepository neighborhoodRepository
  ) {
    this.categoryRepository = categoryRepository;
    this.subCategoryRepository = subCategoryRepository;
    this.neighborhoodRepository = neighborhoodRepository;
  }

  @GetMapping("/categories")
  @Transactional(readOnly = true)
  public List<LookupDto> categories() {
    return categoryRepository.findAll().stream()
        .map(category -> new LookupDto(category.getId(), category.getName(), null, category.getColor(), category.getIcon()))
        .toList();
  }

  @GetMapping("/sub-categories")
  @Transactional(readOnly = true)
  public List<LookupDto> subCategories() {
    return subCategoryRepository.findAll().stream()
        .map(subCategory -> new LookupDto(
            subCategory.getId(),
            subCategory.getName(),
            subCategory.getCategory() == null ? null : subCategory.getCategory().getId(),
            null,
            null
        ))
        .toList();
  }

  @GetMapping("/neighborhoods")
  @Transactional(readOnly = true)
  public List<LookupDto> neighborhoods() {
    return neighborhoodRepository.findAll().stream()
        .map(neighborhood -> new LookupDto(neighborhood.getId(), neighborhood.getName(), null, null, null))
        .toList();
  }
}
