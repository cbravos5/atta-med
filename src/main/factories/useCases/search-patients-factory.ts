import { SearchPatients } from "@/domain/useCases/search-patients";

export const makeSearchPatients = (): SearchPatients => ({
  async execute(searchText) {
    await new Promise((r) => setTimeout(r, 1500));

    return Array(7)
      .fill(null)
      .map((_, i) => ({
        id: i.toString(),
        name: "João da Silva de Jesus " + i,
        age: 24,
        gender: "male",
        cpf: "12345678910",
      }));
  },
});
