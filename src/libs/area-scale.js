const area_scale_arr = [
  { label: "Meters", value: "meters" },
  { label: "Feets", value: "feets" },
  { label: "Yards", value: "yards" },
];

const property_tags_obj = [
  {
    value: "furnished",
    label: "Furnished",
  },
  {
    value: "unfurnished",
    label: "Unfurnished",
  },
  {
    value: "in_development",
    label: "In Development",
  },
  {
    value: "for_rent",
    label: "For Rent",
  },
  {
    value: "for_sale",
    label: "For Sale",
  },
  {
    value: "commercial",
    label: "Commercial",
  },
  {
    value: "residential",
    label: "Residential",
  },
  {
    value: "luxury",
    label: "Luxury",
  },
  {
    value: "budget_friendly",
    label: "Budget-friendly",
  },
  {
    value: "investment",
    label: "Investment",
  },
  {
    value: "waterfront",
    label: "Waterfront",
  },
  {
    value: "mountain_view",
    label: "Mountain View",
  },
  {
    value: "urban",
    label: "Urban",
  },
  {
    value: "rural",
    label: "Rural",
  },
  {
    value: "gated_community",
    label: "Gated Community",
  },
  {
    value: "pet_friendly",
    label: "Pet-friendly",
  },
  {
    value: "family_friendly",
    label: "Family-friendly",
  },
  {
    value: "green_building",
    label: "Green Building",
  },
  {
    value: "energy_efficient",
    label: "Energy-efficient",
  },
  {
    value: "historic",
    label: "Historic",
  },
  {
    value: "new_construction",
    label: "New Construction",
  },
  {
    value: "renovated",
    label: "Renovated",
  },
  {
    value: "open_floor_plan",
    label: "Open Floor Plan",
  },
  {
    value: "high_ceilings",
    label: "High Ceilings",
  },
  {
    value: "smart_home",
    label: "Smart Home",
  },
  {
    value: "security",
    label: "Security",
  },
  {
    value: "parking",
    label: "Parking",
  },
  {
    value: "near_public_transport",
    label: "Near Public Transport",
  },
  {
    value: "close_to_amenities",
    label: "Close to Amenities",
  },
  {
    value: "flexible_lease_terms",
    label: "Flexible Lease Terms",
  },
];

export const getPropertyTagsObj = () => {
  return property_tags_obj;
};

export const getPropertyValueArr = () => {
  return property_tags_obj.map((tag) => {
    return tag.value;
  });
};

export const getAreaScales = () => area_scale_arr.map((el) => el.label);
