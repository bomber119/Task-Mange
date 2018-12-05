import { city_data } from './area.data';

export const getProvinces = () => {
  const provinces = [];
  for (const province in city_data) {
    if (province) {
      provinces.push(province);
    }
  }
  return provinces;
};

export const getCitiesByProvince = (province: string) => {
  const cities = [];
  if (!province || !city_data[province]) {
    return cities;
  } else {
    const _city = city_data[province];
    for (const city in _city) {
      if (city) {
        cities.push(city);
      }
    }
    return cities;
  }
};

export const getAreaByCity = (province: string, city: string) => {
  if (!province || !city_data[province] || !city_data[province][city]) {
    return [];
  }
  return city_data[province][city];
};


