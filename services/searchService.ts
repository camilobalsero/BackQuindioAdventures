import SearchRepository from '../repositories/searchRepository'; // Ajusta la ruta si es necesario

const searchBoth = async (searchTerm: string) => {
  return await SearchRepository.searchBoth(searchTerm);
};

export default {
  searchBoth
}
;

