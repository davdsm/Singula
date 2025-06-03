// Base interfaces for nested objects
interface Subcategory {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
  category: string;
  image: string;
  slug: string;
  title_de: string;
  title_en: string;
  title_es: string;
  title_fr: string;
  title_pt: string;
}

interface Material {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
  image: string;
  slug: string;
  name_de: string;
  name_en: string;
  name_es: string;
  name_fr: string;
  name_pt: string;
  text_de: string;
  text_en: string;
  text_es: string;
  text_fr: string;
  text_pt: string;
}

interface Color {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
  image: string;
  slug: string;
  name_de: string;
  name_en: string;
  name_es: string;
  name_fr: string;
  name_pt: string;
}

interface Acabamento {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
  // Add other acabamento properties as needed
}

// Main formatted item interface
interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  text: string;
  secondTitle: string;
  secondText: string;
  acabamento: string;
  pesos: string;
  note: string;
  banner: string | null;
  ImagemPrincipal: string | null;
  PrimeiraImagem: string | null;
  ImagemMeio: string | null;
  ImagemBottom: string | null;
  Ficha_Tecnica: string | null;
  Model_DWG: string | null;
  subcategory: Subcategory | null;
  materiais: Material[];
  cores_recomendado: Color[];
  acabamentos_recomendado: Acabamento[];
}

// Original item interface (before formatting)
interface ApiProduct {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
  slug: string;
  
  // Multilingual fields
  name_de: string;
  name_en: string;
  name_es: string;
  name_fr: string;
  name_pt: string;
  
  subtitle_de: string;
  subtitle_en: string;
  subtitle_es: string;
  subtitle_fr: string;
  subtitle_pt: string;
  
  text_de: string;
  text_en: string;
  text_es: string;
  text_fr: string;
  text_pt: string;
  
  secondTitle_de: string;
  secondTitle_en: string;
  secondTitle_es: string;
  secondTitle_fr: string;
  secondTitle_pt: string;
  
  secondText_de: string;
  secondText_en: string;
  secondText_es: string;
  secondText_fr: string;
  secondText_pt: string;
  
  acabamento_de: string;
  acabamento_en: string;
  acabamento_es: string;
  acabamento_fr: string;
  acabamento_pt: string;
  
  pesos_de: string;
  pesos_en: string;
  pesos_es: string;
  pesos_fr: string;
  pesos_pt: string;
  
  note_de: string;
  note_en: string;
  note_es: string;
  note_fr: string;
  note_pt: string;
  
  // Image and file fields
  banner?: string;
  ImagemPrincipal?: string;
  PrimeiraImagem?: string;
  ImagemMeio?: string;
  ImagemBottom?: string;
  Ficha_Tecnica?: string;
  Model_DWG?: string;
  
  // Relation fields
  subcategory: string;
  materiais: string[];
  cores_recomendado: string[];
  acabamentos_recomendado: string[];
  
  // Expanded relations
  expand?: {
    subcategory?: Subcategory;
    materiais?: Material[];
    cores_recomendado?: Color[];
    acabamentos_recomendado?: Acabamento[];
  };
}