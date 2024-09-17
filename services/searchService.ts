import SearchRepository from '../repositories/searchRepository';

const searchBoth = async (searchTerm: string) => {
  const { chalets, plans } = await SearchRepository.searchBoth(searchTerm);
  return { chalets, plans }; // Retorna los dos arreglos por separado
};

export default {
  searchBoth
};
