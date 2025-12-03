import { ColumnType } from './enums';

export interface TestimonialsProps {
  id: number;
  slug?: string;
  review_text: string;
  rating: string;
  reviewed_month: string;
  reviewed_year: string;
  reviewed_on: string;
  updated_on: string;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    profile_picture: string;
  };
}

export interface DestinationProps {
  slug: string;
  destination_name: string;
  destination_location: string;
  destination_thumbnail: string;
  destination_category: {
    destination_category_title: string;
    slug: string;
  };
}

export interface AdventureStyleProps {
  slug: string;
  adventure_name: string;
  adventure_thumbnail: string;
  adventure_category: {
    adventure_category_title: string;
    slug: string;
  };
}

export interface BlogProps {
  slug: string;
  blog_title: string;
  image: string | null;
  description: string | null;
  category: {
    id: number;
    name: string;
    slug: string;
  };
  author: {
    full_name: string;
  };
  created_date: string;
}

export interface TripProps {
  trip_title: string;
  slug: string;
  tags: string[];
  trip_destination:
    | {
        destination_location: string;
      }
    | string[];
  duration_days: number;
  price_per_person: number | null;
  featured_image: string | null;
  available_dates: {
    start_month: string | null;
    end_month: string | null;
  };
}

export interface TripDepartureProps {
  id?: number;
  is_active: boolean;
  price_per_person: number | string;
  available_slots: number;
  availability: string;
  duration_days: number;
  arrival_date: Date | string;
  departure_date: Date | string;
  end_date: Date | string;
}

export interface TripFaqProps {
  id: number;
  question: string;
  answer: string;
}

export interface TripOverViewProps {
  id: number;
  description: string;
  description_title: string;
  order: number;
}

export interface TripWhatsIncludedProps {
  id: number;
  includes_title: string;
  icon: string;
  descriptions: string;
  order: number;
}

export interface TripsTagProps {
  name: string;
  slug: string;
}

export interface DestinationCateProps {
  slug: string;
  adventure_category_title: string;
}

export interface AdventureCateProps {
  slug: string;
  adventure_category_title: string;
}

export interface BlogCategoryProps {
  slug: string;
  blog_title: string;
  image: string | null;
  description: string | null;
  category: {
    id: number;
    name: string;
    slug: string;
  };
  author: {
    full_name: string;
  };
  created_date: string;
}

export interface BlogSectionProps {
  id: number;
  blogSectionImages: {
    id: number;
    image: string;
  };
  blogsection_description: string;
  blogsection_title: string;
  order: number;
  slug: string;
}

export type ColumnKey =
  | {
      type?: undefined; // default text column
      header: string;
      accessorKey: string;
      truncate?: number;
      classname?: string;
    }
  | {
      type: ColumnType.IMAGE;
      header: string;
      accessorKey: string;
    }
  | {
      type: ColumnType.CURRENCY;
      header: string;
      accessorKey: string;
      prefix?: string;
    }
  | {
      type: ColumnType.DATE_RANGE;
      header: string;
      accessorKey: string;
      startKey: string;
      endKey: string;
    }
  | {
      type: ColumnType.DATE;
      header: string;
      accessorKey: string;
    }
  | {
      type: ColumnType.ARRAY;
      header: string;
      accessorKey: string;
      arrayKey: string;
    }
  | {
      type: ColumnType.ACTIONS;
      header: string;
      showDetailPopup?: boolean;
      showAddMore?: boolean;
      showEditBtn?: boolean;
      showDeleteBtn?: boolean;
      route?: string;
    }
  | {
      type: ColumnType.BOOLEAN;
      header: string;
      accessorKey: string;
  }|
   | {
      type: ColumnType.CUSTOM;
      header: string;
      accessorKey: string;
      render: any;
    };
