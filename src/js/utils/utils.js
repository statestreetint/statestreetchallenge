class Utils {
  static capitalize = (str) => {
    return str.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
  }
  static getUniqueValues = (data, key) => {
    return [...new Set(data.map(item => Utils.capitalize(item[key])))];
  }
}

export default Utils;
