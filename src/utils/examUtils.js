// Examination helper functions for filtering and random selection

/**
 * Filter questions based on criteria
 */
export const filterQuestions = (questionsList, certification, difficulty, conceptName) => {
  if (!questionsList) return [];
  
  return questionsList.filter(q => {
    // Filter by certification
    if (certification && q.certification !== certification) {
      return false;
    }
    // Filter by difficulty (Mixed includes everything)
    if (difficulty && difficulty !== 'Mixed' && q.difficulty !== difficulty) {
      return false;
    }
    // Filter by concept
    if (conceptName && conceptName !== 'All' && q.concept !== conceptName) {
      return false;
    }
    return true;
  });
};

/**
 * Randomly select a specific number of questions from an array
 */
export const getRandomQuestions = (questionsList, count) => {
  if (!questionsList || questionsList.length === 0) return [];
  const shuffled = [...questionsList].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

/**
 * Extract unique certification names from questions data
 */
export const getUniqueCertifications = (questionsList, conceptsList) => {
  const certsFromQuestions = (questionsList || []).map(q => q.certification);
  const certsFromConcepts = (conceptsList || []).map(c => c.certification);
  const allCerts = [...certsFromQuestions, ...certsFromConcepts];
  return [...new Set(allCerts)].filter(Boolean).sort();
};

/**
 * Get all concepts belonging to a specific certification
 */
export const getConceptsForCertification = (conceptsList, certification) => {
  if (!conceptsList || !certification) return [];
  return conceptsList.filter(c => c.certification === certification);
};

/**
 * Get unique concepts present in the questions for a specific certification
 */
export const getUniqueConceptsFromQuestions = (questionsList, certification) => {
  if (!questionsList) return [];
  const filtered = certification 
    ? questionsList.filter(q => q.certification === certification)
    : questionsList;
  const concepts = filtered.map(q => q.concept);
  return [...new Set(concepts)].filter(Boolean).sort();
};
