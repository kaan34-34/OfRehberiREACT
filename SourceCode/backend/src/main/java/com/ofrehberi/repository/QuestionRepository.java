package com.ofrehberi.repository;

import com.ofrehberi.entity.Question;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, Long> {
  List<Question> findByBusinessIdOrderByAskedAtDesc(String businessId);
  List<Question> findByAnswerTextIsNullOrderByAskedAtAsc();
  void deleteByBusinessId(String businessId);
}
