export const getInstruments = () => {
  const files = import.meta.glob("../../public/instruments/*.flac")
  const instruments = Object.keys(files).map(key => key.split("/").at(-1).replace(".flac", ""));
  return instruments;
}
