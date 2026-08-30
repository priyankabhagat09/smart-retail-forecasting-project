import type { Store } from "@/types";

export const CATEGORIES: string[] = [
  "Apparel",
  "Electronics",
  "Home & Kitchen",
  "Grocery",
  "Beauty",
  "Sporting Goods",
];

export const STORES: Store[] = [
  { id: "ST-NE-01", name: "Northeast Hub" },
  { id: "ST-MW-02", name: "Midwest Distribution" },
  { id: "ST-SW-03", name: "Southwest Flagship" },
  { id: "ST-WC-04", name: "West Coast Metro" },
];

export const SUPPLIERS: string[] = [
  "Meridian Wholesale Co.",
  "Atlas Sourcing Group",
  "Pinnacle Goods Ltd.",
  "Vertex Supply Chain",
];

export const PRODUCT_NAMES: Record<string, string[]> = {
  Apparel: ["Performance Fleece Hoodie", "Everyday Chino Pant", "Merino Wool Crew Sock", "Insulated Field Jacket"],
  Electronics: ["Wireless ANC Earbuds", "45W USB-C Charger", "4K Streaming Stick", "Smart Home Hub"],
  "Home & Kitchen": [
    "Ceramic Nonstick Skillet",
    "Stainless Pour-Over Kettle",
    "Vacuum Storage Container Set",
    "Cast Iron Dutch Oven",
  ],
  Grocery: ["Cold Brew Coffee Concentrate", "Organic Rolled Oats 5lb", "Sparkling Water 12-Pack", "Almond Butter Jar"],
  Beauty: ["Vitamin C Serum 30ml", "Mineral SPF 50 Sunscreen", "Repair Shampoo Bar", "Overnight Retinol Cream"],
  "Sporting Goods": ["Foam Roller Pro", "Adjustable Kettlebell 25lb", "Trail Running Shoe", "Insulated Hydration Bottle"],
};
