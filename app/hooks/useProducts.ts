import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Acabamento,
  AcabamentoFormatted,
  ApiProduct,
  Color,
  FormattedColor,
  Material,
  MaterialFormatted,
  Product,
} from "./interfaces";
import { StringOptions } from "sass";

const pocketBaseUrl = "http://185.11.167.133:8090";

export const formatApiProductsIntoProducts = (
  lang: string,
  products: ApiProduct[]
): Product[] => {
  const formatMateriais = (materials: Material[]): MaterialFormatted[] => {
    return materials.map((mat) => ({
      name: (mat as any)[`name_${lang}`],
      text: (mat as any)[`text_${lang}`],
      image: `${pocketBaseUrl}/api/files/${mat.collectionId}/${mat.id}/${mat.image}`,
    }));
  };

  const formatColors = (colors: Color[]): FormattedColor[] => {
    return colors.map((color) => ({
      name: (color as any)[`name_${lang}`],
      image: `${pocketBaseUrl}/api/files/${color.collectionId}/${color.id}/${color.image}`,
    }));
  };

  const formatAcabamento = (
    acabamentos: Acabamento[]
  ): AcabamentoFormatted[] => {
    return acabamentos.map((acab) => ({
      name: (acab as any)[`name_${lang}`],
      text: (acab as any)[`description_${lang}`],
      image: `${pocketBaseUrl}/api/files/${acab.collectionId}/${acab.id}/${acab.image}`,
    }));
  };

  const Products: Product[] = products.map((item: ApiProduct) => ({
    id: item.id,
    slug: item.slug,
    design: item.expand?.design?.slug ?? "",
    link: `/products/${item.expand?.subcategory?.expand?.category.slug}/${item.slug}`,
    special: (item as any)[`NotaEspecial_${lang}`] || "",
    name: (item as any)[`name_${lang}`] || item.name_pt,
    subtitle: (item as any)[`subtitle_${lang}`] || item.subtitle_pt,
    text: (item as any)[`text_${lang}`] || item.text_pt,
    secondTitle: (item as any)[`secondTitle_${lang}`] || item.secondTitle_pt,
    secondText: (item as any)[`secondText_${lang}`] || item.secondText_pt,
    acabamento: (item as any)[`acabamento_${lang}`] || item.acabamento_pt,
    pesos: (item as any)[`pesos_${lang}`] || item.pesos_pt,
    note: (item as any)[`note_${lang}`] || item.note_pt,
    banner: item.banner
      ? `${pocketBaseUrl}/api/files/${item.collectionId}/${item.id}/${item.banner}`
      : null,
    ImagemPrincipal: item.ImagemPrincipal
      ? `${pocketBaseUrl}/api/files/${item.collectionId}/${item.id}/${item.ImagemPrincipal}`
      : null,
    PrimeiraImagem: item.PrimeiraImagem
      ? item.PrimeiraImagem.map(
          (imagem: string) =>
            `${pocketBaseUrl}/api/files/${item.collectionId}/${item.id}/${imagem}`
        )
      : null,

    RefPrimeiraImagem: item.ref_primeiras_imagens,

    ImagemMeio: item.ImagemMeio
      ? item.ImagemMeio.map(
          (imagem: string) =>
            `${pocketBaseUrl}/api/files/${item.collectionId}/${item.id}/${imagem}`
        )
      : null,

    RefImagemMeio: item.ref_imagens_meio,

    SegundaMeio: item.SegundaMeio
      ? item.SegundaMeio.map(
          (imagem: string) =>
            `${pocketBaseUrl}/api/files/${item.collectionId}/${item.id}/${imagem}`
        )
      : null,

    RefSegundaMeio: Array.isArray(item.ref_segunda_imagem_meio)
      ? item.ref_segunda_imagem_meio.length > 0
        ? item.ref_segunda_imagem_meio[0]
        : null
      : item.ref_segunda_imagem_meio ?? null,

    ImagemBottom: item.ImagemBottom
      ? item.ImagemBottom.map(
          (imagem: string) =>
            `${pocketBaseUrl}/api/files/${item.collectionId}/${item.id}/${imagem}`
        )
      : null,
    Ficha_Tecnica: item.Ficha_Tecnica
      ? `${pocketBaseUrl}/api/files/${item.collectionId}/${item.id}/${item.Ficha_Tecnica}`
      : null,
    Model_DWG: item.Model_DWG
      ? `${pocketBaseUrl}/api/files/${item.collectionId}/${item.id}/${item.Model_DWG}`
      : null,
    subcategory: item.expand?.subcategory || null,
    materiais: item.expand?.materiais
      ? formatMateriais(item.expand!.materiais!)
      : [],
    cores_recomendado: item.expand?.cores_recomendado
      ? formatColors(item.expand?.cores_recomendado)
      : [],
    acabamentos_recomendado: item.expand?.acabamentos_recomendado
      ? formatAcabamento(item.expand?.acabamentos_recomendado)
      : [],
  }));

  return Products;
};

export const useProducts = ({
  subcategoryIds,
  productSlug,
  featured,
}: {
  subcategoryIds?: string[];
  productSlug?: string;
  featured?: boolean;
}) => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const [Ready, setReady] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const filters = [];

        if (productSlug) {
          filters.push(`slug~"${productSlug}"`);
        }

        if (featured) {
          filters.push(`featured=true`);
        }

        const filterQuery = filters.length
          ? `&filter=${filters.join(" && ")}`
          : "";

        const res = await fetch(
          `${pocketBaseUrl}/api/collections/Produtos/records?sort=order,id&expand=design,subcategory,materiais,cores_recomendado,acabamentos_recomendado,subcategory.category${filterQuery}`
        );

        const data = await res.json();

        const filtered = subcategoryIds
          ? data.items.filter(
              (item: ApiProduct) =>
                item.expand?.subcategory?.slug !== undefined &&
                subcategoryIds.includes(item.expand.subcategory.slug)
            )
          : data.items;

        const formatted = formatApiProductsIntoProducts(lang, filtered);

        setProducts(formatted);
        if (products.length > 0) {
          setReady(true);
        }
      } catch (err) {
        setError("Failed to load products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (!Ready) {
      fetchProducts();
    }
  }, [subcategoryIds, lang]);

  return { products, loading, error };
};
