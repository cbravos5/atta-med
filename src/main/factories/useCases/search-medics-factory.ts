import { SearchMedics } from "@/domain/useCases/search-medics";

export const makeSearchMedics = (): SearchMedics => ({
  async execute(searchText) {
    await new Promise((r) => setTimeout(r, 1500));

    return Array(7)
      .fill(null)
      .map((_, i) => ({
        id: i.toString(),
        name: "João da Silva de Jesus " + i,
        crm: "CRM/SP-123456",
        specialty: "Neurologia",
      }));
  },
});
