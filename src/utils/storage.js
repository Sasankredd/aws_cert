// Storage utilities for localStorage persistence

const KEYS = {
  CURRENT_PAGE: 'aws_prep_current_page',
  EXAM_STATE: 'aws_prep_exam_state',
  CONCEPT_READING: 'aws_prep_concept_reading',
};

export const storage = {
  saveCurrentPage(page) {
    localStorage.setItem(KEYS.CURRENT_PAGE, page);
  },

  getCurrentPage() {
    return localStorage.getItem(KEYS.CURRENT_PAGE) || 'HOME';
  },

  saveExamState(state) {
    localStorage.setItem(KEYS.EXAM_STATE, JSON.stringify(state));
  },

  getExamState() {
    const state = localStorage.getItem(KEYS.EXAM_STATE);
    return state ? JSON.parse(state) : null;
  },

  clearExamState() {
    localStorage.removeItem(KEYS.EXAM_STATE);
  },

  saveConceptReading(conceptData) {
    localStorage.setItem(KEYS.CONCEPT_READING, JSON.stringify(conceptData));
  },

  getConceptReading() {
    const data = localStorage.getItem(KEYS.CONCEPT_READING);
    return data ? JSON.parse(data) : null;
  },

  clearConceptReading() {
    localStorage.removeItem(KEYS.CONCEPT_READING);
  },

  clearAllStorage() {
    Object.values(KEYS).forEach(key => localStorage.removeItem(key));
  }
};
