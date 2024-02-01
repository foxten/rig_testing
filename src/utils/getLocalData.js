/**
 * This function is used for local json stored in the src/content folder
 * @param {string} collection
 * - name of the folder that stores the json files
 * - ie. 'starWars' for src/content/starWars/data.json
 * @param {function} filterFn
 * - optional filter function to filter the data
 * - ie. (item) => item.name === 'Luke Skywalker'
 *
 * json data must be an array of objects
 * @returns {array}
 */

import { getCollection } from "astro:content";

const getLocalData = async (collection, filterFn = null) => {
  let data;
  if (filterFn) {
    data = await getCollection(collection, filterFn);
  } else {
    data = await getCollection(collection);
  }
  return data[0].data;
};

export default getLocalData;
