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

export interface Material {
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

export interface MaterialFormatted {
  id: string;
  name: string;
  text: string;
  image: string;
}

export interface Color {
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

export interface FormattedColor {
  id: string;
  image: string;
  name: string;
}

export interface Acabamento {
  collectionId: string;
  collectionName: string;
  id: string;
  slug: string;
  name_pt: string;
  name_en: string;
  name_es: string;
  name_fr: string;
  name_de: string;
  text_pt: string;
  text_en: string;
  text_es: string;
  text_fr: string;
  text_de: string;
  image: string;
  created: string;
  updated: string;
}

export interface AcabamentoFormatted {
  name: string;
  text: string;
  image: string;
}

// Main formatted item interface
export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  text: string;
  special: string;
  secondTitle: string;
  secondText: string;
  acabamento: string;
  design: string;
  pesos: string;
  note: string;
  link: string;
  banner: string | null;
  ImagemPrincipal: string | null;
  PrimeiraImagem: string[] | null;
  RefPrimeiraImagem: string | null;
  ImagemMeio: string[] | null;
  RefImagemMeio: string | null;
  SegundaMeio: string[] | null;
  RefSegundaMeio: string | null;
  ImagemBottom: string[] | null;
  Ficha_Tecnica: string | null;
  Model_DWG: string | null;
  subcategory: Subcategory | null;
  materiais: MaterialFormatted[];
  /** PDP configurator: materials allowed for this product (expand `materiais_disponiveis`). */
  materiaisDisponiveis: MaterialFormatted[];
  /** PDP configurator: RAL colors allowed for this product (expand `ral_disponiveis`). */
  ralDisponiveis: FormattedColor[];
  acabamentos_recomendado: AcabamentoFormatted[];
}

export interface Subproduct {
  id: string;
  productId: string;
  name: string;
  image: string | null;
  reference?: string | null;
  order: number;
  active: boolean;
}

export interface AddToCartPayload {
  productId: string;
  productSlug: string;
  subproductId: string | null;
  /** Null when quoting the base product (no Variacoes row). */
  variationId: string | null;
  variationReference: string;
  selectedMaterialIds: string[];
  selectedRalIds: string[];
  unitPrice: number | null;
  priceVisible: boolean;
  quantity: number;
}

export interface CartItem extends AddToCartPayload {
  id: string;
  productName: string;
  /** Canonical PDP URL with subcategory + product slug when known. */
  productPath?: string | null;
  subproductName: string | null;
  variationImage: string | null;
  addedAt: number;
  /** Human-readable "Material — RAL" for emails; absent on older cart rows. */
  materialRalLabel?: string | null;
}

// Original item interface (before formatting)
export interface ApiProduct {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
  slug: string;

  design: string;
  feature: boolean;

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

  NotaEspecial_pt: string;
  NotaEspecial_en: string;
  NotaEspecial_es: string;
  NotaEspecial_fr: string;
  NotaEspecial_de: string;

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
  PrimeiraImagem?: string[];
  ImagemMeio?: string[];
  ImagemBottom?: string[];

  SegundaMeio?: string[];
  ref_segunda_imagem_meio?: string[];

  Ficha_Tecnica?: string;
  Model_DWG?: string;
  ref_primeiras_imagens: string | null;
  ref_imagens_meio: string | null;

  // Relation fields
  subcategory: string;
  materiais: Material[];
  acabamentos_recomendado: string[];

  // Expanded relations
  expand?: {
    subcategory?: Subcategory;
    materiais?: Material[];
    materiais_disponiveis?: Material[];
    ral_disponiveis?: Color[];
    acabamentos_recomendado?: Acabamento[];
    design?: {
      slug: string
    }
  };
}
