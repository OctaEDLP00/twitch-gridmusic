/**
 * Obtiene una lista de nombres de instrumentos a partir de archivos FLAC almacenados en un directorio específico.
 * @param {string | undefined} [path]
 * @returns {Array<string>} Una lista con los nombres de los instrumentos disponibles.
 */
export const getFiles = (path) => {
  const files = import.meta.glob(`../../public/${path ? path : "instruments"}/*.flac`)
  const instruments = Object.keys(files).map(key => key.split("/").at(-1).replace(".flac", ""));
  return instruments;
}
