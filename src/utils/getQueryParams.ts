export type FinalObjectType = {
  [key: string]: string;
};

function getQueryParams(string: string): FinalObjectType {
  const queries = string.substring(1).split("&");
  const finalObj: FinalObjectType = {};
  queries.forEach((query) => {
    const arr = query.split("=");
    if (arr.length > 1) {
      const key = arr[0];
      const value = arr[1];
      finalObj[key] = value;
    }
  });
  return finalObj;
}

export default getQueryParams;
